import { FormControl, FormGroup } from '@angular/forms';

export function Form(...args): Function {
    return (constructor: any) => {
        Object.defineProperty(constructor, 'create', {
            writable: false,
            enumerable: true,
            configurable: true,
            value: () => {
                const formGroup = new FormGroup({});

                if(constructor.controls){
                    constructor.controls.forEach((value: FormControl, key: string) => {
                        formGroup.registerControl(key, value);
                    });
                }

                return formGroup;
            }
        });
    };
}

