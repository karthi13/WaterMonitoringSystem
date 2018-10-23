const db = require('../config/db.config.js');
const Customer = db.customers;
const Address = db.address;

// Post a Customer
exports.create = (req, res) => {	
	// Save to MySQL database
	
	var customer;
	Customer.create({ 
	  //customerid: db.sequelize.Utils.generateUUID(),
	  firstname: req.body.firstname,
	  lastname: req.body.lastname,
	  age: req.body.age
	}).then(createdCustomer => {		
		// Send created customer to client
		customer = createdCustomer;
		
		return Address.create({
			street: req.body.street,
			phone: req.body.phone
		})
	}).then(address => {
		customer.setAddress(address)
		res.send('OK');
	})
};
 

// FETCH all Customers include Addresses
exports.findAll = (req, res) => {
	Customer.findAll({
		attributes: [['uuid', 'customerId'], ['firstname', 'name'], 'age'],
		include: [{
			model: Address,
			where: { fk_customerid: db.Sequelize.col('customer.uuid') },
			attributes: ['street', 'phone']
		}]
	}).then(customers => {
	   res.send(customers);
	});
};