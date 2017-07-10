/**
 * Connections
 * (sails.config.connections)
 *
 */
module.exports.connections = {
  genesisMongoDb: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    database: 'genesis-dev-v2'
  }
};