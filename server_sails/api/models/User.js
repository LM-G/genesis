/**
 * User.js
 *
 * @description :: User datas
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var path = require('path');
var _ = require('lodash');

module.exports = {

  tableName: "users",

  attributes: {
    account_name: {
      type: 'string',
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 32,
      alphanumericdashed: true
    },

    // encrypted password
    password: {
      type: 'string',
      required: true
    },

    first_name: {
      type: 'string',
      minLength: 3,
      maxLength: 128
    },

    last_name: {
      type: 'string',
      minLength: 3,
      maxLength: 128
    },

    age: {
      type: 'integer',
      min: 10,
      max: 115
    },

    email: {
      type: 'string',
      lowercase: true,
      unique: true,
      required: true,
      email: true
    },

    role: {
      type: 'string',
      enum: ['player', 'manager', 'admin'],
      default: 'player'
    },

    activated: {
      type: 'boolean',
      defaultsTo: false
    },

    deleted: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function () {
      return _.omit(this.toObject(), ['password', 'deleted']);
    },

    autoCreatedAt: true,
    autoUpdatedAt: true
  },
  beforeUpdate: function (user, next) {
    CipherService.hashPassword(user);
    next();
  },
  beforeCreate: function (user, next) {
    CipherService.hashPassword(user);
    next();
  }
};