var high_scores_button = document.querySelector("#high_scores_button");

var timer = document.querySelector("#timer");

var start = document.querySelector("#start");

var question_and_answers = document.querySelector("#question_and_answers");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");

var high_scores_list = document.querySelector("#high_scores_list");


var current_score = 0;
var seconds_remaining = 60;

var high_scores = []; // <- Have this be an array of arrays that stores nicknames and scores as pairs
var top_score = 0;
var low_score = 0;


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

// function show_question() {
//     // Figure which item to get from the array whenever this function is called (use a global?)
//     var curr_question_obj = questions[i];
//     var section = document.createElement("section");
//     // create an h2 tag, give it the text of the question
//     // create a ul/ol tag
//     // for each answers, create an li tag

//     // add all this stuff to the DOM
// }

function build_question(q_num) {
    var curr_question_obj = questions_array[q_num];
    question.innerHTML = curr_question_obj.q;
    var len_as = curr_question_obj.as.length;
    for(var i = 0; i < len_as; i++) {
        var li_tag = document.createElement("li");
        li_tag.setAttribute("id", curr_question_obj.as[i][1]);
        
        li_tag.appendChild(document.createTextNode(curr_question_obj.as[i][0]));
 
        answers.appendChild(li_tag);
    }

    var answers_array = document.querySelectorAll("#answers");

    console.log(answers);
    console.log(answers_array);

    var ans_buttons = document.querySelectorAll("#answers")

    for(var i = 0; i < ans_buttons.length; i++) {
        ans_buttons[i].addEventListener("click", function(event) {
            var isCorrect = event.target.getAttribute("id");
            if(isCorrect == "true") {
                alert("Correct!");
            } else {
                alert("Wrong");
            }
        });
    }
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
        q: "How many fingers do humans have?",
        as: [
            [1, false],
            [10, true],
            [2, false],
            [3, false]
        ],
    },

    {
        q: "What is the northern-most state in the US?",
        as: [
            ["Hawaii",false],
            ["Minnesota",false],
            ["Guam",false],
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
start.addEventListener("click", function() {
    // console.log("clicked start");
    start.style.display = "none";
    question_and_answers.style.display = "flex";
    // console.log(questions_array[0].q);
    build_question(0);
});

// Event listener for choosing an answer