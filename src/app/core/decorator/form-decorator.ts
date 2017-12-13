import { Constructor } from '@genesis/core/decorator/metadata/metadata';

export function Form<T extends Constructor>(target: T) {
    const wrapper = class extends target {
        constructor(...value) {
            super(...value);
            if (value[ 0 ]) {
                Object.assign(this, value[ 0 ]);
            }
        }
    };
    return Object.assign(wrapper, target);
}
