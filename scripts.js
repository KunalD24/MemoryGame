const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchedCards += 2;

  if (matchedCards === cards.length) {
    showWinningMessage();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function showWinningMessage() {
  Swal.fire({
    title: 'Congratulations!',
    text: 'You won!',
    icon: 'success',
    confirmButtonText: 'Restart',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    allowEnterKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}
window.addEventListener('DOMContentLoaded', (event) => {
  const audioElement = document.getElementById('bg-music');
  audioElement.play();
});