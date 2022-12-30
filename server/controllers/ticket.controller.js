const {Ticket} = require('../models/ticket.model');

module.exports.createTicket = (request,response) => {
    const {subject, description, requester} = request.body;
    Ticket.create({
        subject,
        description,
        requester
    })
    .then(ticket => response.json(ticket))
    .catch(err => response.status(400).json(err));
}

module.exports.getAllTickets = (request, response) => {
    Ticket.find({})
    .then(tickets => response.json(tickets))
    .catch(err => response.json(err))
}

module.exports.getTicket = (request, response) => {
    Ticket.findOne({_id: request.params.id})
    .then(ticket => response.json(ticket))
    .catch(err => response.json(err))
}

module.exports.updateTicket = (request, response) => {
    Ticket.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
    .then(updatedTicket => response.json(updatedTicket))
    .catch(err => response.status(400).json(err))
}

module.exports.deleteTicket = (request, response) => {
    Ticket.deleteOne({_id: request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json(err));
}