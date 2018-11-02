module.exports = (sequelize, Sequelize) => {

	const TankWaterMeasurements = sequelize.define('tank_water_measurements', {
		uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
        },
        lake_id:{
            type: Sequelize.STRING,
        },      
        sensor_id:{
            type: Sequelize.UUID,
        },      
        water_income:{
            type: Sequelize.DOUBLE,
        },
        water_outgoing:{
            type: Sequelize.DOUBLE,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updated_at:  Sequelize.DATE,
	}, {
        underscored: true
      });

	return TankWaterMeasurements;
}