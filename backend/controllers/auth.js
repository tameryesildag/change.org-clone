import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt";

export async function register(req, res, next){
    const email = req.body.email;
    const rawPassword = req.body.password;
    const hash = await bcrpyt.hash(rawPassword, 10);
    const newUser = new User({
        email: email,
        password: hash
    })
    await newUser.save();
    return res.status(200).json({newUser});
}

export async function login(req, res, next){
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: "Invalid email or password."});
    const isMatch = bcrpyt.compare(req.body.password, user.password);
    if(!isMatch) return res.status(400).json({message: "Invalid email or password."});
    const token = jwt.sign({userId: user._id}, process.env.PRIVATE_KEY, { expiresIn: '1800s' });
    return res.status(200).json({token});
}
