const TicketController = require('../controllers/ticket.controller');
const { authenticate, isAgent, isAdmin, hasTicketAccess, canUpdate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/tickets', authenticate, TicketController.createTicket);
    app.get('/api/tickets', isAgent, TicketController.getAllTickets);
    app.get('/api/tickets/:id',hasTicketAccess, TicketController.getTicket);
    app.put('/api/tickets/:id',canUpdate, TicketController.updateTicket);
    app.delete('/api/tickets/:id',isAdmin, TicketController.deleteTicket);
}
