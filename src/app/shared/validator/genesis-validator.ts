import { ValidatorFn } from '@angular/forms';
import { matchValidator } from './match.validator';

export class GenesisValidators {
    /**
     * Validator that requires controls to have a value greater than a number.
     */
    static match(match: string): ValidatorFn {
        return matchValidator(match);
    }
}
