import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Post', schema);