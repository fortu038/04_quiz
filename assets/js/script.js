var current_score = 0;
var seconds_remaining = 120;

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

var questions = [
    {
        question: "How many fingers do humans have?",
        answers: [
            1,
            2,
            3,
            10
        ],
        correct_answer: 10
    },

    {
        question: "What is the northern-most state in the US?",
        answers: [
            "Hawaii",
            "Nevada",
            "Maryland",
            "Alaska"
        ],
        correct_answer: "Alaska"
    }
]

for(var i = 0; i < questions.length; i++) {
    var curr_question_obj = questions[i];
    var section = document.createElement("section");
    // create an h2 tag, give it the text of the question
    // create a ul/ol tag
    // for each answers, create an li tag

    // add all this stuff to the DOM
}

// Event Listeners
    // One for clicking the start button
    // One for choosing an answer