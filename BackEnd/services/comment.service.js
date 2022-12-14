// Gettign the Newly created Mongoose Model we just created 
var Comment = require('../models/Comment.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Comment List
exports.getComments = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Comments = await Comment.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Comments;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Comments');
    }
}

exports.createComment = async function (comment) {
    // Creating a new Mongoose Object by using the new keyword
    

    var newComment = new Comment({
        
        
        text:comment.text,
        score: comment.score,
        idClass: comment.idClass,
        idUser: comment.idUser,
        status: comment.status,
        createdDate: new Date()
    })
    
    

    try {
        // Saving the Comment 
        var savedComment = await newComment.save();
        var token = jwt.sign({
            id: savedComment._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Comment")
    }
}

exports.updateComment = async function (comment) {
    
    var id = {_id :comment._id}

    try {
        //Find the old User Object by the Id for Student
        var oldComment = await Comment.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Comment")
    }
    // If no old Comment Object exists return false
    if (!oldComment) {
        return false;
        
    }
    //Edit the Comment Object
    
    
    oldComment.status = comment.status
    
    try {
        var savedComment = await oldComment.save()
        return savedComment;
    } catch (e) {
        throw Error("And Error occured while updating the Comment");
    }
}

exports.deleteComment = async function (id) {

    // Delete the comment
    try {
        var deleted = await Comment.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Comment Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Comment")
    }
}

