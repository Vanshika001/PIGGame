'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const p1CurrentScore = document.getElementById('current--0');
const p2CurrentScore = document.getElementById('current--1');
const scoreElements = document.querySelectorAll('.score');
const btnHold = document.querySelector('.btn--hold');
const btnRolled = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
let isPlaying, currentScore, scores, activePlayer;

const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  isPlaying = true;

  for (let i = 0; i < scoreElements.length; i++) {
    scoreElements[i].textContent = 0;
  }

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  dice.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  dice.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRolled.addEventListener('click', function () {
  if (isPlaying) {
    dice.classList.remove('hidden');
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomNumber}.png`;

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      isPlaying = false;
      dice.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
