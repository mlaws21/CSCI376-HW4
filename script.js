// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "Where is Williams College located?",
      answers: [
        { text: "New York", correct: false },
        { text: "California", correct: false },
        { text: "Massachusetts", correct: true },
        { text: "Connecticut", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // These reference the divs with the ID specified to be the same string. For example:  <div id="question">
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Hint";
    nextButton.style.display = "block";

    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // These are being created dynamically so that we can add questions without having to completely refactor the HTML. 
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // This adds the button that we just dynamically created to the answerButtonsElement element. 
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    // nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }

    nextButton.textContent = "Next";
    nextButton.disabled = false;
    
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // If we remove this then the next button dissapears and we can't click it. "Block" means the button will take up the full width available and appears on its own line.
    nextButton.style.display = "block";
  }

  function hint() {
    var flag = true;
    Array.from(answerButtonsElement.children).forEach(button => {

      if (button.dataset.correct !== "true" && flag) {
        flag = false;
        button.classList.add("wrong");
      }
      // button.disabled = true;
    });
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleButton() {
    if (nextButton.textContent === "Hint") {
      hint();
      nextButton.disabled = true;
    } else {
      nextButton.textContent = "Hint";
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }

  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // When the user clicks the "Next" button, If there are still more questions left in the quiz it calls handleNextButton() to move to the next question. however,
  // If the quiz is finished it restarts the quiz by calling startQuiz().
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  