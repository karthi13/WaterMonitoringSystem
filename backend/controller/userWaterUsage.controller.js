'use strict';
const db = require('../config/db.config.js');

const WaterUsage = db.waterUsage;

exports.waterUsed = (req,res) => {

    console.log('Water Usage Created!');
    WaterUsage.create({
        user_id : req.body.user_id,
        water_used : req.body.water_used
    }).then(()=>{
        res.json({
            message : "Stored in DB",
            success : true
        })
    });
    
}