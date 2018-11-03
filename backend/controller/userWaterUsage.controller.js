'use strict';
const db = require('../config/db.config.js');
var Sequelize = require('sequelize');
var moment = require('moment');


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
                [Op.gt]: new Date().setHours(1, 0, 0, 0),
                [Op.lt]: new Date().setHours(24, 59, 59, 0)
              }
        }
        // where: sequelize.where(sequelize.fn('char_length', sequelize.col('status')), 6)
    }).then(sum => {
        console.log("The total water usage " + sum);


        let data = {
            sum,
            water_exceeded: (sum - 100) > 0 ? (sum - 100) : 0,
            water_remaining: (100 - sum) > 0 ? (100 - sum) : 0
        }


        res.json({
            message: "Total water usage today",
            success: true,
            data
        });
    })
};

exports.findWaterUsageMonth = (req, res) => {
    moment().format();
    var month = moment().month() + 1;
    var year = moment().year();
    WaterUsage.sum('water_used', {
        where: {
            user_id: req.query.user_id,
            //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]

            [Op.and]: [
                Sequelize.where(Sequelize.fn('month', Sequelize.col("created_at")), month),
                Sequelize.where(Sequelize.fn('year', Sequelize.col("created_at")), year)
            ],
        }
    }).then(sum => {
        console.log("The total water usage " + sum);

        res.json({
            message: "Total water usage this month",
            success: true,
            data: sum
        });
    })
};

exports.findWaterUsageYear = (req, res) => {
    moment().format();
    var year = moment().year();

    WaterUsage.sum('water_used', {
        where: {
            user_id: req.query.user_id,
            //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]

            [Op.and]: [
                Sequelize.where(Sequelize.fn('year', Sequelize.col("created_at")), year)
            ],
        }
    }).then(sum => {
        console.log("The total water usage " + sum);

        res.json({
            message: "Total water usage this year",
            success: true,
            data: sum
        });
    })
};


exports.findWaterUsagePerHour = (req, res) => {
    var date = new Date();
    //console.log(date);
    var usage_by_hour = WaterUsage.findAll({
        where: {
            user_id: req.query.user_id,
            created_at: {

                [Op.gt]: new Date().setHours(1, 0, 0, 0),
                [Op.lt]: new Date().setHours(24, 59, 59, 0)
            }
        },
        attributes: [
            [Sequelize.fn('hour', Sequelize.col('created_at')), 'hour'],
            // [Sequelize.fn('sum', 'water_used'), 'water_used'],
            [Sequelize.literal('SUM(water_used)'), 'water_used']
        ],
        group: 'hour'

    }).then(usage_by_hour => {

        res.json({
            message: "Water usage per hour",
            success: true,
            data: usage_by_hour
        });
    })
};


