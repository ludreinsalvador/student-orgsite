const db = require('../models');
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {

  try {
    const { idNumber, password, firstName, lastName, emailAddress, course } = req.body;

    const existingStudent = await Student.findOne({ where: { idNumber } });
    const existingEmail = await Student.findOne({ where: { emailAddress } });

    if (existingStudent) {
      return res.status(400).send('ID Number is already registered.');
    }

    if (existingEmail) {
      return res.status(400).send('Email is already registered.');
    }

    const newStudent = await Student.create({
      idNumber,
      password,
      firstName,
      lastName,
      emailAddress,
      course,
    });

    console.log('New student registered:', newStudent);
    res.status(201).redirect('/students'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'); 
  }
};

exports.login = async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const student = await Student.findOne({
      where: { emailAddress, password }
    });

    if (student) {
      console.log('Login successful:', { emailAddress, password });
      res.status(200).send('Login successful');
    } else {
      console.log('Login failed: Invalid credentials');
      res.status(401).send('Login failed: Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
  
exports.findAll = async (req, res) => {
      const lastName = req.query.lastName;
      const condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;
    
      try {
        const students = await Student.findAll({ where: condition });
        res.render('students', { students });
      } catch (error) {
        res.status(500).send({
          message: error.message || 'Some error occurred while retrieving students'
        });
      }
    };

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Student.findByPk(id);
    if (student) {
      res.send(student);
    } else {
      res.status(404).send({ message: `Cannot find Student with id=${id}` });
    }
  } catch (error) {
    res.status(500).send({ message: `Error retrieving Student with id=${id}` });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [numRecords] = await Student.update(req.body, { where: { id: id } });
    if (numRecords === 1) {
      res.send({
        message: 'Student updated successfully!',
      });
    } else {
      res.send({
        message: `Cannot update Student with id=${id}`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Student with id=${id}`,
    });
  }
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Student.destroy({
      where: { id: id }
    })
      .then((numRecords) => {
        if (numRecords == 1) {
          res.send({
            message: 'Student was deleted successfully!'
          })
        } else {
          res.send({
            message: `Cannot delete Student with id=${id}`
          })
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Could not delete Student with id=${id}`
        })
      })
}

exports.deleteAll = (req, res) => {
    Student.destroy({
      where: {},
      truncate: false
    })
      .then((numRecords) => {
        res.send({
          message: `${numRecords} Student(s) were deleted successfully!`
        })
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occured while removing all students.'
        });
      });
}