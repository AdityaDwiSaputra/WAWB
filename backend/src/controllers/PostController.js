import Post from "../models/post.js";
import fs from "fs";

export const getAllPost = async(req, res) => {
    try {
        const post = await Post.find();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const detailPost = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Post.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const createPost = async(req, res) => {
    try {
        const post = req.body;
        const imageName = req.file.filename;
        post.image = imageName;

        const data = await Post.create(post);
        return res.status(200).json({message: "Data Info Kesehatan Berhasil Ditambahkan..."});
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const updatePost = async(req, res) => {
    try {
        const id = req.params.id;
        let new_image = "";
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

        const newPost = req.body;
        newPost.image = new_image;

        const data = await Post.findByIdAndUpdate(id, newPost);
        return res.status(200).json({message: "Data Info Kesehatan Berhasil Diupdate..."});
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const deletePost = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Post.findByIdAndDelete(id);
        if(data.image != ''){
            try {
                fs.unlinkSync("./src/uploads/" + data.image);
            } catch (error) {
                console.info(error);
            }
        }
        return res.status(200).json({message: "Data Info Kesehatan Berhasil Dihapus.."});
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}