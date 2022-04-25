require('dotenv').config();
const express = require('express')
const sequilize = require("./db")
const cors = require('cors')
const router = require('./routers/index')
const errorHandler = require('./Middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path');
const models =  require('./models/models')
require('./webSocket.js');

const PORT = process.env.PORT || 5000;
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api',router)
app.use(errorHandler);

const start = async() =>
{
    try
    {
        await sequilize.authenticate();
        await sequilize.sync();
        app.listen(PORT,
            () => console.log(`Server started on port ${PORT}(http://localhost:${PORT})`));
         
    }
    catch(e)
    {
        console.log(e);
    }
}

start()