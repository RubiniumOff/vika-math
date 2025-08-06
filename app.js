const path = require('path');
const dotenvx = require('@dotenvx/dotenvx');
const express = require('express');
const { engine } = require('express-handlebars');
const cors = require('cors');

const logger = require('./utils/logger');
const connect_db = require('./db/db');
const mainRouter = require('./router/mainRouter');
const apiRouter = require('./router/apiRouter');

const ENV = process.env.NODE_ENV || 'development';
dotenvx.config({ path: path.resolve(__dirname, `.envx.${ENV}`) });

const PORT = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (ENV === 'development') {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    }
    next();
});

app.use('/', mainRouter);
app.use('/api/v1/', apiRouter);

const start = async () => {
    console.clear();

    try {
        await connect_db();
        logger.success('База данных успешно подключена', 'index.js');

        app.listen(PORT, () => {
            logger.success('Сервер запущен и использует порт *:' + PORT, 'index.js')
        });
    } catch (error) {
        logger.error(error);
    }
}

start();