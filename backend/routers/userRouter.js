const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('here is user router');
})

const userControllers = require('../controllers/userControllers');
const verifyMiddleware = require('../middleware/verifyTokenMiddleware');
router.use('/all_users', userControllers.getAllUsers);
router.post('/create', userControllers.createUser);
router.post('/login', userControllers.loginUser);
router.post('/change_password', verifyMiddleware.verifyTokenInHeaders, userControllers.changePassword);
router.get('/me', verifyMiddleware.verifyTokenInHeaders,userControllers.getCurrentUser)
module.exports = router;