import { Validators } from '@angular/forms';
import { Control } from '@genesis/core/decorator/control-decorator';


export class SignInForm {
    @Control('', Validators.required)
    login: string;

    @Control('', Validators.required)
    password: string;
}
