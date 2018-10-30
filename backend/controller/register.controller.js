const db = require('../config/db.config.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const Municipality = db.municipality;
const LocalityAddress = db.localityAddress;
const User = db.user;

// const Customer = db.customers;
// const Address = db.address;

exports.createUser = (req, res) => {

	User.findOne({ where: { email: req.body.email } }).then(user => {
		if (user) {
			return done(null, false, {
				message: 'That email is already taken'
			});
		} else {
			console.log('the email is not take and generating hash');
			
			var data = {
				email: req.body.email,
				password: req.body.password,
				first_name : req.body.first_name,
				last_name : req.body.last_name,
				phone_num : req.body.phone_num,
				role : req.body.role,
				house_number:req.body.house_number,
				street:req.body.street ,
				postcode:req.body.postcode,
				locality_id : req.body.locality_id
			};

			User.create(data).then((newUser, created) => {
				if (!newUser) {
					return done(null, false);
				}

				if (newUser) {
					let response = {
						message : "User registered Successfully",
						status : "success",
					}
					res.json(response);
				}
			});
		}
	});
};

// create a municipality
exports.createMunicipality = (req, res) => {
	// Save to MySQL database
	console.log(req.body);
	Municipality.create({
		municipality_name: req.body.municipality_name,
		created_at: new Date(),
	}).then(municipality => {
		res.json(municipality);
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
				res.status(200).json({ message: 'User not Registered!!!', success:false });
			} else {
				//console.log("compre now with "+ password+ user.password );
				comparePasswords(password,user.password, function (error, isMatch) {
					
					if (isMatch && !error) {
						console.log("Same password Success!");
						var token = jwt.sign(
							{ email: user.email },
							config.keys.secret,
							{ expiresIn: '60m' }
						);

						res.json({
							success: true,
							token: 'Bearer ' + token,
							role: user.role // role is user !
						});

					} else {
						res.status(200).json({ message: 'Login failed!', success:false });
					}
				});
			}
		}).catch(function (error) {
			res.status(500).json({ message: 'There was an error!' });
		});
	}
}





