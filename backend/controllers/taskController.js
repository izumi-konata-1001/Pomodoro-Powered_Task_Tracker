const taskDao = require('../dao/taskDao')

async function getTasksByUserId(req,res){
    const userId = req.user.id;
    const order = req.body.order;
    try{
        if(order == 'DESC'){
            const tasks =await getTasksByDESC(userId);
            if(tasks.length === 0){
                return res.status(404).json({ error: 'no tasks found' });
            }
            res.status(200).json({
                message:`get tasks successfully, order: ${order}`,
                tasks: tasks,
            })
        }
        else if(order == 'ASC'){
            const tasks =await getTasksByASC(userId);
            if(tasks.length == 0)
            {
                return res.status(404).json({ error: 'no tasks found' });
            }
            res.status(200).json({
                message:`get tasks successfully, order: ${order}`,
                tasks: tasks,
            })
        }
        else{
            return res.status(409).json({
                error:'wrong order'
            })
        }
    }catch(error){
        console.error('get tasks error:', error);
        return res.status(500).json({
            error: 'Internal server error'
        })
    }
}

async function getTasksByDESC(userId){
    return await taskDao.findTasksByUserIdDESC(userId);
}

async function getTasksByASC(userId){
    return await taskDao.findTasksByUserIdASC(userId);
}

async function getTaskById(req,res){
    const taskId = req.body.taskId;
    try{
        const task = await taskDao.findTaskById(taskId);
        if(!task){
            return res.status(404).json({
                error:'task no found'
            });
        }
        console.log("task:", task);
        return res.status(200).json({
            message:'find task successfully',
            task:task,
        });
    }catch(error){
        console.error('get task by id failed, error:',error);
        res.status(500).json({
            error:'Internal Server error'   
        })
    }
}

async function createTask(req, res){
    const userId = req.user.id;
    const description = req.body.description;
    const title = req.body.title;
    const completed = req.body.completed;
    const issueId = null;
    const step = null;
    try{
        const createTask = await taskDao.insertTask(userId, issueId, step, title, description, completed);
        if(!createTask){
            return res.status(409).json({
                error:'create task error'
            });
        }
        return res.status(200).json({
            message:'task create successfully'
        })

    }catch(error){
        console.error('create task error:', error);
        return res.status(500).json({
            error:'Internal server error'
        });
    }
}

async function editTask(req,res){
    const id = req.body.id;
    const description = req.body.description;
    const title = req.body.title;
    const completed = req.body.completed;
    
    try{
        if(!isExsit(id)){
            return res.status(404).json({
                error:'task no found'
            })
        }
        else{
            if(description !== undefined)
            {
                const result =await taskDao.changeDescription(id, description);
                if(!result)
                    return res.status(409).json({
                error: 'edit description failed'});
            }
            if(title !== undefined)
            {
                const result =await taskDao.changeTitle(id,title);
                if(!result)
                    return res.status(409).json({
                error: 'edit title failed'});
            }
            if(completed != undefined){
                const result =await taskDao.changeCompleted(id, completed);
                if(!result)
                    return res.status(409).json({
                error: 'edit completed failed'});
            }
            return res.status(200).json({
                message:'task edit successfully'
            });
        }
    }catch(error){
        console.error('edit task error: ', error);
        return res.status(500).json({
            error:'Internal server error'
        });
    }
}

async function deleteTask(req,res){
    const {id} = req.body;
    try{
        if(!isExsit(id)){
            return res.status(404).json({
                error:'task no found'
            });
        }
        const result = await taskDao.deleteTask(id);
        if(!result){
            return res.status(409).json({
                error:'delete task error failed'
            })
        }
        return res.status(200).json({
            message:'delete task successfully'
        });
    }catch(error){
        console.error('delete task error: ', error);
        res.status(500).json({
            error:'Internal server error'
        });
    }
}

async function isExsit(id){
    return await taskDao.isExsit(id);
}

async function editComplete(req,res){
    const taskId = req.body.issueId;

    try{
        const result = await taskDao.changeCompleted(taskId);
        if(!result){
            res.status(409).json({
                error:'edit complete failed'
            });
        }
        res.status(200).json({
            message:'edit complete successfully '
        })
    }catch(error){
        console.error('edit complete error, error:', error);
        res.status(500).json({
            error:'Internal server error'
        });
    }
}

async function removeFromIssueEditOtherStep(req, res){
    const taskId = req.body.taskId;
    const issueId = req.body.issueId;
    const userId = req.user.id;
    const tasks = await getTasksByIssueId(userId,issueId);
    const tasks_num = tasks.length;
    const removeTask = await taskDao.findTaskById(taskId);
    const removeStep = removeTask.step_number;
    let counter = removeStep;
    try{
        const result = await taskDao.deleteTaskFromIssue(taskId);
        if(!result){
            return res.status(409).json({
                error:'failed to delete task from issue'
            });
        }
        for(let i = 0; i < tasks_num; i++){
            if(tasks[i].step_number > removeStep){
                const result = await taskDao.changeStepNumber(tasks[i].id,counter);
                if(!result){
                    console.error('change step failed, no task step number change');
                    return res.status(500).json({
                        error:'change step error'
                    })
                }
                else{
                counter ++;
                }
            }
        }
        return res.status(200).json({
            message:'delete task from issue successfully'
        })
    }catch(error){
        console.error('delete task from issue error:', error);
        return res.status(500).json({
            error:'failed to remove task from issue'
        })
    }
}

async function getTasksByIssueId(userId, issueId){
    try{
        const tasks = await taskDao.findTasksByUserIdAndIssueId(userId, issueId);
        return tasks;
    }catch(error){
        console.error('get task by issue id failed, error:', error);
    }
}

module.exports = {
    getTasksByUserId,
    createTask,
    editTask,
    deleteTask,
    editComplete,
    getTaskById,
    removeFromIssueEditOtherStep,
}