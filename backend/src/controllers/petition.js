import Petition from "../models/petition.js";
import User from "../models/user.js";
import apiError from "../models/api-error.js";

const ITEM_PER_PAGE = 6;

export async function getPetitions(req, res, next) {
    try {
        const page = req.body.page || 1;
        const petitions = await Petition.find().sort({ createdAt: "desc" }).skip((page - 1) * ITEM_PER_PAGE).limit(ITEM_PER_PAGE).populate("creator");
        return res.status(200).json({ petitions });
    } catch(err) {
        next(err);
    }
}

export async function getUserPetitions(req, res, next) {
    try{
        const userId = req.params.id
        const user = await User.findOne({_id: userId}).populate("petitions");
        const unpopulatedUser = {...user.toObject()};
        unpopulatedUser.petitions.forEach(petition => {
            petition = petition._id;
        })
        if(!user) throw new apiError("User not found.", 404);
        let petitions = user.petitions.slice();
        petitions = petitions.map(petition => {
            petition = petition.toObject();
            petition.creator = unpopulatedUser;
            return petition;
        })
        return res.status(200).json({petitions});
    } catch(err) {
        next(err);
    }
}

export async function getPetition(req, res, next) {
    try {
        const petition = await Petition.findOne({ _id: req.params.id }).populate("creator");
        if (!petition) throw new apiError("Petition could not be found.", 404);
        return res.status(200).json({ petition });
    } catch (err) {
        next(err);
    }
}

export async function createPetition(req, res, next) {
    try {
        if (!req.userId) throw new apiError("Not authenticated.", 401);
        let fileName;
        if(req.file) fileName = req.file.filename;
        else fileName = null;
        const newPetition = new Petition({
            title: req.body.title,
            description: req.body.description,
            creator: req.userId,
            image: fileName
        });
        await newPetition.save();
        const user = await User.findOne({ _id: req.userId });
        user.petitions.push(newPetition);
        await user.save();
        return res.status(200).json({ message: "Petition has been created." });
    } catch (err) {
        next(err);
    }
}

export async function deletePetition(req, res, next) {
    try {
        if (!req.userId) throw new apiError("Not authenticated.", 401);
        const petition = await Petition.findOne({ _id: req.params.id });
        if (!petition) throw new apiError("Petition not found.", 404);
        if (petition.creator.toString() != req.userId.toString()) throw new apiError("Access denied. User is not the owner.", 401);
        await petition.remove();
        return res.status(200).json({ message: "Petition has been deleted." });
    } catch (err) {
        next(err);
    }
}

export async function getUser(req, res, next) {
    try {
        if (!req.params.id) throw new apiError("User id is null.", 400);
        const user = await User.findOne({ _id: req.params.id });
        if (!user) throw new apiError("User not found.", 404);
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
}

export async function signPetition(req, res, next) {
    try{
        if(!req.params.id) throw new apiError("Petition id is null.", 400);
        if(!req.userId) throw new apiError("Not authenticated.", 401);
        const petition = await Petition.findOne({_id: req.params.id});
        if(!petition) throw new apiError("Petition not found.", 404);
        petition.signers.push(req.userId);
        petition.signs += 1;
        await petition.save();
        res.status(200).json({message: "petition has been signed."});
    } catch(err) {
        next(err);
    }
}