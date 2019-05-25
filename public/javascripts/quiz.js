// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const shareButton = document.querySelectorAll('.share');

let questions = [];
var reqURL = window.location.href;
// shareButton[0].baseURI = reqURL;
// var shareButton = document.querySelectorAll('.share')[0].baseURI;
// shareButton = reqURL;
var splittedArr = reqURL.split("/");
var category = splittedArr[4];

// fetch
fetch(`http://localhost:3000/api/v1/quiz/${category}`).then(res => res.json().then(data => pushD(data)))

function pushD(data) {
    questions = data;
    //pass control to other function
    quesControl(questions);
    
}

// question data control centre
function quesControl(questions){
    console.log(questions);
    // passing question data to show to the user
    mainQues(questions); 
}

function mainQues(questions){
    console.log(questions,"....mainques")
    let newQuestions = questions.categorySortedData;
    const lastQuestion = newQuestions.length - 1;
    // console.log(lastQuestion)
    let runningQuestion = 0;
    let count = 0;
    const questionTime = 10; // 10s
    const gaugeWidth = 150; // 150px
    const gaugeUnit = gaugeWidth / questionTime;
    let TIMER;
    let score = 0;

// render a question
    function renderQuestion(newQuestions){
        console.log(newQuestions, "....newquestions")
        console.log(runningQuestion, " is running question number")
        let q = newQuestions[runningQuestion];
        console.log(q);
        
        question.innerHTML = "<p>"+ q.title +"</p>";
        description.innerHTML = "<p>"+ q.description +"</p>";
        qImg.innerHTML = "<img src="+ q.image +">";
        choiceA.innerHTML = q.option1;
        choiceB.innerHTML = q.option2;
        choiceC.innerHTML = q.option3;
        choiceD.innerHTML = q.option4;
    }

    start.addEventListener("click",startQuiz);

    // start quiz
    function startQuiz(){
        start.style.display = "none";
        renderQuestion(newQuestions);
        quiz.style.display = "block";
        renderProgress();
        renderCounter();
        TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
    }

    // render progress
    function renderProgress(){
        for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
            progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
        }
    }

    // counter render

    function renderCounter(){
        if(count <= questionTime){
            counter.innerHTML = count;
            timeGauge.style.width = count * gaugeUnit + "px";
            count++
        }else{
            count = 0;
            // change progress color to red
            answerIsWrong();
            if(runningQuestion < lastQuestion){
                runningQuestion++;
                renderQuestion(newQuestions);
            }else{
                // end the quiz and show the score
                clearInterval(TIMER);
                scoreRender();
            }
        }
    }

    // checkAnswer
    this.checkAnswer = function checkAnswer(answer){
        console.log(answer, "this is answer coming onClick")
        if (answer === newQuestions[runningQuestion].correct){
            // answer is correct
            score++;
            console.log('answer is correct')
            answerIsCorrect();
        }
        else{
            // answer is wrong
            // change progress color to red
            answerIsWrong();
        }
        count = 0;
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            console.log(newQuestions, "this is in checkANS")
            renderQuestion(newQuestions);
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender(); 
        }
}

// answer is correct
function answerIsCorrect(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    var y = document.getElementById("wsnackbar");
    y.className = "show";
    setTimeout(function(){ y.className = y.className.replace("show", ""); }, 1000);
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
}
