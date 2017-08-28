import 'reflect-metadata';
import { createApp } from './core';
import { connectDatabase } from '../config/mongoose';
import { config } from '../config/environment';
import { LOGGER } from '../config/logger';
const chalk = require('chalk');

const CONTROLLER_DIR = __dirname + '/controller';
const MIDDLEWARE_DIR = __dirname + '/middleware';
const MODEL_DIR = __dirname + '/model';
const PORT = 3000;

connectDatabase(config.db.uri).then(() => {
    const app = createApp({
        apiPath: '/api',
        controllers : CONTROLLER_DIR,
        middlewares : MIDDLEWARE_DIR,
        models: MODEL_DIR
    });

    app.listen(PORT, () => LOGGER.info(`${chalk.gray('Listening on')} ${PORT}`));
});


