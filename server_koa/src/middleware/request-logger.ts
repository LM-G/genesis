import { LOGGER } from '../../config/logger';
import { Context } from 'koa';

const Counter = require('passthrough-counter');
const humanize = require('humanize-number');
const bytes = require('bytes');
const chalk = require('chalk');

/**
 * Color map.
 */
const colorCodes = {
    7: 'magenta',
    5: 'red',
    4: 'yellow',
    3: 'cyan',
    2: 'green',
    1: 'green',
    0: 'yellow'
};

export function RequestLogger (){
    return async function execute(ctx: Context, next: () => Promise<any>) {
        // request
        const start = Date.now();
        LOGGER.info(`${chalk.gray('<--')} ${chalk.bold(ctx.method)} ${chalk.gray(ctx.originalUrl)}`);

        try {
            await next()
        } catch (err) {
            // log uncaught downstream errors
            log(ctx, start, null, err, null);
            throw err
        }

        // calculate the length of a streaming response
        // by intercepting the stream with a counter.
        // only necessary if a content-length header is currently not set.
        const length = ctx.response.length;
        const body = ctx.body;
        let counter: any;
        if (length == null && body && body.readable) {
            ctx.body = body
                .pipe(counter = Counter())
                .on('error', ctx.onerror)
        }

        // log when the response is finished or closed,
        // whichever happens first.
        const res = ctx.res;

        const onFinish = done.bind(null, 'finish');
        const onClose = done.bind(null, 'close');

        res.once('finish', onFinish);
        res.once('close', onClose);

        function done (event: any) {
            res.removeListener('finish', onFinish);
            res.removeListener('close', onClose);
            log(ctx, start, counter ? counter.length : length, null, event);
        }
    }
}

/**
 * Log helper.
 */
function log (ctx: Context, start: number, len: number, err: any, event: any) {
    // get the status code of the response
    const status = err ? (err.status || 500) : (ctx.status || 404);

    // set the color of the status code;
    const s = status / 100 | 0;
    const color = colorCodes.hasOwnProperty(s) ? (<any>colorCodes)[s] : 0;

    // get the human readable response length
    let length: string;
    if (~[204, 205, 304].indexOf(status)) {
        length = '';
    } else if (len == null) {
        length = '-';
    } else {
        length = bytes(len).toLowerCase();
    }

    const upstream = err ? chalk.red('xxx') : event === 'close' ? chalk.yellow('-x-') : chalk.gray('-->');

    LOGGER.info('  ' + upstream +
        ' ' + chalk.bold('%s') +
        ' ' + chalk.gray('%s') +
        ' ' + chalk[color]('%s') +
        ' ' + chalk.gray('%s') +
        ' ' + chalk.gray('%s'),
        ctx.method,
        ctx.originalUrl,
        status,
        time(start),
        length);
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */
function time (start: number) {
    const delta = Date.now() - start;
    return humanize(delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's');
}
