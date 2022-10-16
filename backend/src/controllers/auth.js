import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt";
import apiError from "../models/api-error.js";

export async function register(req, res, next) {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const rawPassword = req.body.password;
        const hash = await bcrpyt.hash(rawPassword, 10);
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        })
        await newUser.save();
        return res.status(200).json({ newUser });
    } catch(err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new apiError("Invalid email or password.", 400);
        const isMatch = bcrpyt.compare(req.body.password, user.password);
        if (!isMatch) throw new apiError("Invalid email or password.", 400);
        const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY, { expiresIn: '1800s' });
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
}