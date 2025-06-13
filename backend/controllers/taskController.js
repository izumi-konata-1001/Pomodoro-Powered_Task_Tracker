const taskDao = require('../dao/taskDao')

async function getTasksByUserId(req,res){
    const userId = req.user.id;
    const order = req.body.order;
    try{
        if(order == 'DESC'){
            const tasks = getTasksByDESC(userId);
            res.status(200).json({
                message:`get tasks successfully, order: ${order}`,
                tasks: tasks,
            })
        }
        else if(order == 'ASC'){
            const tasks = getTasksByASC(userId);
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

async function createTask(req, res){
    const userId = req.user.id;
    const description = req.body.description;
    const title = req.body.title;
    const completed = req.body.completed;
    try{
        const createTask = await taskDao.insertTask(userId, title, description, completed);
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
            if(!isEmpty(description))
            {
                const result = taskDao.changeDescription(id, description);
                if(!result)
                    return res.status(409).json({
                error: 'edit description failed'});
            }
            if(!isEmpty(title))
            {
                const result = taskDao.changeTitle(id,description);
                if(!result)
                    return res.status(409).json({
                error: 'edit title failed'});
            }
            if(!isEmpty(completed)){
                const result = taskDao.changeCompleted(id, description);
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

function isEmpty(content){
    if (!content || content.trim() === '')
        return false;
    return true;
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

module.exports = {
    getTasksByUserId,
    createTask,
    editTask,
    deleteTask,
}