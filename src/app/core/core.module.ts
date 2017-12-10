import { APP_INITIALIZER, ClassProvider, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { CoreService } from './core.service';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { FooterComponent } from './component/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptor } from './interceptor/api.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthService } from './api/auth/auth.service';
import { UserService } from './api/user/user.service';
import { SimpleNotificationsModule } from 'angular2-notifications';

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
    FooterComponent
];

/**
 * Genesis application core module.
 * All it's attached feature are singletons which will be instantiated only once with app bootstrap
 */
@NgModule({
    imports: [
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        SimpleNotificationsModule.forRoot(),

        SharedModule
    ],
    exports: [
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        SimpleNotificationsModule,

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
