module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        user_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.UUID
        },    

        status: {
            type: Sequelize.TINYINT,
            defaultValue: 1
        },
 
        first_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        last_name: {
            type: Sequelize.STRING,
            notEmpty: true
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

 
    });
 
    return User;
 
}