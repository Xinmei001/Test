// Variables
const submitBtn = document.getElementById('submitBtn');
const questionOne = document.getElementsByName('q1').value;
const questionTwo = document.getElementsByName('q2').value;
const questionThree = document.getElementsByName('q3').value;
const questionFour = document.getElementsByName('q4').value;
const questionFive = document.getElementsByName('q5').value;
const questionSix = document.getElementsByName('q6').value;
const questionSeven = document.getElementsByName('q7').value;
const questionEight = document.getElementsByName('q8').value;
const questionNine = document.getElementsByName('q9').value;
const questionTen = document.getElementsByName('q10').value;

// set a variable for each answer
var questionValue = [];
// set a variable for finalscore
var questionGrade = 0;

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous control
function plusSlides(operation) {
  // the index of quesition
  let questionNum = document.querySelectorAll(".slide").length;

  // when last question, carousel ends
  if (slideIndex >= questionNum && operation == 1) {
    return;
  }
  showSlides(slideIndex += operation);
}

// Thumbnail image control
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  // pagination
  let paginationElement = document.querySelectorAll(".pagination-bullet");
  for (let i = 0; i < paginationElement.length; i++) {
    paginationElement[i].classList.remove('swiper-pagination-bullet-active');
  }
  paginationElement[slideIndex - 1].classList.add('swiper-pagination-bullet-active');

  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  // if (n >= slides.length) {
  //   document.getElementById("next").style.display = "none"
  //   document.getElementById("previous").style.display = "block"
  // }
  // if (n <= 1) { document.getElementById("previous").style.display = "none" }
  // if (n > 1 && n < slides.length) {
  //   document.getElementById("next").style.display = "block"
  //   document.getElementById("previous").style.display = "block"
  // }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].className += " active";
}

// click
function addOptionClick() {
  // carousel 
  let allSlideElement = document.querySelectorAll(".slide");
  for (let i = 0; i < allSlideElement.length; i++) {
    // the labels
    let allLabelElement = allSlideElement[i].querySelectorAll("label");
    for (let j = 0; j < allLabelElement.length; j++) {
      // so you can click the label
      allLabelElement[j].addEventListener('click', function () {
        // get the question number of the quiz
        let questionNum = document.querySelectorAll(".slide").length;

        // if the number of checked questions = 10, the quiz is finished 
        let answerCount = 0;
        for (let i = 1; i <= questionNum; i++) {
          let radioNum = document.querySelector("#quiz")["q" + i].value;
          if (radioNum) {
            answerCount++;
          }
        }
        if (answerCount == questionNum - 1) {
          // submit button works only when quiz is finished
          let subBtn = document.querySelector("#submit");
          subBtn.style.cursor = "pointer";
          subBtn.classList.add('submit-active');
          subBtn.disabled = false;
        }
        // to the next question
        setTimeout(() => {
          plusSlides(1);
        }, 500);
      }, 'false')
    }
  }
}
addOptionClick();

// when click the dots, you can jump to a specific question
function addDotsClick() {
  let allDotsElement = document.querySelectorAll(".pagination-bullet");
  for (let j = 0; j < allDotsElement.length; j++) {
    allDotsElement[j].addEventListener('click', function () {
      slideIndex = j;
      showSlides(++slideIndex);
    }, 'false')
  }
}
addDotsClick();

// Start the quiz
function startQuiz() {
  document.querySelector(".start-page").style.display = "none"
  document.querySelector(".start-page").style.transition = "1s"
  document.querySelector(".questionnaire").style.display = "block"
  document.querySelector(".questionnaire").style.transition = "1s"
}

// Submit
function questionSubmit() {
  // collect values for each answer and calculate final score
  for (let i = 1; i <= 10; i++) {
    let radionum = document.querySelector("#quiz")["q" + i].value;
    questionValue.push(++radionum);
    questionGrade += radionum;
  }

  let resultText = "";
  switch (true) {
    case questionGrade <= 20:
      resultText = "If you have received a score of 10-20, you would be categorized as relatively stable from a mental health perspective. We encourage you to continue taking whatever current steps you are taking to maintain your overall mental health.\n Aside from this, we do have some suggestions to make things even better for you. Take a walk outside in nature…we’ve been too cooped up lately. Start a daily journal…and on the days when you don’t feel like journaling, write about those feelings. Make sure you’re maintaining a nutritious and satisfying diet…food is fuel.";
      break;
    case questionGrade <= 30:
      resultText = "If you have received a score of 21 to 30, you would be categorized as moderately stable from a mental health perspective. We encourage you to continue taking whatever current steps you are taking to maintain your overall mental health. That being said, we do notice that you could use some extra suggestions for support.\n Lean into your passions… Is there a hobby that you’ve been neglecting? A person you haven’t reached out to in a while? Reconnect with your roots… It’s always a good idea. In times where we feel lonely or anxious, those we care about and those activities which we care about become so much more important.";
      break;
    case questionGrade <= 40:
      resultText = "If you have received a score of 31 to 40, you would be categorized as moderately unstable from a mental health perspective. We encourage you to continue leaning into whatever things might be helpful for you during this time. That all being said, we want to help you make things better.\n Here are some of our suggestions. Make sure that you are taking care of your physical health. That means engaging in some sort of exercise, eating healthfully and in a satisfying way. The mental is very connected to the physical, we are sure that you know this. Sometimes it can be overwhelming to practice regular self care. But you deserve it.";
      break;
    case questionGrade > 40:
      resultText = "If you have received a score higher than 40, you would be categorized as unstable from a mental health perspective. We encourage you to grasp anything that might be helping you feel better during this time, but we want to help, so we have some suggestions for you.\n We deeply encourage you to let someone know about how you’re feeling during this time. We assure you that you are not alone, so many face mental health problems and so many have been facing them recently, related to the pandemic. It can be hard to confide in others, to make oneself vulnerable. But gaining connection in any areas where connection might feel as though it’s lacking is what we call your Covid care. Even if all that feels reasonable is too create a YouTube search and connect with someone over the Internet from a distance, that is a step. If you have any loved ones whom you might be able to reach out to, know that it is not burdensome to them to hear your problems. If you have any other resources, please do use them.";
      break;
    default:
      resultText = "error";
  }
  document.querySelector(".result-text").innerText = resultText;


  // go to the result page
  document.querySelector(".questionnaire").style.display = "none";
  document.querySelector(".result-page").style.display = "block";
  document.querySelector(".score").innerHTML = questionGrade;
}

// Take it again
function retakeBtn() {
  document.querySelector(".questionnaire").style.display = "block";
  document.querySelector(".result-page").style.display = "none";
  document.querySelector("#submit").disabled = true;
  document.querySelector("#submit").style.cursor = "default";
  document.querySelector("#submit").classList.remove('submit-active');
  // document.getElementById("next").style.display = "block"

  // reset the questions
  let questionNum = document.querySelectorAll(".slide").length;
  for (let i = 1; i <= questionNum; i++) {
    let allquestionElement = document.querySelector("#quiz")["q" + i];
    for (let j = 0; j < allquestionElement.length; j++) {
      allquestionElement[j].checked = false;
    }
  }
  // reset the variables
  questionValue = [];
  questionGrade = 0;
  slideIndex = 1;
  showSlides(slideIndex);
}
