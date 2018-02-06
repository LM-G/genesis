import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Sign up success component
 */
@Component({
  selector: 'app-sign-up-success',
  templateUrl: './sign-up-success.component.html',
  styleUrls: [ './sign-up-success.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpSuccessComponent {
  constructor() {
  }
}
