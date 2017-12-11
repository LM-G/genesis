import { LocalStorageUtils } from '@genesis/util/local-storage-utils';

const KEY_TOKEN = 'access_token';

export class LocalStorage {
    static get token(): string {
        return LocalStorageUtils.get<string>(KEY_TOKEN);
    }

    static set token(value: string) {
        LocalStorageUtils.set(KEY_TOKEN, value);
    }
}
