export interface IAuthLevel {
    code: string,
    value: number
}

export interface IAuthLevelConfig {
    VISITOR: IAuthLevel;
    CLIENT: IAuthLevel;
    ADMIN: IAuthLevel;
}

export const AuthLevel: IAuthLevelConfig = Object.freeze({
    VISITOR: {value: 0, code: 'visitor'},
    CLIENT: {value: 1, code:'client'},
    ADMIN: {value: 2, code:'admin'}
});