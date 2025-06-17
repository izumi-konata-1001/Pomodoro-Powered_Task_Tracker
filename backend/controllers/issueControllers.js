const issueDao = require('../dao/issueDao');
const taskDao = require('../dao/taskDao');

async function getAllIssues(req,res){
    try{
        const issues = await issueDao.getAllIssues();
        if(!issues){
            return res.status(404).json({
                error:'issues not found'
            })
        }
        return res.status(200).json({
            message:'get all issues successfully',
            issues:issues,
        })
    }catch(error){
        console.error('get all issue error, error: ', error);
        return res.status(500).json({
            error:'Internal Server Error'
        })
    }
}
async function getIssuesByUserId(req,res){
    const userId = req.user.id;
    const order = req.body.order;
    try{
        if(order === "DESC"){
            const issues = await getIssuesByDESC(userId, order);
            if(issues.length === 0){
                return res.status(404).json({
                    error: 'no more issues'
                });
            }
            else{
                return res.status(200).json({
                    message:`get issues successfully, order: ${order}`,
                    issues:issues,
                });
            }
        }
        else if(order === "ASC"){
            const issues = await getIssusByASC(userId, order);
            if(issues.length === 0){
                return res.status(404).json({
                    error:'no more issues'
                });
            }
            else{
                return res.status(200).json({
                    message:`get issues successfully, order: ${order}`,
                    issues:issues,
                });
            }
        }
        else{
            return res.status(409).json({
                error:'wrong order'
            })
        }
    }catch(error){
        console.error('get issue error, error: ', error);
        return res.status(500).json({
            error:'Internal Server Error'
        })
    }
}

async function getIssusByASC(userId){
    return await issueDao.getAllIssuesByUserIdASC(userId);
}

async function getIssuesByDESC(userId){
    return await issueDao.getAllIssuesByUserIdDESC(userId);
}

async function getIssueByIssueId(req,res){
    const issueId = req.body.issueId;
    const userId = req.user.id;
    try{
        const issue = await issueDao.getIssueById(issueId);
        if(!issue){
            return res.status(404).json({
                error:'no such issue'
            })
        }else{
            const tasks = await taskDao.findTasksByUserIdAndIssueId(userId, issueId);
            console.log("tasks:", tasks);
            if(!tasks){
                return res.status(200).json({
                    message:'find issue',
                    issue:issue,
                    tasks:null,
                })
            }
            else{
                return res.status(200).json({
                    message:'find issue',
                    issue:issue,
                    tasks:tasks,
                })
            }
        }
    }catch(error){
        console.error('get issue by id failed error, error:', error);
        return res.status(500).json({
            error:'Intermal Server Error'
        })
    }
}

async function createIssue(req,res){
    const userId = req.user.id;
    const title = req.body.title;
    const description = req.body.description;
    try{
        const createIssueResult = await issueDao.insertIssue(userId, title,description);
        if(!createIssueResult){
            return res.status(409).json({
                error:'create issue error'
            });
        }
        else{
            return res.status(200).json({
                message:'create issue successfully'
            })
        }
    }catch(error){
        console.error('create issue failed error, error:', error);
        return res.statue(500).json({
            error:'Intermal Server Error'
        })
    }
}

async function addTasks(req, res){
    const taskList = req.body.tasks;
    const issueId = req.body.issueId;
    
    try{
        for(const task of taskList){
            const {taskId, step} = task;
            const result = await taskDao.insertIssue(taskId,issueId, step);
            if(!result){
                return res.status(409).json({
                    error: 'add task into issue error'
                });
            }
        }

        return res.status(200).json({
            message:'add task into issue successfully'
        });

    }catch(error){
        console.error('add tasks into issue failed error, error:', error);
        return res.status(500).json({
            error:'Intermal Server Error'
        })
    }
}

async function editIssue(req,res){
    const issueId = req.body.issueId;
    const description = req.body.description;
    const title = req.body.title;

    try{
        if(description){
            const result = await issueDao.changeDescription(issueId, description);
            if(!result){                
                return res.status(409).json({
                 error: 'edit description failed'});
            }
        }
        if(title){
            const result = await issueDao.changeTitle(issueId, title);
                if(!result)
                    return res.status(409).json({
                error: 'edit title failed'});
        }
        if (!description && !title) {
            return res.status(409).json({ 
                error: 'please enter description or title' 
            });
        }
        return res.status(200).json({
            message:'edit issue successfully'
        });
    }catch(error){
        console.error('edit issue failed error, error:', error);
        return res.status(500).json({
            error:'Intermal Server Error'
        })
    }
}


module.exports ={
    getAllIssues,
    getIssuesByUserId,
    getIssueByIssueId,
    createIssue,
    addTasks,
    editIssue,
}