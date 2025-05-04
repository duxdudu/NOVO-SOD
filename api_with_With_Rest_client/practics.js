const http = require('http');
const express = require('express');
const app = express();
const port =3000;

const user=[
    {name:"make",age:23},
    {name:"mohammed",age:25},
    {name:"ahmed",age:22},
]

app.get("/",(req,res)=>{
    res.send("hello my peaple");
})
app.get("/about",(req,res)=>{
    res.json(user);  
})
app.get("/about/:age",(req,res)=>{
    const varAge= req.params.age;
    const userId= parseInt(varAge);
    const userData=user.find(u =>u.age === userId);
    
    if (userData) {
        res.json(userData);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})