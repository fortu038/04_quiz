var high_scores_button = document.querySelector("#high_scores_button");
var score_button_text = document.querySelector("#score_button_text");

var timer = document.querySelector("#timer");

var start = document.querySelector("#start");

var question_and_answers = document.querySelector("#question_and_answers");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");

var high_scores_list = document.querySelector("#high_scores_list");
var high_scores_body = document.querySelector("#high_scores_body");

var score_form = document.querySelector("#score_form");
var comment = document.querySelector("#comment");
var submit_button = document.querySelector("#submit_button");
var score_count = document.querySelector("#score_count");


// The high_scores array is intended to be an array of arrays. Elements in the [x][0] indexes
// will be the nicknames while elements in the [x][1] indexes will be the scores associated
// with those nicknames
var high_scores = [];

// For a score sorting system, if I can implement one later
// var top_score = 0;
// var low_score = 0;

var current_score = 0;
var end_game = false;


// Helper function that removes all the elements of an HTML list
function remove_list_nodes(list_element) {
    if(list_element) {
        while(list_element.firstChild) {
            list_element.removeChild(list_element.firstChild);
        }
    }
}

// Helper function that tracks the time left to take the quiz
var seconds_left = 60;
function set_time() {
    var timer_interval = setInterval(function () {
        seconds_left--;
        timer.textContent = seconds_left;
        console.log(seconds_left);
        
        if(seconds_left <= 0 || end_game == true) {
            console.log("in zero");
            clearInterval(timer_interval);
            seconds_left = 60;
            timer.textContent = seconds_left;
            show_submit_form();
        }
    }, 1000);
}

// Initializer. Pulls high_score from local storage if it exists, substatuting and empty array
// if it does not
function init() {
    var scores = JSON.parse(localStorage.getItem("high_scores"));

    if(scores === null) {
        high_scores = [];
    } else {
        high_scores = scores;
    }
}

// Bug Note: Toggling on the high score board while a quiz is running will cause the clock
// to freak out, gumming up the whole works. This function was made to help fix this
// this, but does work as intended at the moment
function reset() {
    seconds_left = 60;
    timer.textContent = seconds_left;
    current_score = 0;
}

// Helper function that saves the the high_scores array to local storage as high_scores
function save_high_scores() {
    localStorage.setItem("high_scores", JSON.stringify(high_scores));
}

// Helper function that builds the quiz questions. Reuses the same h2 and ol elements for
// all questions
// Bug: Questions always double their number of alerts compared to the last one, example:
// question 1 has 1 alert, question 2 has 2, question 3 has 4, etc.
function build_question(q_num) {
    remove_list_nodes(answers);
    var curr_question_obj = questions_array[q_num];
    question.innerHTML = curr_question_obj.q;
    var len_as = curr_question_obj.as.length;
    for(var i = 0; i < len_as; i++) {
        var li_tag = document.createElement("li");
        li_tag.setAttribute("id", curr_question_obj.as[i][1]);
        
        li_tag.appendChild(document.createTextNode(curr_question_obj.as[i][0]));
 
        answers.appendChild(li_tag);
    }

    var ans_buttons = document.querySelectorAll("#answers")
    // console.log(ans_buttons);

    for(var i = 0; i < ans_buttons.length; i++) {
        ans_buttons[i].addEventListener("click", function(event) {
            var isCorrect = event.target.getAttribute("id");
            if(isCorrect == "true") {
                current_score = current_score + 10;
                alert("Correct!");
                if(q_num < questions_array.length - 1) {
                    build_question(q_num+1);
                } else {
                    end_game = true;
                }
                return;
            } else {
                seconds_left = seconds_left - 5;
                alert("Wrong :(");
                if(q_num < questions_array.length - 1) {
                    build_question(q_num+1);
                } else {
                    end_game = true;
                }
                return;
            }
        });
    }
}

// Helper function that builds the high scores table. Reuses the same ol element for all builds.
function build_high_scores() {
    for(var i = 0; i < high_scores.length; i++) {
        var li_tag = document.createElement("li");
        
        li_tag.appendChild(document.createTextNode(high_scores[i][0]));
        li_tag.innerHTML += " : " + high_scores[i][1];

        high_scores_body.appendChild(li_tag);
    }
}

// An array of objects that acts as a question list for the quiz
// Each object has the exact same structure, with the q key's values being the question being 
// asked and the a key's value being an array of arrays that stores both answers and the
// respectitve answer's correctness.
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
            ["Hawaii", false],
            ["Minnesota", false],
            ["Guam", false],
            ["Alaska", true]
        ],
    },

    {
        q: "What is the capital of Brazil?",
        as: [
            ["Rio de Janeiro", false],
            ["Sao Paulo", false],
            ["Brasilia", true],
            ["Pao de Acucar", false]
        ]
    }
]

// Helepr function that changes the score_form's display to flex and
// question_and_answers's display to none. Also updates score_count
// textContent to current_score
function show_submit_form() {
    question_and_answers.style.display = "none";
    score_form.style.display = "flex";
    score_count.textContent = current_score;
}

// Event listener for clicking the submit button.
submit_button.addEventListener("click", function(event) {
    event.preventDefault();
    high_scores.push([comment.value.trim(), current_score]);
    save_high_scores();
    score_form.style.display = "none";
    start.style.display = "flex";
});

// Event listener for clicking the start button.
start.addEventListener("click", function() {
    start.style.display = "none";
    high_scores_list.style.display = "none";
    question_and_answers.style.display = "flex";
    set_time();
    build_question(0);
    // end_game = true;
});

var mode = "off"; // Set default to off, meaning that view of high scores is not acitve
// Event listener for clicking the view high scores button
high_scores_button.addEventListener("click", function () {
    if(mode === "off") {
        mode = "on";
        
        question_and_answers.style.display = "none";
        start.style.display = "none";
        high_scores_list.style.display = "flex";

        // Bug Note: Toggling on the high score board while a quiz is running will cause the clock
        // to freak out, gumming up the whole works. The reset() function was made to help fix this
        // this, but does work as intended at the moment
        reset();

        remove_list_nodes(high_scores_body);
        
        build_high_scores();
        
        score_button_text.textContent = "Hide High Scores";
    } else{
        mode = "off";
        
        question_and_answers.style.display = "none";
        start.style.display = "flex";
        high_scores_list.style.display = "none";
        
        score_button_text.textContent = "View High Scores";
    }
});

init();