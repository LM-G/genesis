import { AbstractForm } from '../../../../shared/model/abstract-form';
import { Form } from '../../../decorator/form-decorator';
import { Control } from '../../../decorator/control-decorator';
import { Validators } from '@angular/forms';
import { EMAIL_REGEXP } from '../../../constant/static';
import { CustomValidators } from '../../../../shared/validator/custom-validator';

@Form()
export class SignUpForm extends AbstractForm{

    @Control('', Validators.required)
    name: string;

    @Control('', Validators.required)
    password: string;

    @Control('', [Validators.required, Validators.pattern(EMAIL_REGEXP)])
    email: string;

    @Control('', [Validators.required, CustomValidators.match('password')])
    confirmPassword: string;
}
