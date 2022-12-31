const TicketController = require('../controllers/ticket.controller');
const { authenticate, isAgent } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/tickets', authenticate, TicketController.createTicket);
    app.get('/api/tickets', authenticate, TicketController.getAllTickets);
    app.get('/api/tickets/:id',authenticate, TicketController.getTicket);
    app.put('/api/tickets/:id',isAgent, TicketController.updateTicket);
    app.delete('/api/tickets/:id',authenticate, TicketController.deleteTicket);
}
