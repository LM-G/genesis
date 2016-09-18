var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * System
 * @type {Schema}
 */
var System = new Schema({
  name: {
    type: String,
    required: true,
    trim     : true
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
  planets : [{
    type:  Schema.Types.ObjectId,
    ref : 'Planet'
  }],
  asteroids : [{
    type:  Schema.Types.ObjectId,
    ref : 'Asteroid'
  }],
  structures : [{
    type:  Schema.Types.ObjectId,
    ref : 'Structure'
  }],
  connections: [{
    type: Schema.Types.ObjectId,
    ref: 'SystemConnection'
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

System.index({coord_x: 1, coord_y: 1}, {unique : true});


module.exports = mongoose.model('System', System);