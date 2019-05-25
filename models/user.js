var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
	// _id: new mongoose.Types.ObjectId(),
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
	},
	score: Number,
},{timestamps: true});

userSchema.pre('save', function(next) {
	var user = this;
	if(!user.isModified('password')) return next();

	//generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if(err) return next(err);

		//hash the password along with new SAlt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);

			//override the clearText password with the hashed one
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err, false);
		cb(null, isMatch);
	});
}



var User = mongoose.model('User', userSchema)
module.exports = User;