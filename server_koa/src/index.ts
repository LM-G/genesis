import {App} from './app';

// define src path as global
global.__srcDir = __dirname;

// starts the app
let app = new App();
app.start();