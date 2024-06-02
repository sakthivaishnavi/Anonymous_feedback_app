import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserModels from './models/Users.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.Atlas_Url)
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.Email && password === process.env.Password) {
        return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid email or password' });
});

app.get('/', (req, res) => {
    UserModels.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModels.findByIdAndUpdate(id, {
        no: req.body.no,
        name: req.body.name
    }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModels.findByIdAndDelete(id)
        .then(deletedUser => res.json(deletedUser))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModels.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/createUser", async (req, res) => {
    console.log("Request body received:", req.body);
    const { no, name } = req.body;
    if (typeof no !== 'string' || typeof name !== 'string') {
        return res.status(400).json({ message: 'Invalid data format' });
    }
    try {
        const user = await UserModels.create({ no, name });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
