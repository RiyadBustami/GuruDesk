const { Ticket } = require('../models/ticket.model');

module.exports.createTicket = (request, response) => {
    Ticket.create(request.body)
        .then(ticket => response.json(ticket))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllTickets = (request, response) => {
    Ticket.find({}).sort({createdAt:-1}).populate("requester").populate("assignee")
        .then(tickets => response.json(tickets))
        .catch(err => response.json(err))
}
module.exports.getMyTickets = (request, response) => {
    Ticket.find({ requester: request.params.user }).sort({createdAt:-1}).populate("requester").populate("assignee")
        .then(tickets => response.json(tickets))
        .catch(err => response.json(err))
}

module.exports.getTicket = (request, response) => {
    Ticket.findOne({ _id: request.params.id }).populate("requester").populate("assignee")
        .then(ticket => response.json(ticket))
        .catch(err => response.json(err))
}

module.exports.updateTicket = (request, response) => {
    Ticket.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true })
        .then(updatedTicket => response.json(updatedTicket))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteTicket = (request, response) => {
    Ticket.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err));
}