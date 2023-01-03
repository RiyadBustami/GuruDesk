const TicketController = require('../controllers/ticket.controller');
const { authenticate, isAgent, isAdmin, hasTicketAccess, canUpdateTicket } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/tickets', authenticate, TicketController.createTicket);
    app.get('/api/tickets', isAgent, TicketController.getAllTickets);
    app.get('/api/tickets/user/:user', authenticate, TicketController.getMyTickets);
    app.get('/api/tickets/:id',hasTicketAccess, TicketController.getTicket);
    app.put('/api/tickets/:id',canUpdateTicket, TicketController.updateTicket);
    app.delete('/api/tickets/:id',isAdmin, TicketController.deleteTicket);
}
