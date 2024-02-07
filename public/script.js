var cards = document.querySelectorAll('.main__card--positioning');

cards.forEach((card) => {
  card.addEventListener('click', function() {
    console.log(card)
    card.classList.toggle('main__card--flip');
  });
});