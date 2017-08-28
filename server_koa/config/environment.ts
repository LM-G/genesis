interface Config{
    restApiRoot: string;
    host: string;
    port: number;
    db: {
        name: string;
        uri: string;
    }
}


export const config: Config = {
    restApiRoot: '/api',
    host: 'localhost',
    port: 3000,
    db: {
        name: 'genesis-dev-koa',
        uri: 'mongodb://localhost/genesis-dev-koa'
    }
};