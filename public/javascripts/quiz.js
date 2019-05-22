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


const apiUrl = 'http://localhost:3000/api/v1/quiz';

const fetchAPI =(cb)=>{
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        cb(data)
    })
} 