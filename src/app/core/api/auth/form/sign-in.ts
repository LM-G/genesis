import { Form } from '../../../decorator/form-decorator';
import { Control } from '../../../decorator/control-decorator';
import { Validators } from '@angular/forms';
import { AbstractForm } from '../../../../shared/model/abstract-form';

@Form()
export class SignInForm extends AbstractForm{
    @Control('', Validators.required)
    login: string;

    @Control('', Validators.required)
    password: string;
}
