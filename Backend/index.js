const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const user = require("./Models.jsx");
const MiddleWare = require("./MiddleWare.jsx");
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cors({
  origin:"*"
}))
app.post("/User/Signup",async (req,res)=>{
    const {name,mobile,email,password,designation,roll} = req.body;
    console.log(req.body);
try{
   const user_data = await user.findOne({email});
    if(user_data){
       return res.status(401).send("user already signup");
    }else{
        const new_user = await user({name,email,password,mobile,designation,roll});
        await new_user.save();
        return res.status(201).json({new_user});
    }
    }catch(error){
        return res.status(400).json({error:error.message});
    }
})

app.post("/User/Login", async (req, res) => {
    const { email, password } = req.body;
    try {
      console.log(req.body)
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        if (existingUser.password == password) {
          let payload = {
            user: {
              id: existingUser.id,
            },
          };
  
          jwt.sign(payload, "jwtpassword", (error, token) => {
            if (error) throw error;
            const userWithoutPassword = { ...existingUser._doc }; // mongodb data to plain javascript object can be converted 
            delete userWithoutPassword.password;
  
            return res.json({ token, user: userWithoutPassword });
           
           
          });
        } else {
          return res.status(400).send("password wrong");
        }
      } else {
        return res.status(400).send("email wrong");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get("/LoggedIn_user/:id",MiddleWare,async(req,res)=>{
    try{
const particular_user = await user.findById(req.params.id);
return res.status(200).json({particular_user});

    }catch(error){
        return res.status(400).json({error:error.message})
    }
})

app.get("/All_users",MiddleWare,async(req,res)=>{
    try{
const all_users = await user.find();
return res.status(200).json({all_users});
    }catch(error){
        return res.status(400).json({error:error.message})
    }
})



app.use(express.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://Dhanushinfotech_test:Dhanushinfotech_test@cluster0.6fg1xqr.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("DB CONNECTED");
  });
  



  app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})