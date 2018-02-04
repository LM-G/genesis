import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader, hmrModule } from '@angularclass/hmr';

import { AppModule } from '@genesis/app.module';
import { environment } from 'environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(ngModuleRef => {
      if (environment.hmr) {
        if (module[ 'hot' ]) {
          return hmrModule(ngModuleRef, module);
        }
        console.error('HMR not enabled, did you forget -hmr flag for ng serve?');
      }
    })
    .catch(err => console.log(err));
}

bootloader(main);
