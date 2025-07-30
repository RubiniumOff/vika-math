const mongoose = require('mongoose');

const connect_db = async () => {
    const { DB_CONN, DB_USER, DB_PASS, NODE_ENV } = process.env;
    if (!DB_CONN || !DB_USER || (NODE_ENV === 'production' && !DB_PASS)) {
        throw new Error(`Проверьте конфигурацию в .env. NODE_ENV=${NODE_ENV}`);
    }

    try {
        await mongoose.connect(DB_CONN, {
            user: DB_USER,
            pass: DB_PASS
        });
        return true;
    } catch (error) {
        if (error.message.includes('Authentication failed')) {
            throw new Error('Неправильные данные для подключения к MongoDB');
        }
        throw new Error(`Ошибка подключения к MongoDB: ${error.message}`);
    }
};

module.exports = connect_db;