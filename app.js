const express = require('express');
var cors = require('cors')
const DB = require('./DB/runDB');
const { userRouter, productRouter } = require('./allRouter/allrouter');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.port;
app.use(express.json());
app.use('/uploadImges',express.static(path.join(__dirname,'uploadImges')))

app.use(cors())
app.use(userRouter,productRouter)

DB()

app.listen(port,()=>{console.log(`run...on port ${port}`);});