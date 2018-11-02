'use strict';
const db = require('../config/db.config.js');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const WaterUsage = db.waterUsage;

exports.waterUsed = (req, res) => {

    console.log('Water Usage Created!');
    WaterUsage.create({
        user_id: req.body.user_id,
        water_used: req.body.water_used
    }).then(() => {
        res.json({
            message: "Stored in DB",
            success: true
        });
    });

}

// FETCH usage of specific day
// exports.find_water_usage_specific_date = (req, res) => {
//     waterUsage.findAll({
//         attributes: { include: [[sequelize.fn('COUNT', sequelize.col('water_used')), 'total_water_usage_for_day']] },
//         where: {
//             user_id: req.body.user_id,
//             [Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]
//         }
//     }).then(customers => {
//         res.send(customers);
//     });
// };

exports.findWaterUsageToday = (req, res) => {
    var date = new Date();
    console.log(date);
    WaterUsage.sum('water_used', {
        where: {
            user_id: req.query.user_id,
            //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]
//             sequelize.fn('date', sequelize.col('event_date')), 
//     '<=', '2016-10-10'
//   ),
            created_at: {
                [Op.lt]: new Date().setHours(0,59,59,0),
                [Op.gt]: new Date().setHours(0,0,0,0)
              }
        }
// where: sequelize.where(sequelize.fn('char_length', sequelize.col('status')), 6)
    }).then(sum => {
        console.log("The total water usage " + sum);


        res.json({
            message: "Total data from db",
            success: true,
            data : sum
        });
    })
};

exports.findWaterUsageMonth = (req, res) => {
    var month = moment().month();
    var year = moment().year() ;
    waterUsage.sum('water_used', {
        where: {
            user_id: req.body.user_id,
            //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]

            $and: [
                sequelize.where(sequelize.fn('month', sequelize.col("created_at")), month),
                sequelize.where(sequelize.fn('year', sequelize.col("created_at")), year)
              ], 
}
    }).then(sum => {
    console.log("The total water usage " + sum)
})
};

exports.findWaterUsageYear = (req, res) => {
    waterUsage.sum('water_used', {
        where: {
            user_id: req.body.user_id,
            //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]

            $and: [               
                sequelize.where(sequelize.fn('year', sequelize.col("created_at")), year)
              ], 
}
    }).then(sum => {
    console.log("The total water usage " + sum)
})
};

