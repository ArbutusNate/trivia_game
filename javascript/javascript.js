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
	$(".timer").hide();
	$(".tillnext").hide();
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
	$(".message").empty();
	$(".choicebox").empty();
	$(".timer").show();
	$(".inforow").show();
	$(".tillnext").hide();
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
	countdown.startqtimer();
};

var countdown = {
	timeleft: 7,
	tillnext: 5,

	// 20s Timer
	startqtimer: function(){
		qtimerID = setInterval(countdown.qcount, 1000);
	},
	qcount: function(){
		if(countdown.timeleft > 0){
			countdown.timeleft--;
			$(".timer").text(countdown.timeleft);
		} else {
			clearInterval(countdown.qtimerID);
			countdown.timeleft = 20;
			unanswered++;
			$(".unanswered").text(unanswered);
			$(".timer").text(countdown.timeleft).hide();
			debugger;
			countdown.nextqtimer();
		};
	},
	nextqtimer: function(){
		$(".tillnext").show();
		clearInterval(countdown.qtimerID);
		ntimerID = setInterval(countdown.ncount, 1000)
	},
	ncount: function(){
		if(countdown.tillnext > 0){
			countdown.tillnext--;
			$(".tillnext").text(countdown.tillnext)
		} else {
			startgame();
			clearInterval(countdown.nextqtimer);
		}
	}
};


function select (){
	var guessindex = ($(this).attr("qID"));
	console.log($(this).attr("qID"));
	$(".timer").hide();
	debugger;
	clearInterval(countdown.qtimerID);
	timeleft = 20;
	countdown.nextqtimer();
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