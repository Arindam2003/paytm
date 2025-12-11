const express=require('express');
const zod=require('zod');
const { User } = require('../Schema/user.schema');
const jwt=require('jsonwebtoken');
const router=express.Router();

const signupSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})

router.post('/signup',async(req,res)=>{
    const body=req.body;
    const {sucess}=signupSchema.safeParse(body);

    if(!sucess)
    {
        return res.json({
            message: "Email is already taken or invaid input"
        })
    }

    const user=User.findOne({
        username:body.username
    })

    if(user._id){
        return res.json({
            message:"Email already taken"
        })
    }

    const newUser=await User.create(body);

    const token=jwt.sign({
        userId: newUser._id
    },JWT_SECRET)

    res.json({
        message:"User created Successfully",
        token:token 
    })
})

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
})

router.post("/signin",async(req,res)=>{
    const body=req.body;
    const {sucess}=signinBody.safeParse(body);
    
    if(!sucess)
    {
        return res.json({
            message: "Invalid Input"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.json({
        message: "Error while logging in"
    })

})

module.exports=router;