const express = require('express');
const router = express.Router();
const userRouters = require('./userRouters');

router.get('/',(req, res) =>{
    res.send('Here is api');
})

router.use('/user', userRouters);

const taskRouters = require('./taskRouters');
router.use('/task', taskRouters);

module.exports = router;