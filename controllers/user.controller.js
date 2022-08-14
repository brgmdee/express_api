const models = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function signup(req, res){

    models.User.findOne({
        where:{
            email:req.body.email
        }
    }).then(result=>{
        if(result){
          res.status(409).json({
                message: "Email already exist",
            });
        }else{
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(req.body.password, salt, function(err, hash){
        
                    const user = {
                        name: req.body.name,
                        email:req.body.email,
                        password:hash
                    }
                
                    models.User.create(user).then(result=>{
                        res.status(201).json({
                            message: "User created successfully",
                            user: result
                        });
                
                    }).catch(error =>{
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error
                        });
                    });
                })
            })
        }
    }).catch(error =>{
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });

}

function login(req, res){
    
    models.User.findOne({where:{
        email: req.body.email
    }}).then(user =>{

        if(user === null){
            res.status(401).json({
                message:"Invalid credentials"
            });
        }else{
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email:user.email,
                        userId:user.userId
                    },process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message:"Authentication successfully",
                            token:token
                        });
                    });

                }else{
                    res.status(401).json({
                        message:"Invalid credentials"
                    });
                }
            });
        }

    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })
}

module.exports = {
    signup: signup,
    login:login
 }