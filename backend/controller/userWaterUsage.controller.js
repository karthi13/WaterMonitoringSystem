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

exports.findWaterUsageToday = (req, res) => {
    var date = new Date();
    console.log(date); 

    WaterUsage.findAll({
        where: {
            user_id: req.query.user_id,
            created_at: {
                [Op.gt]: new Date().setHours(1, 0, 0, 0),
                [Op.lt]: new Date().setHours(24, 59, 59, 0)
            }
        },
        attributes: [
            [Sequelize.fn('hour', Sequelize.col('created_at')), 'hour'],
            [Sequelize.literal('SUM(water_used)'), 'water_used']
        ],
        group: 'hour'

    }).then(usage_by_hour => {


        let sum = usage_by_hour.map( el => el.water_used ).reduce(( accumulator, currentValue)=>{
            return accumulator + currentValue;
        })

        let data = {
            sum,
            water_exceeded: (sum - 100) > 0 ? (sum - 100) : 0,
            water_remaining: (100 - sum) > 0 ? (100 - sum) : 0,
            usage_by_hour
       }

        res.json({
            message : "Succesfull data acquired",
            data            
        });
    })


};

exports.findWaterUsageMonth = (req, res) => {
    moment().format();

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 0,24,59,59);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0,24,59,59);

    // var month = moment().month() + 1;
    // var year = moment().year();
    // WaterUsage.sum('water_used', {
    WaterUsage.findAll({
        where: {
            user_id: req.query.user_id,
            //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]
            created_at: {
                [Op.gt]: firstDay,
                [Op.lt]: lastDay
            }
        },
        attributes: [
            [Sequelize.fn('DATE', Sequelize.col('created_at')), 'DATE'],
            [Sequelize.literal('SUM(water_used)'), 'water_used'],
            [Sequelize.fn('DAY', Sequelize.col('created_at')), 'DAY'],
        ],
        group: ['DATE', 'DAY' ]
    }).then(val => {
        console.log("The total water usage " + val);

        let totalWaterExceeded = 0;
        let totalWaterUnUsed = 0;

        let monthData = val.map( el => el.water_used ).reduce(( accumulator, currentValue)=>{
            console.log("toatal water un used = ", totalWaterUnUsed);
            ((100 - currentValue) > 0 ) ? totalWaterUnUsed +=  (100 - currentValue) : totalWaterExceeded =+ ((-1) * (100 - currentValue));
            return accumulator + currentValue;
        })

        let data = {
            monthData,
            water_exceeded: totalWaterExceeded,
            water_remaining: totalWaterUnUsed,
            usage_by_date : val
       }

        res.json({
            message: "Total water usage this month",
            success: true,
            data
        });
    })
};

exports.findWaterUsageYear = (req, res) => {
    moment().format();
    // var year = moment().year();

    // WaterUsage.sum('water_used', {
    //     where: {
    //         user_id: req.query.user_id,
    //         //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]

    //         [Op.and]: [
    //             Sequelize.where(Sequelize.fn('year', Sequelize.col("created_at")), year)
    //         ],

    //     }
    // }).then(sum => {
    //     console.log("The total water usage " + sum);

    //     res.json({
    //         message: "Total water usage this year",
    //         success: true,
    //         data: sum
    //     });
    // })

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), 0, 0,24,59,59);
    var lastDay = new Date(date.getFullYear()+1, 0, 0,24,59,59);

    // var month = moment().month() + 1;
    // var year = moment().year();
    // WaterUsage.sum('water_used', {
    WaterUsage.findAll({
        where: {
            user_id: req.query.user_id,
            //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]
            created_at: {
                [Op.gt]: firstDay,
                [Op.lt]: lastDay
            }
        },
        attributes: [
            [Sequelize.fn('MONTH', Sequelize.col('created_at')), 'MONTH'],
            [Sequelize.literal('SUM(water_used)'), 'water_used']
        ],
        group: 'MONTH'
    }).then(val => {
        console.log("The total water usage " + val);

        let totalWaterExceeded = 0;
        let totalWaterUnUsed = 0;
        // let 

        let monthData = val.map( el => el.water_used ).reduce(( accumulator, currentValue)=>{
            console.log("toatal water un used = ", totalWaterUnUsed);
            ((100 - currentValue) > 0 ) ? totalWaterUnUsed +=  (100 - currentValue) : totalWaterExceeded =+ ((-1) * (100 - currentValue));
            return accumulator + currentValue;
        })

        let data = {
            monthData,
            water_exceeded: totalWaterExceeded,
            water_remaining: totalWaterUnUsed,
            usage_by_date : val
       }

        res.json({
            message: "Total water usage this month",
            success: true,
            data
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


