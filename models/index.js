const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/school.db'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require('./student.model.js')(sequelize, Sequelize);
db.organizations = require('./organization.model.js')(sequelize, Sequelize);

module.exports = db;