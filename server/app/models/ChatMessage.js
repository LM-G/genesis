var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Chat Message
 * @type {Schema}
 */
var ChatMessage = new Schema({
  content: {
    type: String
  },
  user: {
    type:  Schema.Types.ObjectId,
    ref : 'User'
  },
  room: {
    type: String,
    required: true
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


module.exports = mongoose.model('ChatMessage', ChatMessage);