const express = require('express');
const router = express.Router();

const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware');
const issueControllers = require('../controllers/issueControllers');
router.get('/', (req,res) => {
    res.send('here is issues');
})

router.use('/all', issueControllers.getAllIssues)
router.use('/user_issues',verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.getIssuesByUserId);
router.use('/create',verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.createIssue);
router.use('/edit',verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.editIssue);
router.use('/add_task',verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.addTasks);

module.exports = router;