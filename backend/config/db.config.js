const path = require('path');
const Sequelize = require('sequelize');

var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, 'config.json'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  //port:config.port,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user.model')(sequelize, Sequelize);
db.localityAddress = require('../model/localityAddress.model')(sequelize, Sequelize);
db.locality = require('../model/locality.model')(sequelize, Sequelize);
db.municipality = require('../model/municipality.model')(sequelize, Sequelize);
db.waterUsage = require('../model/userWaterConsumption.model')(sequelize, Sequelize);
// db.address.belongsTo(db.customers, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
// db.customers.hasOne(db.address, {foreignKey: 'fk_customerid', targetKey: 'uuid'});

db.locality.belongsTo(db.municipality);
db.municipality.hasMany(db.locality);

db.localityAddress.belongsTo(db.locality);
db.locality.hasMany(db.localityAddress);

db.localityAddress.belongsTo(db.user);
db.user.hasOne(db.localityAddress);

db.user.belongsTo(db.locality);
db.locality.hasMany(db.user);

db.waterUsage.belongsTo(db.user);
db.user.hasMany(db.waterUsage);

module.exports = db;

