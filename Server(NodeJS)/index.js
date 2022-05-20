require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./routers/index')
const errorHandler = require('./Middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path');
const {webSocket} = require('./webSocket')
var https = require( "https" );  
const fs = require("fs");


let options = {
  key: fs.readFileSync('./https/ELAPI.key').toString(),
  cert: fs.readFileSync('./https/ELAPI.crt').toString()
};

const {createClient} = require('webdav');
const {getFile} = require('./Utils/webdav')

let server;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.get('/static/:filename', getFile)

app.use(fileUpload({}))
app.use('/api',router)
app.use(errorHandler);
const start = async() =>
{
    try
    {
      server=   https.createServer(options, app).listen(PORT,
                () => console.log(`Server started on port ${PORT}(http://localhost:${PORT}, https://electra:${PORT})`))
                webSocket(server);     
    }
    catch(e)
    {
        console.log(e);
    }
}

start()