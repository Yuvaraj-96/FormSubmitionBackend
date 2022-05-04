import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const port = process.env.PORT || 9002;

mongoose.connect('mongodb+srv://Yuvaraj:Admin123@cluster0.lpdgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log('Atles DB Connected')});


const userSchema = new mongoose.Schema({
    name:String,
    fullname:String,
    phoneNumber:String,
    email:String,
    password:String,
    date: { type: Date, default: Date.now },
});

const User = new mongoose.model("Portfoliouser",userSchema)

const PortfolioSchema = new mongoose.Schema({
    username:String,
    fullname:String,
    jobdescription:String,
    area1:String,
    area2:String,
    gitlink:String,
    instalink:String,
    linkedinlink:String,
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
    permition:Boolean,
    workdescription:String,
    email:String,
    mobile:String,
    date: { type: Date, default: Date.now },
});

const Portfoliodata = new mongoose.model("Portfoliodata",PortfolioSchema)


app.post("/getuserdatas", async(req,res)=>{
    const{username} = req.body;
    console.log(" /getuserdatas ")
    console.log(username+" : username")
   await Portfoliodata.findOne({username:username}).then((Portfoliodatauser)=>{
     console.log(Portfoliodatauser+" Portfoliodatauser")
        if(Portfoliodatauser){
            // if(password===user.password){
                res.send({Portfoliodatauser:Portfoliodatauser})
            // }else{
            //     res.send({message:"Password is incorrect"})
            // }
            
        }else{

            res.send({message:"User not Register. Kindly Fill the Form and Check"})           
        }
    })

})

app.post('/getuserdata',async(req,res)=>{


    console.log("getuserdata: ");

    Portfoliodata.findOne({username:req.params.username.toLowerCase()},(err,userdata)=>{
        console.log(req.params.username)
        if(userdata){
            res.send(userdata);
        }else if(err){

            res.send({message:"User data is not avaibale."})
        }
    }).catch((err)=>{
        console.log(err)
    });



})

app.post('/setuserdata',async(req,res)=>{
    const{username,fullname,jobdescription,area1,area2,service,serviceareatitle1,serviceareadesc1,
        serviceareadesc2,serviceareatitle2,serviceareadesc3,serviceareatitle3,gitlink,cvlink,
        yearexperiance,projectcomplited,companies,instalink,linkedinlink,currentyearexperiance,workdescription,mobile,email,date} = req.body;
       
    const setvalue={
        // $set:{
        username:username,
        fullname:fullname,
        jobdescription:jobdescription,
        area1:area1,
        area2:area2,
        gitlink:gitlink,
        instalink:instalink,
        linkedinlink:linkedinlink,
        services:{
            service:service,
            servicearea:{
                serviceareatitle1:serviceareatitle1,
                serviceareadesc1:serviceareadesc1,
                serviceareatitle2:serviceareatitle2,
                serviceareadesc2:serviceareadesc2,
                serviceareatitle3:serviceareatitle3,
                serviceareadesc3:serviceareadesc3
            }
        },
        cvlink:cvlink,
        yearexperiance:yearexperiance,
        projectcomplited:projectcomplited,
        currentyearexperiance:currentyearexperiance,
        companies:companies,
        workdescription:workdescription,
        email:email,
        mobile:mobile,
        date: date
    //    },mobile,email
    }

    const updatevalue={
         $set:{
        username:username,
        fullname:fullname,
        jobdescription:jobdescription,
        area1:area1,
        area2:area2,
        gitlink:gitlink,
        instalink:instalink,
        linkedinlink:linkedinlink,
        services:{
            service:service,
            servicearea:{
                serviceareatitle1:serviceareatitle1,
                serviceareadesc1:serviceareadesc1,
                serviceareatitle2:serviceareatitle2,
                serviceareadesc2:serviceareadesc2,
                serviceareatitle3:serviceareatitle3,
                serviceareadesc3:serviceareadesc3
            }
        },
        cvlink:cvlink,
        yearexperiance:yearexperiance,
        projectcomplited:projectcomplited,
        currentyearexperiance:currentyearexperiance,
        companies:companies,
        workdescription:workdescription,
        email:email,
        mobile:mobile,
        date:date
       }
    }
    console.log("setuserdata: ");
    console.log("username : "+username);
    
    
          await Portfoliodata.findOne({username:username}).then( async(docs)=>{
    console.log("docs: "+docs);

    if(docs){

    await Portfoliodata.updateOne( {username:username },updatevalue).then(Portfoliodatasubmit=>{
       // console.log("req.params.updateOne : "+Portfoliodatas)
       // console.log("req.params.username : "+req.params.username)
        console.log("Portfoliodatasubmit : "+Portfoliodatasubmit)
        console.log("err : "+err)

        if(Portfoliodatasubmit){
            res.send({message:"Portfolio data Updated successful"})
           
           
        }else{
            res.send({message:"Error in updating Portfolio data submited successful"})
           
        }
    });

}else{


    const Portfoliodatasave = new Portfoliodata(setvalue);
    
             await Portfoliodatasave.save().then(Portfoliodatasubmit=>{
            console.log("req.params.Portfoliodatasubmit else : "+Portfoliodatasubmit)
            console.log("req.params.setvalue : "+JSON.stringify(setvalue))
            //console.log("req.params.username else : "+req.params.username)
            if(Portfoliodatasubmit){
                res.send({message:"Portfolio data submited successful"})
            }else{
    
                res.send({message:"Error in submited Portfolio data"})
            }
        });



}

}).catch((err)=>{
            console.log(err)
        });

      //  console.log("findoneresult.toObject(): "+findoneresult.toObject())
 if(true){
   
        
    }else{

        const Portfoliodatasave = new Portfoliodata(setvalue);
        let result =  Portfoliodatasave.save((err,Portfoliodatasubmit)=>{
            console.log("req.params.username else : "+req.params.username)
            if(Portfoliodatasubmit){
                res.send({message:"Portfolio data submited successful"})
            }else{
    
                res.send({message:"Error in updating Portfolio data submited successful"})
            }
        });             
    }
})
       

app.post("/login", (req,res)=>{
    const{email,password} = req.body;
    console.log("Inside login ");
    User.findOne({email:email},(err,user)=>{
        console.log(user)
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

app.post("/register",async (req,res)=>{

    const{name,email,password,fullname,phoneNumber} = req.body;
    console.log("Inside register ");
    await User.findOne({email:email}).then(async(user)=>{
        if(user){
           // 
            res.send({message:" User already register"})
            console.log("User already register ");
        }else{
            const user = new User({name,email,password,fullname,phoneNumber});
           // console.log("User already register ");
           await user.save().then(err=>{
                 if(err){
                    res.send({message:"Successfully Registered."})
                    console.log("New register ");                        
                        }else{
                            res.send(err)
                              
                            }
                     })
        }
    })
    
});

app.listen(port,()=>{
    console.log(("Started at port 9002"));
});
