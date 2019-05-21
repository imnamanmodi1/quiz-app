var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tags: [String],
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
    }
})

var Quiz = mongoose.model('Quiz', quizSchema)
module.exports = Quiz;