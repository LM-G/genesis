import {Context} from 'koa';

export function Securizer() {
    return async (ctx: Context, next: () => Promise<any>) => {
        console.log('Securizer called');
    }
}