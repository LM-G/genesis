import { FormControl } from '@angular/forms';
import { FORM_CONTROLS_METADATA_KEY, getMetadata } from './metadata/metadata';

export function Control(...args) {
    return (target: any, key: string) => {
        const controls: Map<string, FormControl> = getMetadata(target, FORM_CONTROLS_METADATA_KEY, new Map());
        controls.set(key, new FormControl(...args));
    };
}
