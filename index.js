const express=require("express");
const app=express();
const PORT=3002;
const mongoose=require("mongoose");
// const MongoClient = require("mongodb").MongoClient;

// const client = new MongoClient("mongodb://localhost:27017/mydb");

mongoose.connect("mongodb+srv://vaibhavsrh766:vaibhav1234@cluster0.efyv0no.mongodb.net/db",{
  useNewUrlParser:true,
useUnifiedTopology:true,

}).then(()=>console.log("db connected")).catch((err)=>console.log(err));
  


const getRoutes=require('./app/event');

// middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use('/api/v3',getRoutes);

app.listen(PORT,()=>{
    console.log("server is running");
})