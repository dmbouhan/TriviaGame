quizQuestions = [
    {
        question: "Approximately How many domestic cats are in the world?",
        choices: ["Too Many", "500 million", "Not Enough", "70 Million"],
        correctAnswer: "500 million"
    },

    {
        question: "What is the correct name for the squishy bits on little cat feet?",
        choices: ["Soft Toes", "Toe Beans", "Refried Beans", "Paw Pads"],
        correctAnswer: "Toe Beans"
    },

    {
        question: "What is the scientific name of the domestic cat?",
        choices: ["Cattus dominus", "Housus cattis", "Katniss everdeen", "Felis catus"],
        correctAnswer: "Felis catus"
    },

    {
        question: "Are cats better than dogs?",
        choices: ["Yes", "Yes", "Yes"],
        correctAnswer: "Yes"
    },

    {
        question: "How much of a cat's day is spent grooming?",
        choices: ["All of it", "10 percent", "30 percent", "More time than I spend"],
        correctAnswer: "30 percent"
    },

    {
        question: "Cats are liquid",
        choices: ["True", "False"],
        correctAnswer: "True"  
    },
];

winImg = [
    "assets/images/giphy (1).gif",
    "assets/images/giphy (2).gif",
    "assets/images/giphy (5).gif"
];

lossImg = [
    "assets/images/giphy (3).gif",
    "assets/images/giphy (4).gif",
    "assets/images/giphy (6).gif"
];

var counter = 30;
var currentQuestion = 0;
var score = 0;
var loss = 0;
var timer;


function nextQuestion() {
    var moreQuestions = (quizQuestions.length - 1) === currentQuestion;
    if (moreQuestions) {
        var result =`
        <p>You got ${loss} question(s) wrong!</p>
        <p>You got ${score} question(s) right!</p>
        <p>Total Questions: ${quizQuestions.length}</p>
        <img src="assets/images/giphy (7).gif">
        <br>
        <p>Thank you for subcribing to cat facts.</P>
        <button id="resetBtn">Reset Game</button>
        `;

        $("#questions").html(result);
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

function countDown() {
    counter--;
    $("#timer").html("Time Remaining: " + counter);
    if (counter === 0) {
        clearInterval(timer);
        loss++;
        showAnswer("loss");
        setTimeout(nextQuestion, 3 * 1000);
    }
}

function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    question = quizQuestions[currentQuestion].question;
    choices = quizQuestions[currentQuestion].choices;

    $("#timer").html("Time Remaining: " + counter);
    $("#questions").html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    ${remaingingQuestion()}
    `);
}

function loadChoices(choices) {
    var result = "";

    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

$(document).on("click", ".choice", function () {
    clearInterval(timer);
    var selectedAnswer = $(this).attr("data-answer");
    correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        showAnswer("win");
        setTimeout(nextQuestion, 3 * 1000);

    } else {
        loss++;
        showAnswer("loss");
        setTimeout(nextQuestion, 3 * 1000);
    }
})


$(document).on("click", "#resetBtn", function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    loss = 0;
    timer = null;

    loadQuestion();
})

function remaingingQuestion() {
    var questionsLeft = quizQuestions.length - (currentQuestion + 1);

    return `Questions Remaining: ${questionsLeft}`;
}

function randomImage(images) {
    var random = Math.floor(Math.random() * images.length);
    var randomImage = images[random];
    return randomImage;
}

function showAnswer(status) {
    correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === "win") {
        $("#questions").html(`
         <p class="preload-image">You got it right!</p>
         <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
         <img src="${randomImage(winImg)}"/>
         `);
    } else {
        $("#questions").html(`
        <p class="preload-image">Wah Wah. You got it wrong.</p>
        <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
        <img src="${randomImage(lossImg)}"/>
        `);
    }
}

$("#start").click(function () {
    $("#start").remove();
    $("#timer").html(counter);
    loadQuestion();
});
