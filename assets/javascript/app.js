
var questions = [{
  question: "Which Kendrick Lamar album featured the song \"The Art of Peer Pressure\"?",
  answers: ["Damn", "Good Kid, M.A.A.D City", "To Pimp a Butterfly", "Section.80"],
  correctAnswer: "Good Kid, M.A.A.D City",
  image: "assets/images/Kendrick-Lamar.gif"
}, {
  question: "How many hearts does an octopus have?",
  answers: ["1", "8", "4", "3"],
  correctAnswer: "3",
  image: "assets/images/Octopus.gif"
}, {
  question: "Which Philosopher wrote the essay \"The Myth of Sisyphus\"?",
  answers: ["Friedrich Nietzsche", "Michel de Montaigne", "Immanuel Kant", "Albert Camus"],
  correctAnswer: "Albert Camus",
  image: "assets/images/Camus.gif"
}, {
  question: "What was the first novel to win the Nebula Award, the Philip K. Dick Award, and the Hugo Award?",
  answers: ["Neuromancer", "Snow Crash", "The Necronomicon", "Do Androids Dream of Electric Sheep?"],
  correctAnswer: "Neuromancer",
  image: "assets/images/Neuromancer.gif"
}, {
  question: "Who is the following quote attributed to? \"For small creatures such as we the vastness is bearable only through love\"",
  answers: ["Mr Rogers", "Bill Nye", "Carl Sagan", "Thomas Jefferson"],
  correctAnswer: "Carl Sagan",
  image: "assets/images/Sagan.gif"
}, {
  question: "Which producer engineered the recording of the albums: \"In Utero\", \"Surfer Rosa\", and \"The Weirdness\"?",
  answers: ["Steve Albini", "Butch Vig", "Scott Litt", "Jimmy Page"],
  correctAnswer: "Steve Albini",
  image: "assets/images/Albini.gif"
}];

const dashBoard = $("#in");

const startnum = 30;



let timer;

const game = {

  questions: questions,
  currentQuestion: 0,
  counter: startnum,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  setQueastion: function() {

    timer = setInterval(game.countdown, 1000);

    dashBoard.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      dashBoard.append("<button class='answers' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = startnum;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.setQueastion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    dashBoard.html("<h2>Ooo.. Too Slow</h2>");
    dashBoard.append("<h3>The answer was: " + questions[this.currentQuestion].correctAnswer);
    dashBoard.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    dashBoard.html("<h2>Your Fate!</h2>");

    $("#counter-number").text(game.counter);

    dashBoard.append("<h3>Right Answers: " + game.correct + "</h3>");
    dashBoard.append("<h3>Wrong Answers: " + game.incorrect + "</h3>");
    dashBoard.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    dashBoard.append("<br><button id='newGame'>Glutten for punishment?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.rightAnswer();
    }
    else {
      this.wrongAnswer();
    }
  },

  wrongAnswer: function() {

    game.incorrect++;

    clearInterval(timer);

    dashBoard.html("<h2>Actually..</h2>");
    dashBoard.append("<h3>It was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    dashBoard.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  rightAnswer: function() {

    clearInterval(timer);

    game.correct++;

    dashBoard.html("<h2>Correct!</h2>");
    dashBoard.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = startnum;
    this.correct = 0;
    this.incorrect = 0;
    this.setQueastion();
  }
};



$(document).on("click", "#newGame", function() {
  game.reset();
});

$(document).on("click", ".answers", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#mid").prepend("<h2>Time left: <span id='counter-number'>30</span> Seconds</h2>");
  game.setQueastion();
});
