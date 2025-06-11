const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

router.get('/', (req, res) =>{
    res.send('Here is user');
})

router.use('/all_users', userControllers.getAllUsers);
router.use('/create_user', userControllers.createUser);
module.exports = router;