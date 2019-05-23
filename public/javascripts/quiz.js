// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const shareButton = document.querySelectorAll('.share');
let questions = [];
var reqURL = window.location.href;
// shareButton[0].baseURI = reqURL;
var shareButton = document.querySelectorAll('.share')[0].baseURI;
shareButton = reqURL;
var splittedArr = reqURL.split("/");
var category = splittedArr[4];
// var category = "new"

// fetching all quiz based on the category
const fetchAPI = async (cb)=>{
    fetch(`http://localhost:3000/api/v1/quiz/${category}`).then(res => res.json()).then(data => {
        cb(data)
    })
} 


fetchAPI((data) => {
    console.log(data);
    // console.log(data.quiz[0], "data.....")
    questions = data;
});

console.log(questions, "........questions")