module.exports = function (app, passport) {

    const user = require('../controller/register.controller.js');
    const municipality = require('../controller/municipality.controller.js');
    const locality = require('../controller/locality.controller.js');
    const waterUsage = require('../controller/userWaterUsage.controller');

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

    app.post('/api/storeWaterUsed', waterUsage.waterUsed);
    app.get('/api/getUsageToday', waterUsage.findWaterUsageToday);
    app.get('/api/getUsageMonth', waterUsage.findWaterUsageMonth);
    app.get('/api/getUsageYear', waterUsage.findWaterUsageYear); 
    app.get('/api/getUsageHour', waterUsage.findWaterUsagePerHour);

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

    //here the problem how to get from the token username
    // to get userID of the username, it's simple using sequlize 
    // app.get('/api/today', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, waterUsage.find_water_usage_specific_day));
    // app.get('/api/this_month', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, waterUsage.find_water_usage_specific_month));
    // app.get('/api/this_year', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, waterUsage.find_water_usage_specific_year));

    app.get('/api/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    /////////////////////////////////////
}