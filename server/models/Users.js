import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    no: {
        type: String,
        required:true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const UserModels = mongoose.model("users", Schema);

export default UserModels;
