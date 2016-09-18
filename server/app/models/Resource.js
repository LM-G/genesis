var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * resource model
 * @type {Schema}
 */
var Resource = new Schema({
  name : {
    type:  String,
    required : true
  },
  type : {
    type: String,
    enum: ['primary', 'secondary', 'tertiary'],
    default: 'secondary'
  },
  rarity : {
    type : Number,
    min : 0,
    max : 1,
    required : true,
    default : 0
  },
  description : {
    type : String
  },
  base_price : {
    type : Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  current_price : {
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