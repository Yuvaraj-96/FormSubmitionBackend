import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb+srv://Yuvaraj:Admin123@cluster0.lpdgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log('DB Connected')});

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const User = new mongoose.model("Portfoliouser",userSchema)

app.get("/", (req,res)=>{
    res.send("My API");
});

app.post("/login", (req,res)=>{
    const{email,password} = req.body;

    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Successfull ",user:user})
            }else{
                res.send({message:"Password is incorrect"})
            }
            
        }else{

            res.send({message:" User not register already"})           
        }
    })




    
})

app.post("/register", (req,res)=>{
    const{name,email,password} = req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:" User already register"})
        }else{

            const user = new User({name,email,password});
            user.save(err=>{
                 if(err){
                         res.send(err)
                        }else{
                               res.send({message:"Successfully Registered. Kindly log in."})
                            }
                     })
        }
    })
    
    console.log(req.body);
    // res.send("My API Register")
});

app.listen(9002,()=>{
    console.log(("Started at port 9002"));
});