const TicketController = require('../controllers/ticket.controller');
const { authenticate, isAgent, isAdmin, hasTicketAccess } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/tickets', authenticate, TicketController.createTicket);
    app.get('/api/tickets', isAgent, TicketController.getAllTickets);
    app.get('/api/tickets/:id',hasTicketAccess, TicketController.getTicket);
    app.put('/api/tickets/:id',isAgent, TicketController.updateTicket);
    app.delete('/api/tickets/:id',authenticate, TicketController.deleteTicket);
}
