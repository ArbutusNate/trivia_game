//Establish Variables
var questions = [
	{question	: "Which of these is not a LOTR book?",
	1			: "Return of the King",
	2			: "Fellowship of the Ring",
	3			: "The Two Towers",
	4			: "A Feast for Crows",
	correct		: "4",
	imgindex	: "1"
	},
	{question 	: "The name of Sarumans Tower is...",
	1			: "The Grey Tower",
	2			: "Isengard",
	3			: "Orthanc",
	4			: "Helm's Deep",
	correct 	: "3",
	imgindex	: "2"
	},
	{question 	: "The first race of Men were called...",
	1			: "Númenóreans",
	2 			: "Quendi",
	3 			: "Falmari",
	4			: "Gondorian",
	correct 	: "1",
	imgindex	: "3"
	},
	{question 	: "Gandalfs original name was...",
	1			: "Gandalf",
	2			: "Olorin",
	3			: "Mithrandir",
	4			: "Tharkun",
	correct 	: "2",
	imgindex	: "4"
	},
	{question 	: "Sammath Naur, where Frodo destroyed the Ring comes from which elvish language?",
	1			: "Quenya",
	2			: "Telerin",
	3			: "Sindarin",
	4			: "Nandorin",
	correct 	: "3",
	imgindex	: "5"
	},
];
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questNum = 0;
var thisQ = 0;
var qIndex = 0;
var qtimerID;
var ntimerID;
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', './assets/theme.mp3');

// Page Set-up

// Start game/reset on click
function reset(){
	$("h3").hide();
	$(".inforow").hide();
	$(".victory").hide(200);
	$(".timerrow").show();
	$(".progress").hide();
	$(".messages").show();
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	questnum = 0;
	qIndex = 0;
	$(".correct").text(correct);
	$(".incorrect").text(incorrect);
	$(".unanswered").text(unanswered);
	shuffle();
	audioElement.play();
	console.log(questions);

    
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);
};
// Display question
	// display options
function startgame (){
	if(correct + incorrect + unanswered < questions.length){
		$(".victory").hide();
		$(".messages").hide();
		$(".timer").show();
		$(".progress").show();
		$(".inforow").show();
		$(".tillnext").hide();
		$(".questionrow").show();
		$(".choicebox").show();
		$(".questionbox").text(questions[qIndex].question);
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
	} else {
		$(".timerrow").hide();
		$(".questionrow").hide();
		var victory = $("<div>")
		victory
			.addClass("victory")
			.text("You got " + correct + " questions correct, and missed " + incorrect + ". Click Here to Play Again.");
		$(".headrow").append(victory)
	}
};

var countdown = {
	timeleft: 20,
	tillnext: 5,

	// 20s Timer
	startqtimer: function(){
		qtimerID = setInterval(countdown.qcount, 1000);
		$('.progress-bar').css('width', countdown.timeleft*5 + '%');
	},
	qcount: function(){
		countdown.tillnext = 5;
		$(".tillnext").text(countdown.tillnext);
		if(countdown.timeleft > 0){
			countdown.timeleft--;
			$(".timer").text(countdown.timeleft);
			$('.progress-bar').css('width', countdown.timeleft*5 + '%');
		} else {
			clearInterval(qtimerID);
			countdown.timeleft = 20;
			unanswered++;
			$(".unanswered").text(unanswered);
			$(".timer").text(countdown.timeleft).hide();
			countdown.nextqtimer();
		};
	},
	nextqtimer: function(){
		$(".tillnext").show();
		ntimerID = setInterval(countdown.ncount, 1000);
		$('.progress-bar').css('width', countdown.tillnext*20 + '%');
	},
	ncount: function(){
		if(countdown.tillnext > 0){
			countdown.tillnext--;
			$(".tillnext").text(countdown.tillnext)
			$('.progress-bar').css('width', countdown.tillnext*20 + '%');
		} else {
			$(".questionrow").children().empty();
			startgame();
			$(".victoryimg")
				.empty()
				.hide();
			$(".infobox").show();
			tillnext = 5;
			clearInterval(ntimerID);
		}
	}
};


function select (){
	var guessindex = ($(this).attr("qID"));
	console.log($(this).attr("qID"));
	$(".timer").hide();
	clearInterval(qtimerID);
	countdown.timeleft = 20;
	countdown.tillnext = 5;
	$(".tillnext").text(countdown.tillnext);
	$(".timer").text(countdown.timeleft);
	countdown.nextqtimer();
	$(".choicebox").hide();
	if(guessindex === questions[qIndex].correct){
		console.log("right")
		$(".questionbox").text("Correct!");
		correct++;
		$(".correct").text(correct);
		var victory = $("<div>");
		victory
			.show()
			.html("<img class='victoryimg' src='./assets/images/answer" + questions[qIndex].imgindex + ".png'</img>");
		$(".headrow").append(victory);
		$(".infobox").hide();
			
	};
	if(guessindex !== questions[qIndex].correct) {
		console.log("wrong")
		$(".questionbox").text("Incorrect!");
		incorrect++;
		$(".incorrect").text(incorrect);
	};
	qIndex++;

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
reset();
$(document).on("click", ".messages", startgame);
$(document).on("click", ".answerChoice", select);
$(document).on("click", ".victory", reset);