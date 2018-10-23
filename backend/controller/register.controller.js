const db = require('../config/db.config.js');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const Municipality = db.municipality;
const Locality = db.locality;
const LocalityAddress = db.localityAddress;
const User = db.user;

const Customer = db.customers;
const Address = db.address;

// create user

exports.createUser = (req, res) => {
	User.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		phone_num: req.body.phone_num,
		role: req.body.role,
		house_number: req.body.house_number,
		street: req.body.street,
		postcode: req.body.postcode,
		locality_id: req.body.locality_id
	}).then(user => {
		// user.setLocalityAddress(localityAddress);
		res.json(user);
	})

};

// create a municipality
exports.createMunicipality = (req, res) => {
	// Save to MySQL database

	Municipality.create({
		municipality_name: req.body.municipality_name,
		created_at: new Date(),
	}).then(municipality => {
		res.json(municipality);
	})
};

// create a locality
exports.createLocality = (req, res) => {
	// Save to MySQL database

	Locality.create({
		municipality_id: req.body.municipality_id,
		city: req.body.city,
		created_at: new Date(),
	}).then(locality => {
		res.json(locality);
	})
};

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


// Authenticate a user.
// Compares two passwords.
function comparePasswords(password,userPass, callback) {
	console.log("inside");
	
	//bCrypt.compareSync(password, userpass);
	bcrypt.compare(password, userPass, function (error, isMatch) {
		//console.log("compre now with "+ password+ userPass );
		if (error) {
			console.log("NON "+ password+ userPass );
			return callback(error);

		}
		//isMatch=true;
		return callback(null, isMatch);
	});
	
};

exports.authenticateUser = function (req, res) {
	if (!req.body.email || !req.body.password) {
		res.status(404).json({ message: 'email and password are needed!' });
	} else {
		var email = req.body.email,
			password = req.body.password,
			potentialUser = { where: { email: email } };

		User.findOne(potentialUser).then(function (user) {
			if (!user) {
				res.status(404).json({ message: 'Authentication failed!' });
			} else {
				//console.log("compre now with "+ password+ user.password );
				comparePasswords(password,user.password, function (error, isMatch) {
					
					if (isMatch && !error) {
						console.log("Same password Success!");
						var token = jwt.sign(
							{ email: user.email },
							config.keys.secret,
							{ expiresIn: '30m' }
						);

						res.json({
							success: true,
							token: 'JWT ' + token,
							role: user.role // role is user !
						});

					} else {
						res.status(404).json({ message: 'Login failed!' });
					}
				});
			}
		}).catch(function (error) {
			res.status(500).json({ message: 'There was an error!' });
		});
	}
}





