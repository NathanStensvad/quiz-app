const STORE = [
  { //1
    question: 'What item is made from these components?',
    questionItems:`
    <div class="item">
      <img src="images/question-1/sacred-relic.png" alt="Sacred Relic">
    </div>
    <div class="item">
      <img src="images/question-1/demon-edge.png" alt="Demon Edge">
    </div>`,
    answerItems: [
      '<input type="image" id="A" src="images/question-1/silver-edge.png" alt="Silver Edge">', 
      '<input type="image" id="B" src="images/question-1/mjollnir.png" alt="Mjollnir">', 
      '<input type="image" id="C" src="images/question-1/iron-branch.png" alt="Iron Branch">', 
      '<input type="image" id="D" src="images/question-1/divine-rapier.png" alt ="Divine Rapier">'
    ],
    correctAnswer: "D"
  },
  { //2
    question: 'What naval rank does this hero claim?',
    questionItems:`
    <div class="item">
      <img src="images/question-2/kunkka.png" alt="Kunkka">
    </div>`,
    answerItems: [
      '<input type="submit" id="A" value="Admiral">', 
      '<input type="submit" id="B" value="Commander">', 
      '<input type="submit" id="C" value="Captain">', 
      '<input type="submit" id="D" value="Lieutenant">'
    ],
    correctAnswer: "A"
  },
  { //3
    question: 'This hero wields which weapon?',
    questionItems:`
    <div class="item">
      <img src="images/question-3/phantom-assassin.png" alt="Phantom Assassin">
    </div>`,
    answerItems: [
      '<input type="image" id="A" src="images/question-3/axe.png" alt="Culling Blade">', 
      '<input type="image" id="B" src="images/question-3/bugs.png" alt="The Swarm">', 
      '<input type="image" id="C" src="images/question-3/club.png" alt="Bash of the Deep">', 
      '<input type="image" id="D" src="images/question-3/dagger.png" alt ="Stifling Dagger">'
    ],
    correctAnswer: "D"
  },
  { //4
    question: 'Which hero utters the phrase: "From the Ghastly Eyrie I can see to the ends of the world, and from this vantage point, I declare with utter certainty that this one is in the bag!"?',
    questionItems:``,
    answerItems: [
      '<input type="image" id="A" src="images/question-4/timbersaw.png" alt="Timbersaw">', 
      '<input type="image" id="B" src="images/question-4/storm-spirit.png" alt="Storm Spirit">', 
      '<input type="image" id="C" src="images/question-4/skywrath-mage.png" alt="Skywrath Mage">', 
      '<input type="image" id="D" src="images/question-4/invoker.png" alt ="Invoker">'
    ],
    correctAnswer: "C"
  },
  { //5
    question: 'What hero has like LITERALLY no agility?',
    questionItems:``,
    answerItems: [
      '<input type="image" id="A" src="images/question-5/lycan.png" alt="Lycan">', 
      '<input type="image" id="B" src="images/question-5/tiny.png" alt="Tiny">', 
      '<input type="image" id="C" src="images/question-5/treant.png" alt="Treant Protector">', 
      '<input type="image" id="D" src="images/question-5/underlord.png" alt ="Underlord">'
    ],
    correctAnswer: "B"
  },
]

/*Keep track of questions and score*/
let currentQuestion = 0;
let score = 0;

function startQuiz() {
  $('#start').on('click', function() {
    showQuestion();
  });
}

/*update the score when the user gets a question right*/
function updateScore() {
  let scoreHTML = $(`
  <div>
      <h1>QUEUE TIME TRIVIA</h1>
    </div>
    <div id="score">
      <h1>POINTS: ${score}</h1>
    </div>`)
  $("header").html(scoreHTML);
}

/*Update the html with a new question*/
function showQuestion() {

  const questionToHTML = $(`
  <!--Questions-->

      <section>
        <h2>${STORE[currentQuestion].question}</h2>
      </section>
      <section class="group big-margin items">
        ${STORE[currentQuestion].questionItems}
      </section>

      <!--Answers-->

      <section class="group items">
        <div class="group margin item border">
          <h3>A</h3>
          ${STORE[currentQuestion].answerItems[0]}
        </div>
        <div class="group margin item border">
          <h3>B</h3>
          ${STORE[currentQuestion].answerItems[1]}
        </div>
      </section>
      <section class="group items">
        <div class="group margin item border">
          <h3>C</h3>
          ${STORE[currentQuestion].answerItems[2]}
        </div>
        <div class="group margin item border">
          <h3>D</h3>
          ${STORE[currentQuestion].answerItems[3]}
        </div>
      </section>

      <section>
        <div id="bottom">
          <h3>Question ${currentQuestion+1}/${STORE.length}<h3>
        </div>
      </section>

      <section>
        <div id="correct">
          <p style="text-align:right">Correct: ${score/100}</p>
        </div>
      </section>
  `);

  $("main").html(questionToHTML);
  optionSelect();
}

function showNextQuestionButton() {
  let buttonText = "NEXT QUESTION"
  if(currentQuestion === STORE.length){
    buttonText = "RESULTS";
  }
  $("div#correct").html(`<p style="text-align:right"><button type="submit" id="next-question">${buttonText}</button> Correct: ${score/100}</p>`)

  nextQuestionSelect();
}

/*Restart Quiz Function*/
function restartQuizButton() {
  $("button").on('click',function() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
  });
}

/*Show Results screen*/
function showResults() {
  const finalResults = $(`
  <section>
    <h1>You have gotten a score of</h1>
    <h2>${score} out of ${STORE.length*100} </h2>
    <h3>Today you have earned something better than riches</h3>
    <h2>My respect</h2>
    <h6>No riches</h6>
    <button style="margin-bottom: 10px" type="submit" id="restart-quiz">Play again?</button>
  </section>
  `);
  $("main").html(finalResults);
  restartQuizButton();
}

/*Click the next question button*/
function nextQuestionSelect() {
  $("button").on('click',function() {
    if(currentQuestion === STORE.length) {
      showResults();
    }
    else {
    showQuestion();
    }
  });
}

/*After a user inputs an answer*/
function nextQuestionPrompt(selection) {
  $("input").attr('disabled', true);
  $(`input#${selection}`).parent().css("background-color","red");
  $(`input#${selection}`).css("background-color","red");
  $(`input#${STORE[currentQuestion].correctAnswer}`).parent().css("background-color","green");
  $(`input#${STORE[currentQuestion].correctAnswer}`).css("background-color","green");
  if(selection === STORE[currentQuestion].correctAnswer) {
    $("div#bottom").html(`<h3>Correct!<h3>`)
  }
  else {
    $("div#bottom").html(`<h3>Incorrect!<h3>`)
  }
  updateScore();
  currentQuestion++;
  showNextQuestionButton();
}

/*function to make the option choices active*/
function optionSelect() {
  correctAnswer = STORE[currentQuestion].correctAnswer;

  $('#A').on('click',function() {
    if(correctAnswer === "A"){
      score += 100;
    }
    nextQuestionPrompt("A");
  });

  $('#B').on('click',function() {
    if(correctAnswer === "B"){
      score += 100;
    }
    nextQuestionPrompt("B");
  });

  $('#C').on('click',function() {
    if(correctAnswer === "C"){
      score += 100;
    }
    nextQuestionPrompt("C");
  });

  $('#D').on('click',function() {
    if(correctAnswer === "D"){
      score += 100;
    }
    nextQuestionPrompt("D");
  });
}

function quizTime() {
  startQuiz();
  optionSelect();
}

quizTime();