const models = require('../models')
const Validator = require('fastest-validator')



function save(req, res){
    const post = {
        //attribute to insert
        //dbfield: bodyfield
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1
    }

    const schema = {
        title:{type:"string", optional: false, max:"100"},
        content:{type:"string", optional: false, max:"500"},
        categoryId:{type:"number", optional: false, max:"100"}
    }

    const valid = new Validator()
    const validationResponse = valid.validate(post,schema)

    if (validationResponse !== true){
        return res.status(400).json({
            message:"Validation failed",
            errors:validationResponse
        })
    }

    models.Post.create(post).then(result=>{
        res.status(201).json({
            message: "Post created successfully",
            post: result
        });

    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function show(req, res){
    const id = req.params.id

    models.Post.findByPk(id).then(result=>{
        if(result){
            res.status(200).json({
            message: "success",
            post:result
        })
        }else{
            res.status(404).json({
            message:"Post not found",
        })
    }
       
    }).catch(error=>{
        res.status(500).json({
            message:"Something went wrong!",
            error: error
        })
    });
}


function index(req, res){
   
    models.Post.findAll().then(result=>{
        res.status(200).json({
            message:"success",
            post: result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Something went wrong!", 
            error: error
        })
    });
}

function update(req, res){
    const id = req.params.id;
    const updatePost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
    }
    const userId = 1;

    const schema = {
        title:{type:"string", optional: false, max:"100"},
        content:{type:"string", optional: false, max:"500"},
        categoryId:{type:"number", optional: false, max:"100"}
    }

    const valid = new Validator()
    const validationResponse = valid.validate(updatePost,schema)

    if (validationResponse !== true){
        return res.status(400).json({
            message:"Validation failed",
            errors:validationResponse
        })
    }

    models.Post.update(updatePost, {
        where:{
            id:id,
            userId: 1
        }
    }).then(result =>{
        res.status(200).json({
            message: "Post updated successfully",
            post: updatePost
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Something went wrong!",
            error: error
        })

    })
}

function destroy(req, res){
    const id = req.params.id;
    const userId = 1

    models.Post.destroy({
        where:{
            id:id,
            userId: userId
        }
    }).then(result =>{
        res.status(200).json({
            message: "Post deleted successfully",
            code: 200
        })
    }).catch(error =>{
       res.status(500).json({
        message: "Something went wrong!",
        error:error
       })
    })

}




module.exports = {
   save: save, 
   show: show,
   index: index,
   update: update,
   destroy: destroy
}