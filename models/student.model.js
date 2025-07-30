module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define('student', {
      idNumber: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isInt: true
        }
      },
      password: {
        type: Sequelize.STRING,
      },

      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      emailAddress: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      course: {
        type: Sequelize.STRING,
      }
    }, 
    {
      tableName: 'students',
    });
  
    return Student;
};