import mongoose from "mongoose";

const petitionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String,
        required: false
    },
    signs: {
        type: Number,
        required: true,
        default: 0
    },
    signers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    reasons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }]
}, {timestamps: true})

const Petition = mongoose.model("Petition", petitionSchema);

export default Petition;