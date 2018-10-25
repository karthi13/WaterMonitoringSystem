const db = require('../config/db.config.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const Municipality = db.municipality;


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