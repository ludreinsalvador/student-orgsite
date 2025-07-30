module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define('organization', {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      aka: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  
    return Organization;
};