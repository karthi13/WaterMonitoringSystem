'use strict';

// The admin controller.
var AdminController = {
    index: function(req, res) {
        res.status(200).json({ message: 'Welcome to the admin area ' + req.user.first_name + '!' });
    }
};

module.exports = AdminController;