const { request, response } = require('express');
const { User } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.createUser = (request, response) => {
    User.create(request.body)
        .then(user => response.json(user))
        .catch(err => response.status(400).json(err))
}

module.exports.getAllUsers = (request, response) => {
    User.find({})
        .then(users => response.json(users))
        .catch(err => response.status(400).json(err))
}

module.exports.getUser = (request, response) => {
    User.findById(request.params.id)
        .then(user => response.json(user))
        .catch(err => response.status(404).json(err))
}

module.exports.updateUser = (request, response) => {
    User.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteUser = (request, response) => {
    User.findByIdAndRemove(request.params.id)
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(404).json(err))
}

module.exports.register = (request, response) => {
    request.body.email = request.body.email.toLowerCase();
    User.create(request.body)
        .then(user => {

            const userToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
                isAgent: user.isAgent,
            }, process.env.SECRET_KEY);

            response
                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                    httpOnly: true
                })
                .json({ msg: "Registered successfully!" });
        })
        .catch(err => response.json(err));
}

module.exports.login = async (request, response) => {
    const user = await User.findOne({ email: request.body.email.toLowerCase() });

    if (user === null) {
        return response.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(request.body.password, user.password);

    if (!correctPassword) {
        return response.sendStatus(400);
    }

    const userToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
        isAgent: user.isAgent,
    }, process.env.SECRET_KEY);

    response
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json({ msg: "Logged in successfully!" });
}

module.exports.logout = (request, response) => {
    response.clearCookie('usertoken');
    response.sendStatus(200);
}

module.exports.getLoggedInUser = (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    User.findById(decodedJwt.payload.id)
        .then((user) => {
            res.json({
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    name: user.firstName+' '+user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isAgent: user.isAgent
                }
            });
        })
        .catch((error) => res.status(500).json(error));
}