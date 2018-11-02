
const db = require('../config/db.config.js');

const Locality = db.locality;

// create a tankwatermeasurements
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

exports.getAllLocalities = (req, res) => {
	Locality.findAll().then(localities => {
        console.log(localities)
		res.json(localities);
	});
};

exports.getAllLocalitiesByMunicipality = (req, res) => {
    // console.log(req);
	Locality.findAll({ where: {municipality_id: req.query.municipality_id} }).then(localities => {
        console.log(localities)
		res.json(localities);
	});
};


