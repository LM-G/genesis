import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { APP_INITIALIZER, ClassProvider, FactoryProvider, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthService } from '@genesis/$core/api/auth/auth.service';
import { UserService } from '@genesis/$core/api/user/user.service';
import { coreInitializerFactory, CoreService } from '@genesis/$core/core.service';
import { AuthGuard } from '@genesis/$core/guard/auth.guard';
import { NotLoggedOnlyGuard } from '@genesis/$core/guard/not-logged-only.guard';
import { APIInterceptor, AuthInterceptor } from '@genesis/$core/interceptor';
import { httpProxy } from '@genesis/$core/proxy/http-proxy';
import { AppStore } from '@genesis/$core/store/app-store';
import { SharedModule } from '@genesis/$shared/shared.module';
import { FooterComponent } from '@genesis/footer/footer.component';
import { StompRService } from '@stomp/ng2-stompjs';
import { SimpleNotificationsModule } from 'angular2-notifications';

/**
 * Resolves vital data from localstorage/server in order to initialize application correctly. When
 * all vital data will be fetch, angular will resume our app bootstrapping.
 */
const GENESIS_APP_INITIALIZERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: coreInitializerFactory,
    deps: [ CoreService ],
    multi: true
  }
];

/**
 * Http interceptors
 */
const GENESIS_HTTP_INTERCEPTORS: ClassProvider[] = [
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

const GENESIS_HTTP_SERVICES = [
  AuthService,
  UserService
];

const GENESIS_CORE_COMPONENTS = [
  FooterComponent
];

const GENESIS_PROXIES: FactoryProvider[] = [
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

    ...GENESIS_CORE_COMPONENTS
  ],
  declarations: [
    ...GENESIS_CORE_COMPONENTS
  ],
  providers: [
    CoreService,
    AuthGuard,
    NotLoggedOnlyGuard,
    StompRService,
    AppStore,
    ...GENESIS_HTTP_SERVICES,
    ...GENESIS_HTTP_INTERCEPTORS,
    ...GENESIS_APP_INITIALIZERS,
    ...GENESIS_PROXIES
  ]
})
export class CoreModule {
  /**
   * Ensure the module is not already loaded before creating it
   * @param parentModule core module
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
