const express=require('express');
const userRouter=require('./user');

const router=express.Router();

router.use('/user',userRouter); // /user/signup
// router.use('/accounts',accountRouter);


module.exports=router;