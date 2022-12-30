const CommentController = require('../controllers/comment.controller');

module.exports = function(app){
    app.post('/api/comments', CommentController.createComment);
    app.get('/api/comments', CommentController.getAllComments);
    app.get('/api/comments/:id', CommentController.getComment);
    app.put('/api/comments/:id', CommentController.updateComment);
    app.delete('/api/comments/:id', CommentController.deleteComment);
}
