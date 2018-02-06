import { Type } from '@angular/core';

export const GENESIS_METADATA_KEY = '$$_genesis_metadata';
export const FORM_CONTROLS_METADATA_KEY = 'controls';
export const FORM_IGNORED_PROPERTIES_METADATA_KEY = 'ignored';

export function getMetadata<T>(target: Type<T>, key: string, initValue: T): T {

  if (!(GENESIS_METADATA_KEY in target)) {
    Object.defineProperty(target, GENESIS_METADATA_KEY, {
      writable: false,
      enumerable: false,
      configurable: true,
      value: {}
    });
  }

  const metadataAnchor = target[ GENESIS_METADATA_KEY ];

  if (!(key in metadataAnchor)) {
    Object.defineProperty(metadataAnchor, key, {
      writable: false,
      enumerable: false,
      configurable: true,
      value: initValue
    });
  }

  return metadataAnchor[ key ];
}
