import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import UserModel from './models/Users.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.Atlas_Url);

app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.put('/updateUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        no:req.body.no, 
        name:req.body.name 
       })
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(deletedUser => {res.json(deletedUser);})
        .catch(err => console.log(err));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server Started");
});