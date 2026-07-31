document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.excursion-selector');
  const dateFrom = document.getElementById('date-from');
  const dateTo = document.getElementById('date-to');

  if (typeof flatpickr !== 'undefined' && dateFrom && dateTo) {
    const pickerTo = flatpickr(dateTo, {
      locale: 'ru',
      dateFormat: 'd.m.Y',
      minDate: 'today'
    });

    const pickerFrom = flatpickr(dateFrom, {
      locale: 'ru',
      dateFormat: 'd.m.Y',
      minDate: 'today',
      onChange: (dates, dateStr) => pickerTo.set('minDate', dateStr)
    });
    
    document.querySelectorAll('.excursion-selector__wrapper').forEach(wrapper => {
      const input = wrapper.querySelector('.excursion-selector__input--date');

      wrapper.addEventListener('click', () => {
        if (input && input._flatpickr) {
          input._flatpickr.open();
        }
      });
    });
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.log(data);
  });

  const moreLinks = document.querySelectorAll('.excursion__review-more');

  moreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const reviewText = link.previousElementSibling;
      if (!reviewText) return;

      const card = link.closest('.excursion__reviews-card');
      const photo = card?.querySelector('.excursion__review-photo');

      if (!reviewText.dataset.shortText) {
        reviewText.dataset.shortText = reviewText.textContent.trim();
      }

      const isExpanded = reviewText.classList.toggle('is-expanded');

      if (isExpanded) {
        reviewText.textContent = reviewText.dataset.fullText;
        link.textContent = 'свернуть';

        if (photo) photo.style.marginBottom = '20px';
      } else {
        reviewText.textContent = reviewText.dataset.shortText;
        link.textContent = 'далее...';

        if (photo) photo.style.marginBottom = '';
        if (card) card.style.paddingBottom = '';
      }
    });
  });

  const scheduleBtn = document.querySelector('.hero__btn');
  const scheduleBlock = document.querySelector('.excursion__schedule');

  scheduleBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    scheduleBlock?.scrollIntoView({ behavior: 'smooth' });
  });

  // слайдер

  const reviewsBox = document.querySelector('.excursion__reviews-box');
  const btnPrev = document.querySelector('.excursion__reviews-btn--prev');
  const btnNext = document.querySelector('.excursion__reviews-btn--next');
  const cards = document.querySelectorAll('.excursion__reviews-card');

  if (!reviewsBox || !btnPrev || !btnNext || cards.length === 0) {
    console.error('Elements were not found!');
    return;
  }

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    reviewsBox.appendChild(clone);
  });

  const totalCards = cards.length;
  const cardWidth = cards[0].offsetWidth + 24;
  let currentPosition = 0;

  let lastClicked = null;

  btnPrev.addEventListener('click', function () {
    if (lastClicked === 'prev') return;

    currentPosition = (currentPosition - 1 + totalCards) % totalCards;
    const scrollToPosition = currentPosition * cardWidth;

    reviewsBox.scrollTo({
      left: scrollToPosition,
      behavior: 'smooth'
    });

    lastClicked = 'prev';
  });

  btnNext.addEventListener('click', function () {
    if (lastClicked === 'next') return;

    currentPosition = (currentPosition + 1) % totalCards;
    const scrollToPosition = currentPosition * cardWidth;

    reviewsBox.scrollTo({
      left: scrollToPosition,
      behavior: 'smooth'
    });

    lastClicked = 'next';
  });
})