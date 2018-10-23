'use strict';

// The user controller.
var UserController = {
    index: function(req, res) {
        res.status(200).json({ message: 'Welcome to the users area ' + req.user.first_name + '!' });
    }
};

module.exports = UserController;