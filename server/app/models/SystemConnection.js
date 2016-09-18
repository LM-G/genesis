var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * System
 * @type {Schema}
 */
var SystemConnection = new Schema({
  name: {
    type: String,
  },
  first_system : {
    type:  Schema.Types.ObjectId,
    ref : 'System'
  },
  second_system : {
    type:  Schema.Types.ObjectId,
    ref : 'System'
  },
  trade_routes : [{
    type:  Schema.Types.ObjectId,
    ref : 'TradeRoute'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});


module.exports = mongoose.model('SystemConnection', SystemConnection);