const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:[true, "Please add a subject for your ticket"],
        minlength:[4, "ticket subject must be at least 4 characters long"]
    },
    description:{
        type:String,
        required:[true, "Please include a description of your ticket"],
        minlength:[10, "ticket description must be at least 10 characters"]
    },
    status:{
        type:String,
        enum : ['New','Open','Pending','Solved','Closed'],
        default: 'New'
    },
    priority:{
        type:String,
        enum: ['Low', 'Normal', 'High'],
        default:'Normal',
    },
    requester: {
        type: mongoose.Types.ObjectId, 
        ref: "User",
    },
    assignee: {
        type:mongoose.Types.ObjectId,
        ref:"User",
    }

}, {timestamps:true});

module.exports.Ticket = mongoose.model('Ticket', TicketSchema);