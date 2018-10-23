module.exports = (sequelize, Sequelize) => {

	const LocalityAddress = sequelize.define('locality_address', {
		uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
        },
        locality_id : {
            type: Sequelize.UUID,
            allowNull: true
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
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updated_at:  Sequelize.DATE,
	}, {
        underscored: true
      });

	return LocalityAddress;
}