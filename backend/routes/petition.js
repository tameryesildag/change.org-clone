import express from "express";
import { createPetition, deletePetition, getAllPetitions, getPetition } from "../controllers/petition.js";

const petitionRouter = express.Router();

petitionRouter.get("/petitions", getAllPetitions);

petitionRouter.get("/petition/:id", getPetition);

petitionRouter.delete("/petition/:id", deletePetition);

petitionRouter.post("/petition", createPetition);

export default petitionRouter;