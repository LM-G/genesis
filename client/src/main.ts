import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

require('../src/styles/main.css');

if (process.env.ENV === 'production') {
    enableProdMode();
}

// Enables Hot Module Replacement.
declare let module: any;
if (module.hot) {
    module.hot.accept();
}

export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule);

}

// JIT compilation
if (document.readyState === 'complete') {
    main()
        .then((success: any) => console.log('App bootstrapped'))
        .catch((err: any) => console.error(err));
} else {
    document.addEventListener('DOMContentLoaded', main);
}
