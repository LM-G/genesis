var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Flux and stock of a resource being exploited by a user
 * @type {Schema}
 */
var ResourceStorage = new Schema({
  resource : {
    type:  Schema.Types.ObjectId,
    ref : 'Resource'
  },
  flux : {
    type : Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  max_flux_variation : {
    type : Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  stock : {
    type : Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
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


module.exports = mongoose.model('ResourceStorage', ResourceStorage);