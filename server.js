const express = require('express');
const FileRouter = require('./Router/fileRouter');
const UserRouter = require('./Router/userRouter');
const Database = require('./Database/MongoDB');
const Logger = require('./Custom_Middleware/logger')

const app = express();
app.use(express.json());
app.use(Logger); //custome middleware
app.use('/api/file', FileRouter);
app.use('/api/user', UserRouter);
require('dotenv').config();

Database().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server Started on Port: ${process.env.PORT}`);
    });
})
    .catch((error) => {
        console.error(error.message)
    })


