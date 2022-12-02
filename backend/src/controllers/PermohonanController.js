import Permohonan from "../models/permohonan";

export const getAllPermohonan = async(req, res) => {
    try {
        if(req.user.role == 'Mahasiswa'){
            const applications = await Permohonan.find({email: req.user.email}).sort({ created: -1 });
            return res.status(200).json(applications);
        }else if(req.user.role == 'Kemahasiswaan'){
            const applications = await Permohonan.find({'status' : { $ne : 'Draft'}}).sort({ created: -1 });
            return res.status(200).json(applications);
        }else if(req.user.role == 'Tenaga_Kesehatan'){
            const applications = await Permohonan.find({'status' : { $in: ['Disetujui', 'Done'] }}).sort({ created: -1 });
            return res.status(200).json(applications);
        }else{
            const applications = [];
            return res.status(200).json(applications);
        }
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const detailPermohonan = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Permohonan.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const createPermohonan = async(req, res) => {
    try {
        const permohonan = req.body;
        
        if (req.user.role != 'Mahasiswa') {
            return res.status(400).send("Can't Access this method..");
        }

        const doc = new Permohonan({
            judul: permohonan.judul,
            deskripsi: permohonan.deskripsi,
            layanan: permohonan.layanan,
            penanganan: permohonan.penanganan,
            status: "Draft",
            email: req.user.email,
        });

        doc.mahasiswa = {
            nrp: req.user.mahasiswa.nrp,
            nama: req.user.nama,
            kelas: req.user.mahasiswa.kelas,
            angkatan: req.user.mahasiswa.angkatan,
        }
        
        const data = await doc.save();
        // const data = await Permohonan.create(permohonan);
        return res.status(200).json({
			success: true,
			message: "Permohonan Berhasil Dibuat..",
			data: data,
		})
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const updatePermohonan = async(req, res) => {
    try {
        const id = req.params.id;
        const permohonan = req.body;

        const data = await Permohonan.findByIdAndUpdate(id, permohonan);
        return res.status(200).json({
            data: data,
            message: "Data permohonan berhasil diupdate..."
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const deletePermohonan = async(req, res) => {
    try {
        const id = req.params.id;
        await Permohonan.findByIdAndDelete(id);
        return res.status(200).json({message: "Permohonan berhasil dihapus..."})
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}