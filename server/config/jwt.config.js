const jwt = require("jsonwebtoken");
const {Ticket} = require('../models/ticket.model');
const { User } = require('../models/user.model');
const {Comment} = require('../models/comment.model');
const { response } = require("express");

module.exports.authenticate = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}

module.exports.isAdmin = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            if (payload.isAdmin) {
                console.log(payload);
                console.log(payload.isAdmin);
                next();
            } else {
                response.status(401).json({ verified: false });
            }
        }
    });
}

module.exports.isAgent = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false, msg:"1" });
        } else {
            if (payload.isAgent||payload.isAdmin) {
                console.log(payload);
                console.log(payload.isAgent);
                next();
            } else {
                response.status(401).json({ verified: false });
            }
        }
    });
}

module.exports.hasTicketAccess = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, async(err, payload) => {
        if (err) {
            response.status(401).json({ verified: false, msg:"1" });
        } else {
            const ticket = await Ticket.findById(request.params.id);
            console.log(ticket.requester);
            console.log(payload.id)
            if (ticket.requester._id==payload.id||payload.isAgent||payload.isAdmin) {
                next();
            } else {
                response.status(401).json({ verified: false });
            }
        }
    });
}