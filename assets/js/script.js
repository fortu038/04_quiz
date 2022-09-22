var start_button = document.querySelector("#start");

var current_score = 0;
var seconds_remaining = 120;
var high_scores = [];

function init() {
    var scores = JSON.parse(localStorage.getItem("high_scores"));

    if(scores === null) {
        high_scores = [];
    } else {
        high_scores = scores;
    }
}

function end_game() {

}

function show_question() {
    // Figure which item to get from the array whenever this function is called (use a global?)
    var curr_question_obj = questions[i];
    var section = document.createElement("section");
    // create an h2 tag, give it the text of the question
    // create a ul/ol tag
    // for each answers, create an li tag

    // add all this stuff to the DOM
}

// When the user clicks start, the follow needs to happen
    // 1) Timer starts
    // 2) Display a question 

/*
// Answer button click outline
var buttons = document.querySelectorAll("button");
var coorectButton = document.getElementById("button_name");

correctButton.setAttribute("data-correct", "yes");

for(var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
        var isCorrect = event.target.getAttribute("data-correct");
        if(isCorrect === "yes") {
            alert("Correct answer")
        }
    });
}
*/

var questions_array = [
    {
        question: "How many fingers do humans have?",
        answers: [
            [1,false],
            [2,false],
            [3,false],
            [10,true]
        ],
    },

    {
        question: "What is the northern-most state in the US?",
        answers: [
            ["Hawaii",false],
            ["Nevada",false],
            ["Maryland",false],
            ["Alaska",true]
        ],
    }
]

for(var i = 0; i < questions_array.length; i++) {
    var curr_question_obj = questions_array[i];
    var section = document.createElement("section");
    // create an h2 tag, give it the text of the question
    // create a ul/ol tag
    // for each answers, create an li tag

    // add all this stuff to the DOM
}

// Event listener for clicking the start button
start_button.addEventListener("click", function() {
    console.log("clicked start");
});

// Event listener for choosing an answer