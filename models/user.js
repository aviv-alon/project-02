const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  fullName: { type: String },
  password: { type: String, required: true }
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// PRE-VALIDATE LIFECYCLE HOOK - runs before validation
userSchema.pre('validate', function checkPasswordsMatch(next) {
  // if the password is modified and the password and passwordConfirmation
  // do not match, invalidate the passwordConfirmation field
  // this will prevent the user record from being saved
  // and throw an error at the VALIDATION stage
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }

  // move on to the next step which is the VALIDATION stage
  next();
});

// PRE-SAVE LIFECYCLE HOOK - runs before record is saved to the database
userSchema.pre('save', function hashPassword(next) {
  // if the user's password is modified, hash the password using bcrypt
  // and 8 rounds of salt and set to the password field
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  // move on to the next step which is the SAVE stage
  next();
});

// custom method to validate a password against a user's hashed password
userSchema.methods.validatePassword = function validatePassword(password) {
  // `password` is the plain text password
  // `this.password` is the hashed password stored on the user record
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
