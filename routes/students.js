var express = require('express');
var router = express.Router();
var students = require('../controllers/student.controller.js');
const db = require('../models');
const Student = db.students; 


router.post('/', students.create);
router.get('/', students.findAll);
router.get('/:id', students.findOne);
router.put('/:id', students.update);
router.delete('/:id', students.delete);
router.delete('/', students.deleteAll);


router.get('/login', (req, res) => {
    res.render('login', { error: req.flash('error') });
});

router.post('/login', async (req, res) => {
    try {
        const { emailAddress, password } = req.body;

        const student = await Student.findOne({
            where: { emailAddress, password }
        });

        if (student) {
            console.log('Login successful:', student);
            res.status(200).send('Login successful.');
        } else {
            console.log('Login failed: Invalid credentials');
            res.status(401).send('Login failed: Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;