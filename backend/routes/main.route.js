module.exports = function (app, passport) {

    const user = require('../controller/register.controller.js');
    const municipality = require('../controller/municipality.controller.js');
    const locality = require('../controller/locality.controller.js');

    // CCreate a new User
    app.post('/api/registerUser', user.createUser);
    app.post('/api/createMunicipality', municipality.createMunicipality);
    app.post('/api/createLocality', locality.createLocality);

    // User login
    app.post('/api/login', user.authenticateUser);

    app.get('/api/getLocalities', locality.getAllLocalities);
    app.get('/api/getMunicipalites',municipality.getAllMunicipalities);
    app.get('/api/getAllLocalitiesByMunicipality', locality.getAllLocalitiesByMunicipality);
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //routes restriction !!
    var config = require('../config'),
        AdminController = require('../controller/adminController'),
        //allowOnly = require('../services/routesHelper').allowOnly,
        UserController = require('../controller/userController');

    'use strict';
    var allowOnly = function (accessLevel, callback) {
        function checkUserRole(req, res) {
            if (!(accessLevel & req.user.role)) {
                res.sendStatus(403);
                return;
            }

            callback(req, res);
        }

        return checkUserRole;
    };
    //test for page restrict 
    app.get('/api/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));

    app.get('/api/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    /////////////////////////////////////
}