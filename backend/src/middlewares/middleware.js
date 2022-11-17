import jwt from "jsonwebtoken";
import User from "../models/user";
import multer from "multer";

export const isAuthenticated  = async(req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next("Harap Login Terlebih Dahulu...");
        }

        const verify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findOne({ email: verify.email });
        next();
    } catch (error) {
        return next(error);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const uploads = multer({
    storage: storage,
}).single('image');