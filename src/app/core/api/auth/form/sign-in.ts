import { Validators } from '@angular/forms';
import { Control } from '@genesis/core/decorator/control-decorator';
import { Form } from '@genesis/core/decorator/form-decorator';
import { GenesisForm } from '@genesis/shared/model/genesis-form';

@Form
export class SignInForm extends GenesisForm {
    @Control('', Validators.required)
    login: string;

    @Control('', Validators.required)
    password: string;
}
