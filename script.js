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
      `<img src="images/question-1/silver-edge.png" alt="Silver Edge">`,
      `<img src="images/question-1/mjollnir.png" alt="Mjollnir">`,
      `<img src="images/question-1/iron-branch.png" alt="Iron Branch">`,
      `<img src="images/question-1/divine-rapier.png" alt ="Divine Rapier">`
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
      `<p>Admiral</p>`, 
      `<p>Commander</p>`, 
      `<p>Captain</p>`, 
      '<p>Lieutenant</p>'
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
      '<img src="images/question-3/axe.png" alt="Culling Blade">', 
      '<img src="images/question-3/bugs.png" alt="The Swarm">', 
      '<img src="images/question-3/club.png" alt="Bash of the Deep">', 
      '<img src="images/question-3/dagger.png" alt ="Stifling Dagger">'
    ],
    correctAnswer: "D"
  },
  { //4
    question: 'Which hero utters the phrase: "From the Ghastly Eyrie I can see to the ends of the world, and from this vantage point, I declare with utter certainty that this one is in the bag!"?',
    questionItems:``,
    answerItems: [
      '<img src="images/question-4/timbersaw.png" alt="Timbersaw">', 
      '<img src="images/question-4/storm-spirit.png" alt="Storm Spirit">', 
      '<img src="images/question-4/skywrath-mage.png" alt="Skywrath Mage">', 
      '<img src="images/question-4/invoker.png" alt ="Invoker">'
    ],
    correctAnswer: "C"
  },
  { //5
    question: 'What hero has like LITERALLY no agility?',
    questionItems:``,
    answerItems: [
      '<img src="images/question-5/lycan.png" alt="Lycan">', 
      '<img src="images/question-5/tiny.png" alt="Tiny">', 
      '<img src="images/question-5/treant.png" alt="Treant Protector">', 
      '<img src="images/question-5/underlord.png" alt ="Underlord">'
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

/*Render the html with a new question*/
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
      <form class="question-pick" id="form1">
      <section class="group items">
        <div class="group margin item border">
          <h3>A</h3>
          <label>
            <input name="select" type="radio" id="A" value="A" tabindex="1">
            ${STORE[currentQuestion].answerItems[0]}
          </label>
        </div>
        <div class="group margin item border">
          <h3>B</h3>
          <label>
            <input name="select" type="radio" id="B" value="B" tabindex="2">
            ${STORE[currentQuestion].answerItems[1]}
          </label>
        </div>
      </section>
      <section class="group items">
        <div class="group margin item border">
          <h3>C</h3>
          <label>
            <input name="select" type="radio" id="C" value="C" tabindex="3">
            ${STORE[currentQuestion].answerItems[2]}
          </label>
        </div>
        <div class="group margin item border">
          <h3>D</h3>
          <label>
            <input name="select" type="radio" id="D" value="D" tabindex="4">
            ${STORE[currentQuestion].answerItems[3]}
          </label>
        </div>
      </section>
      </form>

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
  showSubmitButton();
}

/*After a user inputs an answer*/
function nextQuestionPrompt(selection) {
  $("input").attr('disabled', true);
  $(`input#${selection}`).parent().parent().css("background-color","red");
  $(`input#${selection}`).css("background-color","red");
  $(`input#${STORE[currentQuestion].correctAnswer}`).parent().parent().css("background-color","green");
  $(`input#${STORE[currentQuestion].correctAnswer}`).css("background-color","green");
  if(selection === STORE[currentQuestion].correctAnswer) {
    $("div#bottom").html(`<h3>Correct!<h3>`)
    score+=100;
  }
  else {
    $("div#bottom").html(`<h3>Incorrect!<h3>`)
  }
  updateScore();
  currentQuestion++;
  showNextButton();
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

/*Show the submit button after question is shown*/
function showSubmitButton() {
  let buttonText = "SUBMIT";
  $("div#correct").html(`<p style="text-align:right"><button type="submit" form="form1">${buttonText}</button> Correct: ${score/100}</p>`)

  submitAnswer();
}

/*function to activate the submit button*/
function submitAnswer() {
  $('#form1').on('submit', function(e) {
    e.preventDefault();
    selection = $("input:checked").val();
    if (!selection) {
      alert("Try to select something");
      return;
    }
    nextQuestionPrompt(selection);
  });
}

/*Show the next button if there are questions left, otherwise show results button*/
function showNextButton() {
  let buttonText = "NEXT QUESTION";
  if(currentQuestion === STORE.length){
    buttonText = "RESULTS";
  }
  $("div#correct").html(`<p style="text-align:right"><button type="submit" id="next-question" >${buttonText}</button> Correct: ${score/100}</p>`)

  nextQuestionSelect();
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

/*Restart Quiz Function*/
function restartQuizButton() {
  $("button").on('click',function() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
  });
}

function quizTime() {
  startQuiz();
}

quizTime();