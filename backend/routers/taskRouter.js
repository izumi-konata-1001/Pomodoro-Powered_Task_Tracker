const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/taskController')
const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware');
router.get('/', (req,res) => {
    res.send('here is tasks');
})

router.use('/user_tasks', verifyTokenMiddleware.verifyTokenInHeaders,taskControllers.getTasksByUserId);
router.post('/create', verifyTokenMiddleware.verifyTokenInHeaders,taskControllers.createTask);
router.post('/edit',verifyTokenMiddleware.verifyTokenInHeaders,taskControllers.editTask);
router.post('/delete', verifyTokenMiddleware.verifyTokenInHeaders,taskControllers.deleteTask);


module.exports = router;