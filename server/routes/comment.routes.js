const CommentController = require('../controllers/comment.controller');
const { canGetComments, canCreateComment, authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/comments', canCreateComment, CommentController.createComment);
    app.get('/api/comments', canGetComments, CommentController.getAllComments);
    app.get('/api/comments/ticket/:id', authenticate, CommentController.getTicketComments);
}
