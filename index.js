import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



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
    // phoneNumber:String,
    // email:String,
    // password:String,
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




app.post("/getuserdatas", (req,res)=>{
    const{username} = req.body;
    console.log(username+" name")
    Portfoliodata.findOne({name:username},(err,Portfoliodatauser)=>{
       // console.log(Portfoliodatauser+" Portfoliodatauser")
        if(Portfoliodatauser){
            // if(password===user.password){
                res.send({Portfoliodatauser:Portfoliodatauser})
            // }else{
            //     res.send({message:"Password is incorrect"})
            // }
            
        }else{

            res.send({message:" User not register already"})           
        }
    })

})

app.post('/getuserdata', (req,res)=>{


    console.log("getuserdata: ");

    Portfoliodata.findOne({name:req.params.username.toLowerCase()},(err,userdata)=>{
        console.log(req.params.username)
        if(userdata){
            res.send(userdata);
        }else if(err){

            res.send({message:"User data is not avaibale."})
        }
    }).catch((err)=>{
        console.log(err)
    });

    // let findoneresult=await Portfoliodata.findOne({name:req.params.username},async(err, userdata)=>{
    //     console.log("docs: "+userdata);
    
    //     if(userdata){
    //         res.send(userdata);

    //     }else if(err){

    //         res.send({message:"User data is not avaibale."})
    //     }

    // })


})

app.post('/setuserdata',  (req,res)=>{
    const{name,fullname,jobdescription,area1,area2,service,serviceareatitle1,serviceareadesc1,
        serviceareadesc2,serviceareatitle2,serviceareadesc3,serviceareatitle3,gitlink,cvlink,
        yearexperiance,projectcomplited,companies} = req.body;

    const setvalue={
        // $set:{
        name:name.toLowerCase(),
        fullname:fullname,
        jobdescription:jobdescription,
        area1:area1,
        area2:area2,
        gitlink:gitlink,
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
        companies:companies
    //    }
    }

    const updatevalue={
         $set:{
        name:name,
        fullname:fullname,
        jobdescription:jobdescription,
        area1:area1,
        area2:area2,
        gitlink:gitlink,
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
        companies:companies
       }
    }

let findoneresult= Portfoliodata.findOne({name:req.params.username},async(err, docs)=>{
    console.log("docs: "+docs);

    if(docs){

    let result =  Portfoliodata.updateOne( {username:req.params.username }, updatevalue,{new: true},(err,Portfoliodatasubmit)=>{
       // console.log("req.params.updateOne : "+Portfoliodatas)
        console.log("req.params.username : "+req.params.username)
       // console.log("Portfoliodatasubmit : "+Portfoliodatasubmit)
        if(Portfoliodatasubmit){
            res.send({message:"Portfolio data Updated successful"})
           
           
        }else{
            res.send({message:"Error in updating Portfolio data submited successful"})
           
        }
    }).catch((err)=>{
        console.log(err)
    });

}else{


    const Portfoliodatasave = new Portfoliodata(setvalue);
        let result = Portfoliodatasave.save((err,Portfoliodatasubmit)=>{
            console.log("req.params.Portfoliodatasubmit else : "+Portfoliodatasubmit)
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
    //findoneresult.toObject()
        // async()=>{
           
        //     // if(Portfoliodatas){
        //        // const Portfoliodatasave = new Portfoliodata(updatevalue);
                
        //         let result = await Portfoliodata.updateOne({username:req.params.username }, updatevalue,{new: true}).then((err,Portfoliodatasubmit)=>{
        //             console.log("req.params.updateOne : "+Portfoliodatas)
        //             console.log("req.params.username : "+req.params.username)
        //             console.log("Portfoliodatasubmit : "+Portfoliodatasubmit)
        //             if(Portfoliodatasubmit){
        //                 res.send({message:"Portfolio data submited successful"})
        //             }else{
            
        //                 res.send({message:"Error in updating Portfolio data submited successful"})
        //             }
        //         })

        //     // }


        // }




        //const Portfoliodatas = new Portfoliodata({setvalue});
        //insertOne
        // Portfoliodatas.save((err,Portfoliodatasubmit)=>{
        //     console.log("req.params.username : "+req.params.username)
        //     if(Portfoliodatasubmit){
        //         res.send({message:"Portfolio data submited successful"})
        //     }else{
    
        //         res.send({message:"Error in updating Portfolio data submited successful"})
        //     }
        // })
        
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

        // Portfoliodata.updateOne({username:req.params.username ,setvalue},(err,Portfoliodatasubmit)=>{
        //     console.log("req.params.username : "+req.params.username)
        //     if(Portfoliodatasubmit){
        //         res.send({message:"Portfolio data submited successful"})
        //     }else{
    
        //         res.send({message:"Error in updating Portfolio data submited successful"})
        //     }
        // })       
    }
})


   
        
        
        //,(err,Portfoliodata)=>{
        // if(Portfoliodata){
        //     // if(Portfoliodata.username){
        //         res.send({Portfoliodata:Portfoliodata})
        //     // }else{
        //     //     res.send({message:"User not register alreadyPassword is incorrect"})
        //     // }
            
        // }else{

        //     res.send({message:" User is not register already"})           
        // }
   // })



    //res.send("My API");

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
       // console.log("user /register : "+ user);
        if(user){
           // console.log("User already register ");
            res.send({message:" User already register"})
        }else{

            const user = new User({name,email,password},{timestamps: true});
           // console.log("User already register ");
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