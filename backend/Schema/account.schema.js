const mongoose = require("mongoose");
const { User } = require("./user.schema");

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required: true
    },
    username:{type:String}
})

const Account = mongoose.model("Account", accountSchema);

module.exports={
    Account,
}