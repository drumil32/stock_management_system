const mongoose = require('mongoose');
const bcrypt = require(`bcrypt`);
const jwt = require('jsonwebtoken');

const boughtStockSchema = new mongoose.Schema({
    stockname:{
        type:String,
    },
    boughtprice:{
        type:Number,
    }
});
const soldStockSchema = new mongoose.Schema({
    stockname:{
        type:String,
    },
    boughtprice:{
        type:Number,
    },
    soldprice:{
        type:Number,
    }
})
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required : true
    },
    lastname: {
        type: String,
        required : true
    },
    emailid: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    money:{
        type: Number,
    },
    boughtStock:{
        type:[],
    },
    soldStock:{
        type:[]
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});

userSchema.methods.generateAuthToken = async function() {
    try{
        const token =  jwt.sign({_id:this._id},process.env.SECRET_KEY);
        console.log(token);
        return token;
    }catch(err){
        res.send(err);
    }
}

const User = new mongoose.model('USER', userSchema);

module.exports = User;