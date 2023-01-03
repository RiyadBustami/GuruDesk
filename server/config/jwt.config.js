const jwt = require("jsonwebtoken");
const { Ticket } = require('../models/ticket.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');
const { response } = require("express");

module.exports.authenticate = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            if(request.body.description){request.body.requester = payload.id;}
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
            response.status(401).json({ verified: false });
        } else {
            if (payload.isAgent || payload.isAdmin) {
                next();
            } else {
                response.status(401).json({ verified: false });
            }
        }
    });
}

module.exports.hasTicketAccess = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            const ticket = await Ticket.findById(request.params.id);
            if (ticket.requester._id == payload.id || payload.isAgent || payload.isAdmin) {
                next();
            } else {
                response.status(401).json({ verified: false });
            }
        }
    });
}

module.exports.canUpdateTicket = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            const ticket = await Ticket.findById(request.params.id);
            if (!ticket.assignee && (payload.isAgent || payload.isAdmin) && request.body.assignee == payload.id) {
                request.body.status = "Open";
                next();
            }
            else if ((ticket.assignee == payload.id || payload.isAdmin) && (request.body.status || request.body.priority)) {
                next();
            }
            else {
                response.status(401).json({ verified: false });
            }
        }
    });
}

module.exports.canCreateComment = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            const ticket = await Ticket.findById(request.body.ticket);
            console.log(ticket.requester._id);
            console.log(ticket.requester._id == payload.id && ticket.status !== "Closed");
            console.log(ticket.assignee._id == payload.id && ticket.status !== "Closed");
            if (ticket.requester._id == payload.id && ticket.status !== "Closed") {
                next();
            } else if (ticket.assignee._id == payload.id && ticket.status !== "Closed") {
                next();
            }
            else {
                response.status(401).json({ verified: false });
            }
        }
    });
}

module.exports.canGetComments = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            const ticket = await Ticket.findById(request.body.ticket);
            if (ticket.requester._id == payload.id || ticket.assignee._id == payload.id || this.isAdmin) {
                next();
            } else {
                response.status(401).json({ verified: false });
            }
        }
    });
}