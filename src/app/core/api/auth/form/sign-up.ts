import {Validators} from '@angular/forms';
import {JsonIgnore} from '@genesis/core/decorator';
import {Control} from '@genesis/core/decorator/control-decorator';
import {EMAIL_REGEXP} from '@genesis/shared/constant/static';
import {GenesisValidators} from '@genesis/shared/validator/genesis-validator';

export class SignUpForm {

    @Control('', Validators.required)
    name: string;

    @Control('', Validators.required)
    password: string;

    @Control('', [Validators.required, Validators.pattern(EMAIL_REGEXP)])
    email: string;

    @JsonIgnore
    @Control('', [Validators.required, GenesisValidators.match('password')])
    confirmPassword: string;
}
