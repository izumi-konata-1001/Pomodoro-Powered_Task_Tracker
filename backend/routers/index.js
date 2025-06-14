const express = require('express');
const router= express.Router();

router.get('/', (req,res) => {
    res.send('here is index router');
})

const userRouter = require('./userRouter');
router.use('/user', userRouter);

const taskRouter = require('./taskRouter');
router.use('/task', taskRouter);

module.exports = router;