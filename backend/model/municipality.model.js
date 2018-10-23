module.exports = (sequelize, Sequelize) => {

	const Municipality = sequelize.define('municipality', {
        uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
        },
        municipality_name:{
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

	return Municipality;
}