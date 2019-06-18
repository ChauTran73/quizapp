'use strict';
let currentQuestionNum = 0;
let currentScore = 0;
let lastAnswerCorrect = null;

function generateQuestionCard(card){
   return `
   <main role="main">
    <form>
      <fieldset>
          <span>Question number ${currentQuestionNum+1} out of ${QUIZ.length} questions</span>
            <h1>${card.question}</h1>
          
          <label>
            <input type="radio" value="${card.answers[0]}" name="selector" required>
            <span>${card.answers[0]}</span>
         </label>
         
         <label> 
          <input type="radio" value="${card.answers[1]}" name="selector" required>
          <span>${card.answers[1]}</span>
       </label>
       
        <label>  
        <input type="radio" value="${card.answers[2]}" name="selector" required>
        <span>${card.answers[2]}</span>
     </label>
   
    <label>
      <input type="radio" value="${card.answers[3]}" name="selector" required>
      <span>${card.answers[3]}</span>
   </label>
   
   <button id="submitAnswer" type="submit" value="Submit">Submit</button>
       </fieldset>
    </form> 
  </main>
   `
}

function generateFeedback(){
  return`
    <main role="main">
      <h3 id="lastAnswer">${lastAnswerCorrect}</h3>
      <h4>${QUIZ[currentQuestionNum].correctAnswer}</h4>
      <p>${QUIZ[currentQuestionNum].feedback}</p>
      <button id="next-button">Next</button>
    </main>
  `
}

function questionsContainer(){
    const item = generateQuestionCard(QUIZ[currentQuestionNum]);
    return item;
}

function renderQuestionCard() {
    const itemString = questionsContainer();
  $('.container').html(itemString);
  }

function renderFeedback(){
  const itemString  = generateFeedback();
  $('.container').html(itemString);
}

function renderSummaryScreen(){
  const itemString  = generateSummaryScreen();
  $('.container').html(itemString);
}

function generateSummaryScreen(){
  return`
    <main>
      <h3>Your Quiz Result</h3>
      <p>Number of correct answers: ${currentScore} out of ${QUIZ.length} answers</p>
      <p>Total score (%): ${(currentScore/QUIZ.length)*100}% out of 100% </p>
      <button id="tryagain">Try Again</button>
    </main>
  `
}

function handleQuiz(){
    $(".start-quiz").on("click",function(e){
        e.preventDefault();
        renderQuestionCard();
    })
}

function handleSubmitAnswer(){
  $(".container").on("click","#submitAnswer", function(e){
    e.preventDefault();
    var radioValue = $("input[name='selector']:checked").val();
    if(radioValue == QUIZ[currentQuestionNum].correctAnswer){
      lastAnswerCorrect = "Correct";
      generateFeedback();
     
      currentScore++;
      renderFeedback();
    }else{
      lastAnswerCorrect = "Incorrect";
      generateFeedback();
      renderFeedback();
    }
  })
}

function handleNext(){
    $(".container").on("click","#next-button",function(e){
      e.preventDefault();
      if(currentQuestionNum < QUIZ.length - 1 ){
        currentQuestionNum++;
        // console.log(currentQuestionNum)
        renderQuestionCard();
      }else{
        renderSummaryScreen();
      }
    })
  }

function handleTryAgain(){
$(".container").on("click", "#tryagain", function(){
  currentQuestionNum =0;
  currentScore =0;
  renderQuestionCard();
})
}

function init(){
  handleQuiz();
  handleSubmitAnswer();
  handleNext();
  handleTryAgain();
}

$(init);
