import 'reflect-metadata';
import {App} from './app';
import {InjectorContainer} from './core/injector/injector-container';

// define src path as global
global.__srcDir = __dirname;

// init dependecy injection system
InjectorContainer.init();

// starts the app
let app = new App();
app.start();