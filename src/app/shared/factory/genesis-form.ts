import { FormControl, FormGroup } from '@angular/forms';

/**
 * Form builder with one static function to generate
 */
export class GenesisForm {

    static create(form: any): FormGroup {
        const formGroup = new FormGroup({});

        if (form.$$__genesis_controls) {
            form.$$__genesis_controls.forEach((value: FormControl, key: string) => {
                formGroup.registerControl(key, value);
            });
        }

        return formGroup;
    }
}
