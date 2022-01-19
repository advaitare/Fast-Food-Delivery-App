const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
let salt='gygyuguyguygyugyuf67rt76r67r7'
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    hashed_password: {
      type: String,
      required: true
    },
   
    
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    },

   
  },
  { timestamps: true }
);

userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
   
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};

module.exports = mongoose.model('User', userSchema);
