module.exports = (sequelize, Sequelize) => {

	const LakeWaterMeasurements = sequelize.define('lake_water_measurements', {
		uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
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

	return LakeWaterMeasurements;
}