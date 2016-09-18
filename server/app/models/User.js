var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

/**
 * Utilisateur
 * @type {Schema}
 */
var User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'manager', 'admin'],
    default: 'client'
  },
  // ToDo : activation du profil
  actif: {
    type: Boolean,
    default: true
  },
  planets: [{
    type:  Schema.Types.ObjectId,
    ref : 'Planet'
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

/**
 * Attributs virtuels
 */
User
  .virtual('userId')
  .get(function() {
    return this.id;
  });

/**
 * Avant de sauver un utilisateur, son password est hashé
 */
User.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

module.exports = mongoose.model('User', User);