const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')
const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware');
router.get('/', (req,res) => {
    res.send('here is tasks');
})

router.use('/user_tasks', verifyTokenMiddleware.verifyTokenInBody,taskController.getTasksByUserId);
router.use('create', verifyTokenMiddleware.verifyTokenInBody,taskController.createTask);
router.use('/edit',verifyTokenMiddleware.verifyTokenInBody,taskController.editTask);
router.use('/delete', verifyTokenMiddleware.verifyTokenInBody,taskController.deleteTask);


module.exports = router;