module.exports = (sequelize, Sequelize) => {
	const Address = sequelize.define('address', {
	  street: {
		  type: Sequelize.STRING
	  },
	  phone: {
		  type: Sequelize.STRING
	  }
	});
	
	return Address;
}