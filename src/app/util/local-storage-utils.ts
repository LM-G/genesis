export class LocalStorageUtils {
    static get<T>(key: string): T {
        const item = localStorage.getItem(key);
        return JSON.parse(item) as T;
    }

    static set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}
