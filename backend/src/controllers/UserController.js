import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import fs from "fs";

export const getAllUser = async(req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const register = async(req, res) => {
    try {
        const user = req.body;
        
        // Validation
        if (!user.nama || !user.email || !user.password || !user.role) {
            return res.status(400).send("missing parameters");
        };

        // Find if user already exists
        const email = user.email;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).send('User already exists');
        };
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);


        const doc = new User({
            nama: user.nama,
            email: user.email,
            password: hashPassword,
            role: user.role    
        });

        if (user.role == 'Mahasiswa') {
            doc.mahasiswa = {
                nrp: user.nrp,
                status: user.status,
                alamat: user.alamat,
                angkatan: user.angkatan,
                kelas: user.kelas,
            }
        }else if(user.role == 'Kemahasiswaan') {
            doc.kemahasiswaan = {
                nip: user.nip,
                jabatan: user.jabatan,
            }
        }else if(user.role == 'Tenaga_Kesehatan'){
            doc.kesehatan = {
                foto: user.foto,
                jabatan: user.jabatan,
            }
        }

        const data = await doc.save();

        //create jwt token
        const token = jwt.sign({ email }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

        // console.log(token);

        return res.cookie("token", token).json({
			success: true,
			message: "User successfully registered",
			data: data,
		});
    } catch (error) {
        res.status(500).send(error);
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
			return res.status(400).send("missing parameters x");
		}

        // check user existence
		const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("email not found");
        };

        //Check password match
		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched) {
			return res.status(401).send("wrong password");
		}

        //create jwt token
        const token = jwt.sign({ email }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res
			.cookie("token", token)
			.json({ success: true, message: "LoggedIn Successfully", data: user });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const logout = async(req, res) => {
    res.clearCookie("token");
	return res.json({ success: true, message: "logged out" });
}

export const createUser = async(req, res) => {
    try {
        const user = req.body;
        
        // Validation
        if (!user.nama || !user.email || !user.password || !user.role) {
            return res.status(400).send("missing parameters");
        };

        // Find if user already exists
        const email = user.email;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).send('User already exists');
        };
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);


        const doc = new User({
            nama: user.nama,
            email: user.email,
            password: hashPassword,
            role: user.role    
        });

        if (user.role == 'Mahasiswa') {
            doc.mahasiswa = {
                nrp: user.nrp,
                status: user.status,
                alamat: user.alamat,
                angkatan: user.angkatan,
                kelas: user.kelas,
            }
        }else if(user.role == 'Kemahasiswaan') {
            doc.kemahasiswaan = {
                nip: user.nip,
                jabatan: user.jabatan,
            }
        }else if(user.role == 'Tenaga_Kesehatan'){
            const imageName = req.file.filename;
            doc.kesehatan = {
                foto: imageName,
                jabatan: user.jabatan,
            }
        }

        const data = await doc.save();


        return res.status(200).json({
			success: true,
			message: "Create user successfully",
			data: data,
		});
    } catch (error) {
        res.status(500).send(error);
    }
}

export const detailUser = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const updateUser = async(req, res) => {
    try {
        if(req.body.role != "Tenaga_Kesehatan"){
            const id = req.params.id;
            const user = req.body;

            if (user.newPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(user.newPassword, salt);
                user.password = hashPassword
            }

            const data = await User.findByIdAndUpdate(id, user)
            return res.status(200).json({
                data: data,
                message: "Data User Berhasil Diperbarui...",
            });
        }else{    
            const id = req.params.id;
            let new_image = "";
            const user = await User.findById(id);
            if(req.file){
                new_image = req.file.filename;
                try {
                    fs.unlinkSync("./src/uploads/" + req.body.old_image);
                } catch (error) {
                    console.info(error);
                }
            }else{
                new_image = req.body.old_image;
            }

            if(req.body.newPassword != 'undefined'){
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(user.newPassword, salt);
                user.password = hashPassword
            }
            
            user.nama = req.body.nama;
            user.kesehatan.jabatan = req.body.jabatan;
            user.kesehatan.foto = new_image;

            const data = await user.save();

            console.log(data);
            return res.status(200).json({
                data: data, 
                message: "Data User Berhasil Diperbarui..."
            });
        }
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id);
        if(data.role == "Tenaga_Kesehatan" && data.kesehatan.foto != ""){
            try {
                fs.unlinkSync("./src/uploads/" + data.kesehatan.foto);
            } catch (error) {
                console.info(error);
            }
        }
        return res.status(200).json({message: "Data User Berhasil Dihapus..."});
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}