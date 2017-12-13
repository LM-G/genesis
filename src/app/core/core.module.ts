import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { APP_INITIALIZER, ClassProvider, FactoryProvider, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthService } from '@genesis/core/api/auth/auth.service';
import { UserService } from '@genesis/core/api/user/user.service';
import { FooterComponent } from '@genesis/core/component/footer/footer.component';
import { CoreService } from '@genesis/core/core.service';
import { AuthGuard } from '@genesis/core/guard/auth.guard';
import { APIInterceptor, AuthInterceptor } from '@genesis/core/interceptor';
import { httpProxy } from '@genesis/core/proxy/http-proxy';
import { SharedModule } from '@genesis/shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

/**
 * Resolves vital data from localstorage/server in order to initialize application correctly. When
 * all vital data will be fetch, angular will resume our app bootstrapping.
 */
const INITIALIZERS: Provider[] = [
    {
        provide: APP_INITIALIZER,
        useFactory(coreService: CoreService) {
            return () => coreService.initialize();
        },
        deps: [ CoreService ],
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

const PROXIES: FactoryProvider[] = [
    {
        provide: HttpClient,
        useFactory: httpProxy,
        deps: [ HttpXhrBackend, HTTP_INTERCEPTORS ]
    }
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
        ...INTERCEPTORS,
        ...INITIALIZERS,
        ...PROXIES
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
