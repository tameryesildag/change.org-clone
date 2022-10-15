import Petition from "../models/petition.js";
import User from "../models/user.js";

const ITEM_PER_PAGE = 6;

export async function getPetitions(req, res, next){
    const page = req.body.page || 1;
    const userId = req.body.userId;
    let petitions;
    if(userId){
        petitions = await Petition.find({creator: userId}).sort({createdAt: "desc"}).skip((page - 1) * ITEM_PER_PAGE).limit(ITEM_PER_PAGE).populate("creator");
    } else {
        petitions = await Petition.find().sort({createdAt: "desc"}).skip((page - 1) * ITEM_PER_PAGE).limit(ITEM_PER_PAGE).populate("creator");
    }
    return res.status(200).json({petitions});
}

export async function getPetition(req, res, next){
    const petition = await Petition.findOne({_id: req.params.id});
    if(!petition) return res.status(404).json({error: "Petition could not be found."});
    return res.status(200).json({petition});
}

export async function createPetition(req, res, next){
    if(!req.userId) return res.status(401).json({error: "Not authenticated."});
    const newPetition = new Petition({
        title: req.body.title,
        description: req.body.description,
        creator: req.userId
    });
    await newPetition.save();
    const user = await User.findOne({_id: req.userId});
    user.petitions.push(newPetition);
    await user.save();
    return res.status(200).json({message: "Petition has been created."});
}

export async function deletePetition(req, res, next){
    if(!req.userId) return res.status(401).json({error: "Not authenticated."});
    const petition = await Petition.findOne({_id: req.params.id});
    if(!petition) return res.status(400).json({error: "Petition could not be found."});
    if(petition.creator.toString() != req.userId.toString()) return res.status(401).json({error: "You don't have permission to delete this petition."});
    await petition.remove();
    return res.status(200).json({message: "Petition has been deleted."});
}

export async function getUser(req, res, next){
    if(!req.params.id) return res.status(400).json({error: "User id cannot be null."});
    const user = await User.findOne({_id: req.params.id});
    if(!user) return res.status(400).json({error: "Couldn't find the user."});
    res.status(200).json({user});
}