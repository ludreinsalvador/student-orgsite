var express = require('express');
var router = express.Router();
var organizations = require('../controllers/organization.controller.js');

router.post('/', organizations.create);
router.get('/', organizations.findAll);
router.get('/:id', organizations.findOne); 
router.put('/:id', organizations.update);  
router.delete('/:id', organizations.delete);  
router.delete('/', organizations.deleteAll);  

module.exports = router;