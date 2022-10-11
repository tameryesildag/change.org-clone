import Petition from "../models/petition.js";

export async function getAllPetitions(req, res, next){
    const petitions = await Petition.find().populate("creator").limit(6);
    if(petitions.length == 0) return res.status(404).json({error: "Couldn't find any petition."});
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