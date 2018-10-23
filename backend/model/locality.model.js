module.exports = (sequelize, Sequelize) => {

	const Locality = sequelize.define('locality', {
		uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
        },      
        municipality_id : {
            type: Sequelize.UUID,
            allowNull: true
        },
        city:{
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

	return Locality;
}