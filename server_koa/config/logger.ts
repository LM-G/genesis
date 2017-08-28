import * as winston from 'winston';
import { isEmpty } from 'lodash';
import moment = require('moment');

export const LOGGER = new (winston.Logger)({
    level: 'info',
    transports: [
        new (winston.transports.Console)({
            timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss'),
            formatter: (opts) => {
                let msg = `${opts.timestamp()} ${opts.level.toUpperCase()}`;
                if(opts.message){
                    msg += ` ${opts.message}`
                }
                if(opts.meta && !isEmpty(opts.meta)){
                    msg += `\n${JSON.stringify(opts.meta, null, 2)}`
                }
                return msg;
            }
        })
    ]
});