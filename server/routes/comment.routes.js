const CommentController = require('../controllers/comment.controller');
const { canGetComments, canCreateComment } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/comments', canCreateComment, CommentController.createComment);
    app.get('/api/comments', canGetComments, CommentController.getAllComments);
}
