'use strict';
let currentQuestionNum = 0;
let currentScore = 0;
let lastAnswerCorrect = null;

function generateRandomImage(){
  //generate random tiger pics here
  let srcIndex= Math.floor(Math.random()*6);
  let imgArray = [
    './pics/nick-karvounis--KNNQqX9rqY-unsplash.jpg',
    './pics/rick-l-037fCBgZB10-unsplash.jpg',
    './pics/smit-patel-dGMcpbzcq1I-unsplash.jpg',
    './pics/frida-bredesen-76dgUcMupv4-unsplash.jpg',
    './pics/frida-bredesen-IDO_a-dxrCY-unsplash.jpg',
    './pics/paul-m-paL4zSmXTWc-unsplash.jpg'
  ]
  let imgSrc =  imgArray[srcIndex]
  console.log(imgSrc)
  return imgSrc;
}
function generateQuestionCard(card){
   return `
   <main role="main">
    <form>
      <fieldset>
          <span>Question number ${currentQuestionNum+1} out of ${QUIZ.length} questions</span>
            <h1>${card.question}</h1>
          <span class='tiger__image'><img src=${generateRandomImage()} alt='tiger pic' width='auto' height='250'/></span>
          <label>
            <input id='ans' type="radio" value="${card.answers[0]}" name="selector" required>
            <span>${card.answers[0]}</span>
         </label>
         
         <label> 
          <input id='ans2' type="radio" value="${card.answers[1]}" name="selector" required>
          <span>${card.answers[1]}</span>
       </label>
       
        <label>  
        <input id='ans3' type="radio" value="${card.answers[2]}" name="selector" required>
        <span>${card.answers[2]}</span>
     </label>
   
    <label>
      <input id='ans4' type="radio" value="${card.answers[3]}" name="selector" required>
      <span>${card.answers[3]}</span>
   </label>
   
   <button id="submitAnswer" type="submit" value="Submit">Submit</button>
       </fieldset>
    </form> 
    <div class="selectError"></div>
  </main>
   `
}

function generateFeedback(){
  return`
    <main role="main">
      <h3 id="lastAnswerCorrect">
        ${lastAnswerCorrect}
      </h3>
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
    if($("input[name='selector']").is(':checked')){
      var radioValue = $("input[name='selector']:checked").val();
      
      if(radioValue == QUIZ[currentQuestionNum].correctAnswer){
        lastAnswerCorrect = "Correct!";
        generateFeedback();
        currentScore++;
        renderFeedback();
        $('h3').addClass('green')
      }else{
        lastAnswerCorrect = "Incorrect :(";
        generateFeedback();
        renderFeedback();
        $('h3').addClass('red')
      }
  }
  else{
    $('.selectError').html('Please select a choice')
    return false;
  }
})
    
}
function handleClickAnswer(){
 $('.container').on('click','label', function(e){
   e.stopPropagation();
   
     
      $('input[name="selector"]:checked').parent().toggleClass('checked');
     
     
   
})
    
}

function handleNext(){
    $(".container").on("click","#next-button",function(e){
      e.preventDefault();
      if(currentQuestionNum < QUIZ.length - 1 ){
        currentQuestionNum++;
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
  handleClickAnswer()
  handleQuiz();
  handleSubmitAnswer();
  handleNext();
  handleTryAgain();
}

$(init);
