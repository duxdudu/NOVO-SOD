const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware for handling CORS and JSON data
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


mongoose.connect('mongodb+srv://dudufred:admin@claster2.4ji8idz.mongodb.net/weather')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Users = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new Users({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await Users.find({}, { password: 0 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Add new user
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new Users({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Update user
app.put('/users/:id', async (req, res) => {
    try {
        const { name, email } = req.body;
        await Users.findByIdAndUpdate(req.params.id, { name, email });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});