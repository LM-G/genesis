import { FORM_IGNORED_PROPERTIES_METADATA_KEY, getMetadata } from './metadata/metadata';

export const JsonIgnore = (target: any, key: string) => {
  getMetadata(target, FORM_IGNORED_PROPERTIES_METADATA_KEY, []).push(key);
};
