import express from "express";
import { createPetition, deletePetition, getPetitions, getPetition, getUser, getUserPetitions, signPetition } from "../controllers/petition.js";

const petitionRouter = express.Router();

petitionRouter.get("/petitions", getPetitions);

petitionRouter.get("/user-petitions/:id", getUserPetitions);

petitionRouter.get("/petition/:id", getPetition);

petitionRouter.delete("/petition/:id", deletePetition);

petitionRouter.post("/petition", createPetition);

petitionRouter.get("/user/:id", getUser);

petitionRouter.post("/sign-petition/:id", signPetition);

export default petitionRouter;