module.exports = (sequelize, Sequelize) => {

	const UserWaterConsumption = sequelize.define('user_water_consumption', {
		uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
        },      
        user_id : {
            type: Sequelize.UUID,
            allowNull: true
        },
        water_used:{
            type: Sequelize.DOUBLE 
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        }
	}, {
        underscored: true
      });

	return UserWaterConsumption;
}