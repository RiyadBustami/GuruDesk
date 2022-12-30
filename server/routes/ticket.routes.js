const TicketController = require('../controllers/ticket.controller');

module.exports = function(app){
    app.post('/api/tickets', TicketController.createTicket);
    app.get('/api/tickets', TicketController.getAllTickets);
    app.get('/api/tickets/:id', TicketController.getTicket);
    app.put('/api/tickets/:id', TicketController.updateTicket);
    app.delete('/api/tickets/:id', TicketController.deleteTicket);
}
