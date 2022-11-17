import mongoose from "mongoose";

const schema = mongoose.Schema({
    judul: String,
    deskripsi: String,
    layanan: String,
    penanganan: String,
    status: String,
    email: String,
    created: {
        type: Date,
        default: Date.now
    },
    feedback: String,
    mahasiswa: {
        nama: String,
        nrp: String,
        kelas: String,
        angkatan: String,
    }
});

export default mongoose.model('Permohonan', schema);