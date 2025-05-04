const express = require('express');
const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(express.json());

// In-memory users array
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 4, name: 'Charlie' }
];
 
// Basic GET endpoint
app.get('/', (req, res) => {
  res.send('Welcome to my first Express API!');
});

// READ: Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// READ: Get a single user by ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id; //"2" =>2
  // Validate if id is a valid number
  // if (isNaN(id) || !Number.isInteger(Number(id))) {
  //   return res.status(400).json({ message: 'Invalid ID format. ID must be a number.' });
  // }
  const userId = parseInt(id); // 2
  const user = users.find((u) => u.id === userId); // 2 === 

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }

});

// CREATE: Add a new user
app.post('/users', (req, res) => {
  const { name } = req.body;
  // Validate request body
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Name is required and must be a non-empty string' });
  }
  // Generate a unique ID (avoid conflicts with existing IDs)
  const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);   
  const newUser = {
    id: maxId + 1,
    name: name.trim()
  };
  users.push(newUser);
  res.status(201).json(newUser);
});



//UPDATE USER 
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id); //"2"=> 2
  const { name } = req.body;
  const userIndex =  users.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    // Replace the entire user object
    users[2] = {
      id,
      name: name.trim()
    };
    res.json(users[2]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE: Delete user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id == id);

  if (index !== -1) {
    users.splice(index, 1);
    res.sendStatus(204).json({message:'user deleted'}); // No Content
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Start server (node index.js)
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});



























//UPDATE: Update user by ID (PATCH method for partial updates)
// app.patch('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);

//   const { name } = req.body;

//   // Validate ID
//   if (isNaN(id) || !Number.isInteger(id)) {
//     return res.status(400).json({ message: 'Invalid ID format. ID must be a number.' });
//   }

//   // Validate request body
//   if (!name || typeof name !== 'string' || name.trim() === '') {
//     return res.status(400).json({ message: 'Name is required and must be a non-empty string' });
//   }

//   const user = users.find(u => u.id === id);

//   if (user) {
//     user.name = name.trim();
//     res.json(user);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });

// UPDATE: Update user by ID (PUT method for complete updates)