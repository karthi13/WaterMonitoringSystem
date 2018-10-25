var Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
var config = require('../config');

module.exports = (sequelize, Sequelize) => {
    function comparePasswords(password, callback) {
        bcrypt.compare(password, this.password, function(error, isMatch) {
            if(error) {
                return callback(error);
            }
    
            return callback(null, isMatch);
        });
    }

    var modelOptions = {
        instanceMethods: {
            comparePasswords: comparePasswords
        },
        underscored: true
    };


	const User = sequelize.define('user', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
        },
        status:{
            type: Sequelize.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        },
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
        }, 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_num: {
            type: Sequelize.STRING
        },
        house_number:{
            type: Sequelize.STRING
        },
		street: {
			type: Sequelize.STRING
		},
		postcode: {
			type: Sequelize.STRING
        }, 
        role: {
            type: Sequelize.INTEGER,
            defaultValue: config.userRoles.user
        },
        locality_id : {
            type: Sequelize.UUID,
            allowNull: true
        },
    },modelOptions
    
    );

    /** This hook method will hash password before saving it to db*/
    User.beforeCreate((user, options) => {

        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
    });

	return User;
}