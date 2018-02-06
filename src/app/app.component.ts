import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NOTIFICATION_CONFIG } from './$core/config/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  notificationOpts = NOTIFICATION_CONFIG;

  constructor() {
    console.log('# App component started');
  }
}
