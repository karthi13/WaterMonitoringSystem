// Application configuration.
'use strict';

var config = module.exports;

config.keys = {
    secret: 'Cool/Koder' // Not anymore...
};

// Roles//
var userRoles = config.userRoles = {
    // guest: 0,    // ...001
    user: 1,     // ...010
    admin: 2    // ...100
};

config.accessLevels = {
    // guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user: userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
};