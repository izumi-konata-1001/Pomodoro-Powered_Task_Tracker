const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.send('server connected');
})
const indexRouter = require('./routers/index');
app.use('/api', indexRouter);

async function startServer(){
try{
    const db = require('./db');
    await db.query('SELECT 1');

    console.log('Database connected successfully');

    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`);
    })
}
catch(error){
    console.error('Database connection failed: ', error.message);
    process.exit(1);
}
}

startServer();