const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.get("/api/users", authenticate, UserController.getAllUsers);
    app.get('/api/users/:id', UserController.getUser);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
    app.get('/api/logout',UserController.logout);
}