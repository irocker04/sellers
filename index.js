require('dotenv').config({path: __dirname +'/.env'});
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const path = require('path');
// const models = require('./models/models');
const router = require('./routes/index.js');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware.js');

const PORT = process.env.API_PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start().then(() => {});
