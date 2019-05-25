var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var quizSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    // image: {
    //     data: Buffer, imageType: String, iName: String 
    // },
    image: {
        type: String,
        default: "https://digitaliz.in/wp-content/uploads/2019/05/js.png", 
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    score: Number,
    option1:{
        type: String,
        required: true
    },
    option2:{
        type: String,
        required: true
    },
     option3:{
        type: String,
        required: true
    },
    option4:{
        type: String,
        required: true
    },
    correct:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: User._id
    }
},{timestamps: true});

var Quiz = mongoose.model('Quiz', quizSchema)
module.exports = Quiz;
