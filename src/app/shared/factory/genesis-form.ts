import {FormControl, FormGroup} from '@angular/forms';
import {FORM_CONTROLS_METADATA_KEY, GENESIS_METADATA_KEY} from '@genesis/core/decorator/metadata/metadata';
import {get} from 'lodash';

/**
 * Form builder with one static function to generate
 */
export class GenesisForm {

  static create(form: any): FormGroup {
    const formGroup = new FormGroup({});

    const controls = get(form.prototype, GENESIS_METADATA_KEY + '.' + FORM_CONTROLS_METADATA_KEY);

    if (controls) {
      controls.forEach((value: FormControl, key: string) => {
        formGroup.registerControl(key, value);
      });
    }

    return formGroup;
  }
}
