import 'reflect-metadata';
import { createApp } from './core';
import { connectDatabase } from '../config/mongoose';
import { config } from '../config/environment';
import { LOGGER } from '../config/logger';
import {useContainer} from 'class-validator';

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

    app.listen(PORT, () => LOGGER.info(`Listening on' ${PORT}`));
});


