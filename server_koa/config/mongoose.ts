import * as mongoose from 'mongoose';
import { LOGGER } from './logger';
const chalk = require('chalk');


const NODE_ENV = process.env.NODE_ENV || 'dev';

// Default promise behavior because mpromise deprecated
// see http://mongoosejs.com/docs/promises.html
(<any>mongoose).Promise = global.Promise;
/*
mongoose.set('debug', (collectionName: string, method: string, query: any, doc: any) => {
    console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
});
*/
// If node process is killed then we close the database connection
process
    .on('SIGINT', gracefulExit)
    .on('SIGTERM', gracefulExit);

/**
 * Shutdown the database connection if application is shutdown
 */
async function gracefulExit() {
    await mongoose.connection.close();
    LOGGER.info('Mongoose connection has disconnected through app termination');
    process.exit(0);
}

/**
 * Connection to database
 */
export async function connectDatabase(uri: string) {
    try{
        await mongoose.connect(uri, { useMongoClient: true });
        LOGGER.info(`${chalk.gray('Successfully connected to')} ${NODE_ENV} ${chalk.gray('database on startup')}`);
    } catch (err){
        LOGGER.error(`Failed to connect to ${NODE_ENV} database on startup`, err);
        process.exit(0);
    }
}

