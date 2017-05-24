//Establish Variables
var questions = [
	{question	: "Which of these is not a LOTR book?",
	1			: "Return of the King",
	2			: "Fellowship of the Ring",
	3			: "The Two Towers",
	4			: "A Feast for Crows",
	correct		: "4"
	},
	{question	: "# of Beatles",
	1			: "1",
	2			: "4",
	3			: "3",
	4			: "2",
	correct		: "2"
	}
];
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questNum = 0;
var thisQ = 0;
var qIndex = 0;
// Page Set-up

// Start game/reset on click
function reset(){
	$(".timerh").hide();
	$(".inforow").hide();
	$(".questions").empty();
	$(".messages").text("Click Here to Play!");
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	questnum = 0;
	$(".correct").text(correct);
	$(".incorrect").text(incorrect);
	$(".unanswered").text(unanswered);
	shuffle();
	console.log(questions);
};
// Display question
	// display options
function startgame (){
	$(".timerh").show();
	$(".inforow").show();
	$(".messages").text(questions[qIndex].question);
	for (i = 1; i <= 4; i++){
		var choices = $("<div>");
		var aNumber = i;
		choices
			.addClass("col-md-12 answerChoice")
			.attr("qID", [i])
			.text(questions[qIndex][i]);
		$(".choicebox").append(choices);
	};
	countdown.starttimer();
};

var countdown = {
	timeleft: 20,
	tillnext: 5,


	startqtimer: function(){
		qtimerID = setInterval(countdown.qcount, 1000);
	},
	nextqtimer: function(){
		ntimerID = setInterval(countdown.ncount, 1000)
	}
	qcount: function(){
		countdown.time--;
		$(".timer").text(countdown.timeleft);
	}
	ncount: function(){
		countdown.tillnext--;
		$(".timer").text(countdown.tillnext)
	},
};


function select (){
	var guessindex = ($(this).attr("qID"));
	console.log($(this).attr("qID"));
	if(guessindex === questions[qIndex].correct){
		console.log("right")
		$(".messages").text("Correct!");
		correct++;
		$(".correct").text(correct);
	} else {
		console.log("wrong")
		$(".messages").text("Incorrect!");
		incorrect++;
		$(".incorrect").text(incorrect);
	};
	qIndex++;
	//next question function goes here

}
function shuffle(){
	var selectIndex = questions.length;
	var tempSelect;
	var randomIndex;
	while (selectIndex !== 0){
		randomIndex = Math.floor(Math.random() * selectIndex);
		selectIndex--;
		tempSelect = questions[selectIndex];
		questions[selectIndex] = questions[randomIndex];
		questions[randomIndex] = tempSelect;

	}
};
// On option click:
	// check against questions
	// set wins or losses
	// wait
// Display new question OR display end screen
	// increment # of questions counter
	// OR display end screen
// Working reset
reset();
$(document).on("click", ".messages", startgame);
$(document).on("click", ".answerChoice", select);