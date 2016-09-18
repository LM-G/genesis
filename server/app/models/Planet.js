var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Planet
 * @type {Schema}
 */
var Planet = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type:  Schema.Types.ObjectId,
    ref : 'User'
  },
  system : {
    type:  Schema.Types.ObjectId,
    ref : 'System'
  },
  coord_x : {
    type : Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  coord_y : {
    type : Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  type: {
    type : String,
    enum: ['terrestrial', 'gas'],
    default: 'gas'
  },
  slots : {
    type : Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    required: true,
    default: 0
  },
  structures : [{
    type:  Schema.Types.ObjectId,
    ref : 'Structure'
  }],
  resource_deposits : [{
    type:  Schema.Types.ObjectId,
    ref : 'ResourceDeposit'
  }],
  resource_storages : [{
    type:  Schema.Types.ObjectId,
    ref : 'ResourceStorage'
  }],
  moons : [{
    type:  Schema.Types.ObjectId,
    ref : 'Moon'
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


module.exports = mongoose.model('Planet', Planet);