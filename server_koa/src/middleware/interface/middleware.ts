import { Context } from 'koa';

export interface GenesisMiddleware {
    execute(ctx: Context, next: () => Promise<any>): void;
}