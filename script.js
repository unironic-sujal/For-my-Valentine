const steps = document.querySelectorAll('.step[data-step]');
const dots = document.querySelectorAll('.progress-dots .dot');

const audio = document.getElementById('bgMusic');
let musicStarted = false;
function startBackgroundMusic() {
  if (musicStarted) return;
  musicStarted = true;
  audio.volume = 0.6;
  audio.muted = false;
  audio.play().catch(function () { });
}
audio.muted = true;
audio.play().then(function () {
  audio.muted = false;
  musicStarted = true;
  audio.volume = 0.6;
}).catch(function () { });
document.addEventListener('click', startBackgroundMusic, { once: true });
document.addEventListener('touchstart', startBackgroundMusic, { once: true });
document.addEventListener('keydown', startBackgroundMusic, { once: true });

const totalSteps = 7;
let currentStep = 1;
let noClicks = 0;
let noClickStage = 0;
let currentQuizIndex = 0;

const quizQuestions = [
  {
    question: "1. If x = 2 and y = 1, then what is x + y?",
    options: [
      {
        text: "3",
        feedback: "einstein ji is that you?"
      },
      {
        text: "21",
        feedback: "einstein ji is that you?"
      },
      {
        text: "xy",
        feedback: "einstein ji is that you?"
      },
      {
        text: "i'm a humanities student ☺️",
        feedback: "It's okay baby, happens to the best ☺️"
      }
    ]
  },
  {
    question: "2. How many months have 28 days?",
    options: [
      {
        text: "1",
        feedback: "Correct. Look at you being all clever."
      },
      {
        text: "12",
        feedback: "Correct. Look at you being all clever."
      },
      {
        text: "February",
        feedback: "Close enough, I'll allow it."
      }
    ]
  },
  {
    question: "3. What color is a mirror?",
    options: [
      {
        text: "Silver",
        feedback: "Science would be proud of you."
      },
      {
        text: "Transparent",
        feedback: "Science would be proud of you."
      },
      {
        text: "Government secret",
        feedback: "This is the only answer I trust, actually."
      }
    ]
  },
  {
    question: "4. Are you enjoying this quiz?",
    options: [
      {
        text: "Yes",
        feedback: "my bebu is so smart fr"
      },
      {
        text: "Yes",
        feedback: "my bebu is so smart fr"
      },
      {
        text: "Yes",
        feedback: "my bebu is so smart fr"
      },
      {
        text: "Yes",
        feedback: "my bebu is so smart fr"
      }
    ]
  },
  {
    question: "5. Be honest, this quiz is:",
    options: [
      {
        text: "Cute",
        feedback: "You’re cute for thinking that."
      },
      {
        text: "Stupid",
        feedback: "owkay yawr, im toda sa dumb so no surprise"
      },
      {
        text: "Both",
        feedback: "The only truly accurate option."
      },
      {
        text: "Made by someone who likes you a lottttttttttttttttttttttttttttttttttt",
        feedback: "The only truly accurate option."
      }
    ]
  }
];

function renderQuizQuestion() {
  const q = quizQuestions[currentQuizIndex];
  const questionEl = document.getElementById('quizQuestionText');
  const optionsEl = document.getElementById('quizOptions');
  const noteEl = document.getElementById('quizProgressNote');
  const feedbackEl = document.getElementById('quizFeedback');

  if (!questionEl || !optionsEl || !noteEl || !feedbackEl) return;

  questionEl.innerHTML = `<h3>${q.question}</h3>`;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.onclick = function () {
      // show playful feedback below the options
      feedbackEl.style.opacity = 0;
      setTimeout(() => {
        feedbackEl.textContent = opt.feedback;
        feedbackEl.style.opacity = 1;
      }, 80);

      // disable clicks while we move to the next question
      const allButtons = optionsEl.querySelectorAll('button.quiz-option');
      allButtons.forEach(b => b.disabled = true);

      setTimeout(() => {
        currentQuizIndex++;
        if (currentQuizIndex >= quizQuestions.length) {
          currentQuizIndex = 0;
          goToStep(6);
        } else {
          renderQuizQuestion();
        }
      }, 1100);
    };
    optionsEl.appendChild(btn);
  });

  noteEl.textContent = `Question ${currentQuizIndex + 1} of ${quizQuestions.length}`;
}

function goToStep(stepNum) {
  steps.forEach((el) => {
    const num = parseInt(el.getAttribute('data-step'), 10);
    if (num === stepNum) {
      el.classList.remove('hidden');
      el.classList.add('active');
    } else {
      el.classList.add('hidden');
      el.classList.remove('active');
    }
  });

  dots.forEach((dot) => {
    const d = parseInt(dot.getAttribute('data-step'), 10);
    dot.classList.remove('active', 'done');
    if (d < stepNum) dot.classList.add('done');
    if (d === stepNum) dot.classList.add('active');
  });

  if (stepNum <= 7) {
    document.getElementById('progressDots').style.display = 'flex';
  }
  if (stepNum === 8) {
    document.getElementById('progressDots').style.display = 'none';
  }

  currentStep = stepNum;
  if (stepNum === 5) {
    currentQuizIndex = 0;
    renderQuizQuestion();
  }
}

function nextStep(stepNum) {
  goToStep(stepNum);
}

function sayYes() {
  goToStep(8);
  triggerConfetti();
}

function triggerConfetti() {
  const colors = ['#e8a0a8', '#c76b7a', '#d4a574', '#f5d0d5'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = Math.random() * 0.5 + 's';
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3500);
    }, i * 40);
  }
}

const btnNo = document.getElementById('btnNo');
if (btnNo) {
  btnNo.addEventListener('click', function () {
    if (noClickStage === 0) {
      this.textContent = 'Are you sure?';
      noClickStage = 1;
    } else if (noClickStage === 1) {
      this.textContent = 'Not allowed hehe';
      noClickStage = 2;
    } else if (noClickStage === 2) {
      if (typeof sayYes === 'function') {
        // If sayYes isn't defined here (it is above), this is safe
      }
      this.textContent = 'Yes 💖';
      noClickStage = 3;
    } else if (noClickStage === 3) {
      sayYes();
    }
  });
}
