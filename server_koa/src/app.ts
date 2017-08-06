import 'reflect-metadata';
import { createApp } from './core';

const CONTROLLER_DIR = __dirname + '/controller';
const PORT = 3000;

const app = createApp({
    routePrefix: '/api',
    controllers : CONTROLLER_DIR
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
