const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:[true],
    },
    ticket:{
        type: mongoose.Types.ObjectId,
        ref:"Ticket"
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
    }
}, {timestamps:true});

module.exports.Comment = mongoose.model('Comment', CommentSchema);