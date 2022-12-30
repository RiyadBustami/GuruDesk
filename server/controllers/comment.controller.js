const {Comment} = require('../models/comment.model');

module.exports.createComment = (request,response) => {
    const {text,ticket,user} = request.body;
    Comment.create({
        text,
        ticket,
        user
    })
    .then(comment => response.json(comment))
    .catch(err => response.status(400).json(err));
}

module.exports.getAllComments = (request, response) => {
    Comment.find({})
    .then(comments => response.json(comments))
    .catch(err => response.json(err))
}

module.exports.getComment = (request, response) => {
    Comment.findOne({_id: request.params.id})
    .then(comment => response.json(comment))
    .catch(err => response.json(err))
}

module.exports.updateComment = (request, response) => {
    Comment.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
    .then(updatedComment => response.json(updatedComment))
    .catch(err => response.status(400).json(err))
}

module.exports.deleteComment = (request, response) => {
    Comment.deleteOne({_id: request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json(err));
}