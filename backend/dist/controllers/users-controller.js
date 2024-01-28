import User from "../models/user.js";
import { hash, compare } from "bcrypt-ts";
import { createToken } from "../utils/token-manager.js";
// import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res, next) => {
    //get all user from DB
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "OK", users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already registered");
        //Hash password
        const saltRound = 10;
        const hashPassword = await hash(password, saltRound);
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        return res.status(201).json({
            message: "OK", id: user._id.toString()
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body;
        //Hash password
        // const saltRound = 10;
        // const hashPassword = await bcrypt.hash(password, saltRound);
        // const user = new User({name, email, password});
        // await user.save();
        // return res.status(201).json({
        //     message: "OK", id:user._id.toString()
        // });
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).send("User not registered");
        // const pass = await User.findOne({password});
        // if(password != pass) return res.status(403).send("Password Incorrect"); 
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Password Incorrect");
        }
        res.clearCookie("auth_token");
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        return res.status(200).json({
            message: "OK", id: user._id.toString()
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=users-controller.js.map