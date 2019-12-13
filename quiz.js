const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-button");
const previousQuestionButton = document.getElementById("previous");
const nextQuestionButton = document.getElementById("next");
const resultContainer = document.getElementById("result-container");
let currentSlide = 0;
const data = [
  {
    question: `<div class='question-container bounceInRight'> 
                <span>Is this function pure?</span>
                <span class='space'>const add = (x, y) => x + y;</span>
                <span class='space'>add(2, 4);</span></div>`,
    answers: {
      a: "Yes",
      b: "No"
    },
    correctAnswer: "a"
  },
  {
    question: `<div class='question-container bounceInRight'> 
                <span> What you can say about this function?</span>
                <span class='space'>let x = 2;</span>
                <span class='space'> const add = (y) => {</span>
                <span class='space2'>  x += y; </span>
                <span class='space'>    }; </span>
                <span class='space'>  add(4);</span>
                  </div> `,
    answers: {
      a: "it is pure",
      b: "it is inpure",
      c: "it is pure because it is returning anything"
    },
    correctAnswer: "b"
  },
  {
    question: `<div class='question-container'> 
                  <span>is this function pure?</span>
                  <span class='space'>const add = (x, y) => {</span>
                  <span class='space2'>return  x + y</span>
                  <span class='space'> };</span>
                  <span class='space'>add(2, 4);</span>
                  </div>`,
    answers: {
      a: "Yes",
      b: "No"
    },
    correctAnswer: "a"
  },
  {
    question: `<div class='question-container'>
                How many arrguments recieves Arrays reduce method and is it pure?
                </div>`,
    answers: {
      a: "3 & Yes",
      b: "4 & No",
      c: "4 & Yes"
    },
    correctAnswer: "c"
  },
  {
    question: `<div class='question-container'>
                   Which of Array methods do not return a new array
                  </div>`,
    answers: {
      a: "map,filter,reduce,every",
      b: "every,some,reduce,forEach",
      c: "every,some,forEach"
    },
    correctAnswer: "c"
  },
  {
    question: `<div class='question-container'>
                 How many data types have JS
                  </div>`,
    answers: {
      a: "6",
      b: "7",
      c: "8",
      d: "9"
    },
    correctAnswer: "c"
  },
  {
    question: `<div class='question-container'>
                  What is the result?
                  <span>[] + [] + 'foo'.split('');</span>
                  </div>`,
    answers: {
      a: '[][]"f,o,o"',
      b: '"f,o,o"',
      c: "[f,o,o]",
      d: "NAN"
    },
    correctAnswer: "b"
  },
  {
    question: `<div class='question-container'>
                  <span>What is printed in the console?</span>
                  <span>let myArr = ['foo', 'bar', 'baz'];</span>
                  <span>myArr.length = 0;</span>
                  <span>myArr.push('bin');</span>
                  <span>console.log(myArr);</span>
                  </div>`,
    answers: {
      a: "['foo', 'bar', 'baz']",
      b: "['foo', 'bar', 'baz', 'bin']",
      c: "[bin]",
      d: "Error"
    },
    correctAnswer: "c"
  },
  {
    question: `<div class='question-container'>
                  <span>What is the result?</span>
                  <span>String('Hello') === 'Hello';</span>
                  </div>`,
    answers: {
      a: "true",
      b: "false",
      c: "TypeError",
    },
    correctAnswer: "a"
  },
  {
    question: `<div class='question-container'>
                  <span>What is alerted?</span>
                  <span>var arr = [];</span>
                  <span>arr[0]  = 'a';</span>
                  <span>arr[1]  = 'b';</span>
                  <span>arr.foo = 'c';</span>
                  <span>alert(arr.length);</span>
                  </div>`,
    answers: {
      a: "2",
      b: "3",
      c: "Undefined",
      d: "typeError"
    },
    correctAnswer: "a"
  },
];

const buildQuiz = () => {
  const htmlOutput = [];
  data.forEach((everyQuestion, questionNumber) => {
    const answers = [];
    for (key in everyQuestion.answers) {
      answers.push(
        `<lable>
             <input type='radio' name="question${questionNumber}" value="${key}"/>
             ${key} : ${everyQuestion.answers[key]}
           </lable>`
      );
    }
    htmlOutput.push(
      `<div class='slide'>
            <div class='question'>${everyQuestion.question}</div>
            <div class='answers'>${answers.join("")}</div>
          </div>`
    );
  });
  quizContainer.innerHTML = htmlOutput.join("");
};
buildQuiz();

const showResults = () => {
  const answersContainers = document.querySelectorAll(".answers");
  let points = 0;

  data.forEach((everyQuestion, questionNumber) => {
    const answerContainer = answersContainers[questionNumber];
    const selector = "input[name=question" + questionNumber + "]:checked";
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    console.log(userAnswer);
    if (userAnswer === everyQuestion.correctAnswer) {
      points++;
      answersContainers[questionNumber].style.color = "green";
    } else {
      answersContainers[questionNumber].style.color = "red";
    }
  });
  resultContainer.innerHTML = points + " right of " + data.length;
  alert(`you gain ${points} points from ${data.length} ` )
};

const slides = document.querySelectorAll(".slide");
const showSlide = n => {
  console.log(slides);
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  if (currentSlide === 0) {
    previousQuestionButton.style.display = "none";
  } else {
    previousQuestionButton.style.display = "inline-block";
  }
  if (currentSlide === slides.length - 1) {
    nextQuestionButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextQuestionButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
};
showSlide(0);

previousQuestionButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});
nextQuestionButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  console.log(currentSlide);
});

submitButton.addEventListener("click", showResults);
