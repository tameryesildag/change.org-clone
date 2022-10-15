import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    petitions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Petition"
    }],
    signedPetitions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Petition"
    }],
    profilePicture: {
        type: String,
        required: false
    }
})

const User = new mongoose.model("User", userSchema);

export default User;