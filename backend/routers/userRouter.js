const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('here is user router');
})

const userControllers = require('../controllers/userControllers');
const verifyMiddleware = require('../middleware/verifyTokenMiddleware');
router.use('/all_users', userControllers.getAllUsers);
router.use('/create', userControllers.createUser);
router.use('/login', userControllers.loginUser);
router.use('/change_password', verifyMiddleware.verifyTokenInBody, userControllers.changePassword);

module.exports = router;