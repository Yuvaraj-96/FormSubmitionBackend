import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb+srv://3@?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log('DB Connected')});

const userSchema = new mongoose.Schema({
    name:String,
    fullname:String,
    phoneNumber:String,
    email:String,
    password:String
});

const User = new mongoose.model("Portfoliouser",userSchema)

const PortfolioSchema = new mongoose.Schema({
    name:String,
    fullname:String,
    jobdescription:String,
    area1:String,
    area2:String,
    gitlink:String,
    services:{
        service:String,
        servicearea:{
            serviceareatitle1:String,
            serviceareadesc1:String,
            serviceareatitle2:String,
            serviceareadesc2:String,
            serviceareatitle3:String,
            serviceareadesc3:String
        }
    },
    cvlink:String,
    yearexperiance:String,
    projectcomplited:String,
    companies:String,
});

const Portfoliodata = new mongoose.model("Portfoliodata",PortfolioSchema)




app.get('/username/:username', (req,res)=>{
    Portfoliodata.findOne({username:req.params.username},(err,Portfoliodata)=>{
        if(Portfoliodata){
            // if(Portfoliodata.username){
                res.send({Portfoliodata:Portfoliodata})
            // }else{
            //     res.send({message:"User not register alreadyPassword is incorrect"})
            // }
            
        }else{

            res.send({message:" User is not register already"})           
        }
    })



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
    User.findOne({email:email.toLowerCase()},(err,user)=>{
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
