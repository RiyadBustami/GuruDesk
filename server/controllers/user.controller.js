const { request, response } = require('express');
const { User } = require('../models/user.model');

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
    User.create(request.body)
        .then(user => {
            response.json({msg: "Registered Successfully!", user: user})
        })
        .catch(err => response.json(err));
}
