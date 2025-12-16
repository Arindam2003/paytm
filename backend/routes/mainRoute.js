const express=require('express');
const userRouter=require('./user');
const accountRouter=require('./accountRouter')

const router=express.Router();

router.use('/user',userRouter); // /user/signup
router.use('/accounts',accountRouter);  
// <- thinking for account ad transaction purpose


module.exports=router;