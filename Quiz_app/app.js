/* ==========================================================================
   QUIZ APPLICATION LOGIC & STATE MANAGEMENT
   ========================================================================== */
// --- Questions Database ---
const QUESTIONS = {
  easy: [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Rome", "Paris"],
      correct: 3
    },
    {
      question: "How many colors are there in a rainbow?",
      options: ["5", "6", "7", "8"],
      correct: 2
    },
    {
      question: "Which planet in our solar system is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3
    },
    {
      question: "What is a baby dog called?",
      options: ["Kitten", "Cub", "Puppy", "Calf"],
      correct: 2
    },
    {
      question: "How many days are there in a standard year?",
      options: ["365", "366", "350", "360"],
      correct: 0
    },
    {
      question: "Which animal is known as the King of the Jungle?",
      options: ["Tiger", "Elephant", "Lion", "Giraffe"],
      correct: 2
    },
    {
      question: "What is the opposite of the word 'hot'?",
      options: ["Cold", "Warm", "Ice", "Wet"],
      correct: 0
    },
    {
      question: "Which sweet substance do bees make?",
      options: ["Sugar", "Honey", "Jam", "Syrup"],
      correct: 1
    },
    {
      question: "What geometric shape is a soccer ball?",
      options: ["Cube", "Cylinder", "Cone", "Sphere"],
      correct: 3
    },
    {
      question: "Which fruit is famously associated with Isaac Newton and gravity?",
      options: ["Banana", "Apple", "Orange", "Peach"],
      correct: 1
    },
    {
      question: "What language is primarily spoken in Brazil?",
      options: ["Spanish", "French", "English", "Portuguese"],
      correct: 3
    },
    {
      question: "How many legs does a spider have?",
      options: ["6", "8", "10", "12"],
      correct: 1
    },
    {
      question: "Which is the tallest mammal on Earth?",
      options: ["Elephant", "Giraffe", "Moose", "Camel"],
      correct: 1
    },
    {
      question: "What is the freezing point of water in Celsius?",
      options: ["0°C", "100°C", "-10°C", "32°C"],
      correct: 0
    }
  ],
  medium: [
    {
      question: "Which chemical element has the symbol 'O'?",
      options: ["Osmium", "Oxygen", "Gold", "Helium"],
      correct: 1
    },
    {
      question: "Who wrote the famous play 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      correct: 1
    },
    {
      question: "What is the official currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Ringgit"],
      correct: 2
    },
    {
      question: "Which country is the native home of the Kangaroo?",
      options: ["South Africa", "New Zealand", "Australia", "India"],
      correct: 2
    },
    {
      question: "How many bones are in an adult human body?",
      options: ["106", "206", "306", "406"],
      correct: 1
    },
    {
      question: "Which planet in our solar system is the largest?",
      options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
      correct: 2
    },
    {
      question: "Who painted the famous artwork 'Mona Lisa'?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Leonardo da Vinci"],
      correct: 3
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      correct: 2
    },
    {
      question: "Which gas do plants absorb for photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon Dioxide"],
      correct: 3
    },
    {
      question: "What is the capital city of Italy?",
      options: ["Rome", "Milan", "Venice", "Florence"],
      correct: 0
    },
    {
      question: "In which year did the Titanic sink?",
      options: ["1905", "1912", "1920", "1935"],
      correct: 1
    },
    {
      question: "Which ocean is located between Europe and North America?",
      options: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"],
      correct: 2
    },
    {
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "14"],
      correct: 2
    },
    {
      question: "Who is credited with designing the Analytical Engine (first computer)?",
      options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Ada Lovelace"],
      correct: 1
    },
    {
      question: "What is the main ingredient in traditional guacamole?",
      options: ["Tomato", "Avocado", "Onion", "Lime"],
      correct: 1
    }
  ],
  hard: [
    {
      question: "What is the approximate speed of light in a vacuum?",
      options: ["150,000 km/s", "300,000 km/s", "450,000 km/s", "600,000 km/s"],
      correct: 1
    },
    {
      question: "Which ancient civilization first introduced paper money?",
      options: ["Egyptians", "Romans", "Greeks", "Chinese"],
      correct: 3
    },
    {
      question: "What is the rarest natural blood type in humans?",
      options: ["O Negative", "AB Negative", "A Positive", "B Positive"],
      correct: 1
    },
    {
      question: "Who discovered Penicillin in 1928?",
      options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Gregor Mendel"],
      correct: 0
    },
    {
      question: "What is the capital city of Australia?",
      options: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
      correct: 3
    },
    {
      question: "Which chemical element has the atomic number 79?",
      options: ["Silver", "Platinum", "Gold", "Mercury"],
      correct: 2
    },
    {
      question: "How many hearts does an octopus have?",
      options: ["1", "2", "3", "4"],
      correct: 2
    },
    {
      question: "Which treaty officially ended World War I in 1919?",
      options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Utrecht", "Treaty of Geneva"],
      correct: 0
    },
    {
      question: "What is the name of the nearest spiral galaxy to the Milky Way?",
      options: ["Andromeda Galaxy", "Triangulum Galaxy", "Sombrero Galaxy", "Pinwheel Galaxy"],
      correct: 0
    },
    {
      question: "Who was the first woman to win a Nobel Prize?",
      options: ["Jane Addams", "Mother Teresa", "Marie Curie", "Rosalind Franklin"],
      correct: 2
    },
    {
      question: "What is the chemical formula for table salt?",
      options: ["HCl", "NaOH", "KOH", "NaCl"],
      correct: 3
    },
    {
      question: "Which country has the most natural lakes in the world?",
      options: ["United States", "Canada", "Russia", "Brazil"],
      correct: 1
    },
    {
      question: "What is the most abundant gas in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correct: 2
    },
    {
      question: "What is the average time complexity of searching a sorted array using Binary Search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 1
    },
    {
      question: "Which planet in our solar system rotates clockwise (retrograde) on its axis?",
      options: ["Mars", "Venus", "Jupiter", "Neptune"],
      correct: 1
    }
  ]
};
// --- Application State ---
const state = {
  numQuestions: 5,
  difficulty: "easy",
  activeQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  hasAnswered: false
};
// --- DOM Elements ---
const DOM = {
  // Screens
  screenHome: document.getElementById("screen-home"),
  screenSetup: document.getElementById("screen-setup"),
  screenQuiz: document.getElementById("screen-quiz"),
  screenResults: document.getElementById("screen-results"),
  // Buttons
  btnStartProject: document.getElementById("btn-start-project"),
  btnBeginQuiz: document.getElementById("btn-begin-quiz"),
  btnNext: document.getElementById("btn-next"),
  btnPlayAgain: document.getElementById("btn-play-again"),
  // Selection Groups
  countGroup: document.getElementById("count-group"),
  difficultyGroup: document.getElementById("difficulty-group"),
  // Quiz HUD & Info
  currentQuestionNum: document.getElementById("current-question-num"),
  totalQuestionsNum: document.getElementById("total-questions-num"),
  progressBar: document.getElementById("quiz-progress-bar"),
  questionText: document.getElementById("question-text"),
  optionsContainer: document.getElementById("options-container"),
  feedbackContainer: document.getElementById("feedback-container"),
  feedbackStatus: document.getElementById("feedback-status"),
  feedbackText: document.getElementById("feedback-text"),
  // Results Screen Info
  finalPercentage: document.getElementById("final-percentage"),
  finalFraction: document.getElementById("final-fraction")
};
// --- Helper Functions ---
function showScreen(screenToShow) {
  const screens = [DOM.screenHome, DOM.screenSetup, DOM.screenQuiz, DOM.screenResults];
  screens.forEach(screen => {
    if (screen) {
      screen.classList.remove("active");
      screen.classList.add("hidden");
    }
  });
  if (screenToShow) {
    screenToShow.classList.remove("hidden");
    screenToShow.classList.add("active");
  }
}
// Utility to shuffle array elements
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
// --- Initializing Event Listeners ---
// Transition from Home to Setup
DOM.btnStartProject.addEventListener("click", () => {
  showScreen(DOM.screenSetup);
});
// Setup pills selection handlers
DOM.countGroup.querySelectorAll(".pill").forEach(button => {
  button.addEventListener("click", () => {
    DOM.countGroup.querySelectorAll(".pill").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    state.numQuestions = parseInt(button.dataset.count, 10);
  });
});
DOM.difficultyGroup.querySelectorAll(".pill").forEach(button => {
  button.addEventListener("click", () => {
    DOM.difficultyGroup.querySelectorAll(".pill").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    state.difficulty = button.dataset.difficulty;
  });
});
// Begin Quiz from Setup Screen
DOM.btnBeginQuiz.addEventListener("click", () => {
  // Get and shuffle questions list for selected difficulty
  const rawQuestions = QUESTIONS[state.difficulty];
  const shuffledQuestions = shuffleArray(rawQuestions);
  // Slice to the requested number of questions
  state.activeQuestions = shuffledQuestions.slice(0, state.numQuestions);
  state.currentQuestionIndex = 0;
  state.score = 0;
  
  showScreen(DOM.screenQuiz);
  loadQuestion();
});
// Load the current question
function loadQuestion() {
  state.hasAnswered = false;
  const currentQuestion = state.activeQuestions[state.currentQuestionIndex];
  
  // Update HUD values
  DOM.currentQuestionNum.textContent = state.currentQuestionIndex + 1;
  DOM.totalQuestionsNum.textContent = state.numQuestions;
  
  // Progress Bar width
  const progressPercent = ((state.currentQuestionIndex) / state.numQuestions) * 100;
  DOM.progressBar.style.width = `${progressPercent}%`;
  // Set Question Text
  DOM.questionText.textContent = currentQuestion.question;
  // Clear options and hide next button & feedback
  DOM.optionsContainer.innerHTML = "";
  DOM.feedbackContainer.classList.add("hidden");
  DOM.btnNext.classList.add("hidden");
  // Create option buttons
  currentQuestion.options.forEach((optionText, index) => {
    const optionButton = document.createElement("button");
    optionButton.className = "option-btn";
    optionButton.textContent = optionText;
    optionButton.addEventListener("click", () => handleAnswerSelect(index));
    DOM.optionsContainer.appendChild(optionButton);
  });
}
// Handle answer selection
function handleAnswerSelect(selectedIndex) {
  if (state.hasAnswered) return;
  state.hasAnswered = true;
  const currentQuestion = state.activeQuestions[state.currentQuestionIndex];
  const isCorrect = (selectedIndex === currentQuestion.correct);
  
  const optionButtons = DOM.optionsContainer.querySelectorAll(".option-btn");
  
  // Disable all buttons to prevent clicking other options
  optionButtons.forEach(btn => btn.disabled = true);
  const questionIndexNum = state.currentQuestionIndex + 1;
  if (isCorrect) {
    state.score++;
    optionButtons[selectedIndex].classList.add("correct");
    DOM.feedbackStatus.textContent = `Question ${questionIndexNum}: Correct!`;
    DOM.feedbackStatus.className = "feedback-status correct-text";
    DOM.feedbackText.textContent = "Great job! You got it right.";
  } else {
    optionButtons[selectedIndex].classList.add("wrong");
    optionButtons[currentQuestion.correct].classList.add("correct");
    DOM.feedbackStatus.textContent = `Question ${questionIndexNum}: Incorrect!`;
    DOM.feedbackStatus.className = "feedback-status wrong-text";
    DOM.feedbackText.textContent = `The correct answer was: ${currentQuestion.options[currentQuestion.correct]}`;
  }
  
  // Show feedback container and next button
  DOM.feedbackContainer.classList.remove("hidden");
  DOM.btnNext.classList.remove("hidden");
  
  if (state.currentQuestionIndex === state.numQuestions - 1) {
    DOM.btnNext.textContent = "See Results";
  } else {
    DOM.btnNext.textContent = "Next Question";
  }
}

// Next button click handler
DOM.btnNext.addEventListener("click", () => {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex < state.numQuestions) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Show final results screen
function showResults() {
  showScreen(DOM.screenResults);
  const percentage = Math.round((state.score / state.numQuestions) * 100);
  DOM.finalPercentage.textContent = `${percentage}%`;
  DOM.finalFraction.textContent = `You answered ${state.score} out of ${state.numQuestions} questions correctly.`;
}

// Play Again button click handler
DOM.btnPlayAgain.addEventListener("click", () => {
  showScreen(DOM.screenSetup);
});
