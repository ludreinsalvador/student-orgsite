const db = require('../models');
const Organization = db.organizations;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const organization = {
    name: req.body.name,
    aka: req.body.aka,
    description: req.body.description
  };

  Organization.create(organization)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred"
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Organization.findAll({ where: condition })
    .then((organizations) => {
      res.render('organizations', { organizations: organizations });
  })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving organizations'
      });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Organization.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Organization with id=${id}.`
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error retrieving Organization with id=${id}`
        });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Organization.update(req.body, { where: { id: id } })
      .then((numRecords) => {
        if (numRecords == 1) {
          res.send({
            message: 'Organization updated successfully!'
          });
        } else {
          res.send({
            message: `Cannot update Organization with id=${id}`
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error updating Organization with id=${id}`
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Organization.destroy({
      where: { id: id }
    })
      .then((numRecords) => {
        if (numRecords == 1) {
          res.send({
            message: 'Organization was deleted successfully!'
          });
        } else {
          res.send({
            message: `Cannot delete Organization with id=${id}`
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Could not delete Organization with id=${id}`
        });
      });
};

exports.deleteAll = (req, res) => {
    Organization.destroy({
      where: {},
      truncate: false
    })
      .then((numRecords) => {
        res.send({
          message: `${numRecords} Organization(s) were deleted successfully!`
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while removing all organizations.'
        });
      });
};