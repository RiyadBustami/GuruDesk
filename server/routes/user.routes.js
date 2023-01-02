const UserController = require('../controllers/user.controller');
const { authenticate, isAgent, isAdmin } = require('../config/jwt.config');
module.exports = app => {
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.get("/api/users", isAdmin, UserController.getAllUsers);
    app.get('/api/users/:id', isAgent, UserController.getUser);
    app.put('/api/users/:id', isAdmin, UserController.updateUser);
    app.delete('/api/users/:id', isAdmin, UserController.deleteUser);
    app.get('/api/logout',authenticate, UserController.logout);
    app.get('/api/loggedin', authenticate, UserController.getLoggedInUser);
}