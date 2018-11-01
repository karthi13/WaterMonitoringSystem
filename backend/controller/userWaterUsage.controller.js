'use strict';
const db = require('../config/db.config.js');

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
        })
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

exports.find_water_usage_specific_day = (req, res) => {
    var date = moment().date();
    waterUsage.sum('water_used', {
        where: {
            user_id: req.body.user_id,
            //[Op.between]: [{ created_at: req.body.date }, { created_at: req.body.date }]
            created_at: { [Op.between]: [date, date] }
        }

    }).then(sum => {
        console.log("The total water usage " + sum)
    })
};

exports.find_water_usage_specific_month = (req, res) => {
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

exports.find_water_usage_specific_year = (req, res) => {
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

