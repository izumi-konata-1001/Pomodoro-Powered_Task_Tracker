const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

router.get('/', (req, res) =>{
    res.send('Here is user');
})

router.use('/all_users', userControllers.getAllUsers);
router.use('/create_user', userControllers.createUser);
router.use('/login_user', userControllers.authLogin);
module.exports = router;