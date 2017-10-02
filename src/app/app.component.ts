import { Component } from '@angular/core';
import { NOTIFICATION_CONFIG } from './config/notification';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    notificationOpts = NOTIFICATION_CONFIG;
    hide = true;
    constructor () {
        console.debug('# App component started');
    }
}
