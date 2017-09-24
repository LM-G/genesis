import { APP_INITIALIZER, ClassProvider, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { CoreService } from './core.service';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { HeaderComponent } from './component/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './component/authentication/auth-guard.service';
import { FooterComponent } from './component/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { APP_EFFECTS, APP_REDUCERS } from './store/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptor } from './interceptor/api.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';

/**
 * Resolves vital data from localstorage/server in order to initialize application correctly. When
 * all vital data will be fetch, angular will resume our app bootstrapping.
 */
const INITIALIZERS: Provider[] = [
    {
        provide: APP_INITIALIZER,
        useFactory(coreService: CoreService){
            return () => coreService.initialize();
        },
        deps: [CoreService],
        multi: true
    }
];

/**
 * Http interceptors
 */
const INTERCEPTORS: ClassProvider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: APIInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];

const REST_SERVICES = [
    AuthService,
    UserService
];

const CORE_COMPONENTS = [
    SideNavComponent,
    HeaderComponent,
    FooterComponent
];

/**
 * Genesis application core module.
 * All it's attached features are singletons which will be instantiated only once with app bootstrap
 */
@NgModule({
    imports: [
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        StoreModule.forRoot(APP_REDUCERS),
        EffectsModule.forRoot(APP_EFFECTS),
        SharedModule
    ],
    exports: [
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        StoreModule,
        EffectsModule,

        ...CORE_COMPONENTS
    ],
    declarations: [
        ...CORE_COMPONENTS
    ],
    providers: [
        CoreService,
        AuthGuard,
        ...REST_SERVICES,
        ...INITIALIZERS,
        ...INTERCEPTORS
    ]
})
export class CoreModule {
    /**
     * Constructor's module. Ensure the module is not already loaded before creating it
     * @param parentModule core module
     */
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
