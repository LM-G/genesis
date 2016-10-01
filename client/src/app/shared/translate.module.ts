import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/lang', '.json'),
            deps: [ Http ]
        })
    ],
    exports: [ BrowserModule, HttpModule, TranslateModule ],
})
export class SharedTranslateModule {
    constructor(translate: TranslateService) {
        // get the current UserLang
        let userLang = translate.getBrowserLang();
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('fr');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}
