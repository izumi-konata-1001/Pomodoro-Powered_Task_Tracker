const express = require('express');
const router = express.Router();

const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware');
const issueControllers = require('../controllers/issueControllers');
router.get('/', (req,res) => {
    res.send('here is issues');
})

router.use('/all', issueControllers.getAllIssues)
router.post('/user_issues',verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.getIssuesByUserId);
router.post('/create',verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.createIssue);
router.post('/edit',verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.editIssue);
router.post('/add_task',verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.addTasks);
router.post('/detail', verifyTokenMiddleware.verifyTokenInHeaders, issueControllers.getIssueByIssueId);

module.exports = router;