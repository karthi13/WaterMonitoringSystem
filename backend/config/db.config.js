const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.address = require('../model/address.model.js')(sequelize, Sequelize);

db.user = require('../model/user.model')(sequelize, Sequelize);
db.localityAddress = require('../model/localityAddress.model')(sequelize, Sequelize);
db.locality = require('../model/locality.model')(sequelize, Sequelize);
db.municipality = require('../model/municipality.model')(sequelize, Sequelize);

db.address.belongsTo(db.customers, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
db.customers.hasOne(db.address, {foreignKey: 'fk_customerid', targetKey: 'uuid'});

db.locality.belongsTo(db.municipality);
db.municipality.hasMany(db.locality);

db.localityAddress.belongsTo(db.locality);
db.locality.hasMany(db.localityAddress);

db.localityAddress.belongsTo(db.user);
db.user.hasOne(db.localityAddress);

db.user.belongsTo(db.locality);
db.locality.hasMany(db.user);

module.exports = db;