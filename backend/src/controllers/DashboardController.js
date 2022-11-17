import Permohonan from "../models/permohonan";
import User from "../models/user";
import Post from "../models/post";

export const getDashboard = async(req, res) => {
    try {
        if(req.user.role == 'Kemahasiswaan'){
            const jumlahUser = await User.find().count();
            const jumlahMahasiswa = await User.where({'role': 'Mahasiswa'}).count();
            const jumlahNakes = await User.where({'role': 'Tenaga_Kesehatan'}).count();
            const jumlahKegiatan = await User.where({'role': 'Unit_Kegiatan'}).count();
            const jumlahPermohonan = await Permohonan.find({'status' : { $ne : 'Draft'}}).count();
            const jumlahPermohonanDisetujui = await Permohonan.where({'status': "Disetujui"}).count();
            return res.status(200).json({
                data: 
                    {
                        'jumlahUser': jumlahUser,
                        'jumlahMahasiswa': jumlahMahasiswa,
                        'jumlahNakes': jumlahNakes,
                        'jumlahKegiatan': jumlahKegiatan,
                        'jumlahPermohonan': jumlahPermohonan,
                        'jumlahPermohonanDisetujui': jumlahPermohonanDisetujui
                    }
                
            });
        }else if(req.user.role == 'Mahasiswa'){
            const jumlahPermohonan = await Permohonan.find({email: req.user.email}).count();
            const jumlahPermohonanDisetujui = await Permohonan.find({email: req.user.email}).where({'status': "Disetujui"}).count();
            const jumlahPermohonanSelesai = await Permohonan.find({email: req.user.email}).where({'status': "Done"}).count();
            return res.status(200).json({
                data: 
                    {
                        'jumlahPermohonan': jumlahPermohonan,
                        'jumlahPermohonanDisetujui': jumlahPermohonanDisetujui,
                        'jumlahPermohonanSelesai': jumlahPermohonanSelesai
                    }
                
            });
        }else if(req.user.role == 'Tenaga_Kesehatan'){
            const jumlahPermohonan = await Permohonan.where({'status': "Disetujui"}).count();
            const jumlahPermohonanSelesai = await Permohonan.where({'status': "Done"}).count();
            return res.status(200).json({
                data: 
                    {
                        'jumlahPermohonan': jumlahPermohonan,
                        'jumlahPermohonanSelesai': jumlahPermohonanSelesai
                    }
                
            });
        }else{
            const jumlahPost = await Post.find().count();
            return res.status(200).json({
                data: 
                    {
                        'jumlahPermohonan': jumlahPost,
                    }
                
            });
        }
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}