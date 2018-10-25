const db = require('../config/db.config.js');

const Locality = db.locality;

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