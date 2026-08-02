document.addEventListener('DOMContentLoaded', () => {
  const scheduleBtn = document.querySelector('.hero__btn');
  const scheduleBlock = document.querySelector('.excursion__schedule');

  scheduleBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    scheduleBlock?.scrollIntoView({ behavior: 'smooth' });
  });

  const form = document.querySelector('.excursion-selector');
  const dateFrom = document.getElementById('date-from');
  const dateTo = document.getElementById('date-to');

  if (typeof flatpickr !== 'undefined' && dateFrom && dateTo) {
    const pickerTo = flatpickr(dateTo, {
      disableMobile: true,
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

  // карусель

  document.addEventListener('click', function (e) {
    const link = e.target.closest('.excursion__review-more');
    if (!link) return;

    e.preventDefault();

    const card = link.closest('.excursion__reviews-card');
    if (!card) return;

    const reviewText = card.querySelector('.excursion__review-text');
    if (!reviewText) return;

    const photo = card.querySelector('.excursion__review-photo');

    if (!reviewText.dataset.shortHtml) {
      reviewText.dataset.shortHtml = reviewText.innerHTML;
    }

    const isExpanded = reviewText.classList.toggle('is-expanded');

    if (isExpanded) {
      reviewText.textContent = reviewText.dataset.fullText;
      link.textContent = 'свернуть';

      if (photo) photo.style.marginBottom = '20px';
    } else {
      reviewText.innerHTML = reviewText.dataset.shortHtml;
      link.textContent = 'далее...';

      if (photo) photo.style.marginBottom = '';
      if (card) card.style.paddingBottom = '';
    }
  });

  const reviewsBox = document.querySelector('.excursion__reviews-box');
  const btnPrev = document.querySelector('.excursion__reviews-btn--prev');
  const btnNext = document.querySelector('.excursion__reviews-btn--next');

  if (reviewsBox && btnPrev && btnNext) {
    const originalCards = Array.from(reviewsBox.querySelectorAll('.excursion__reviews-card'));

    if (originalCards.length > 0) {
      let isCloned = false;
      let currentPosition = 0;

      const initClonesOnce = () => {
        if (!isCloned) {
          originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            reviewsBox.appendChild(clone);
          });
          isCloned = true;
        }
      };

      btnNext.addEventListener('click', function () {
        if (currentPosition === 0) {
          initClonesOnce();
          currentPosition = 1;

          const gap = parseFloat(window.getComputedStyle(reviewsBox).gap) || 24;
          const cardWidth = originalCards[0].offsetWidth + gap;

          reviewsBox.scrollTo({
            left: currentPosition * cardWidth,
            behavior: 'smooth'
          });
        }
      });

      btnPrev.addEventListener('click', function () {
        if (currentPosition === 1) {
          currentPosition = 0;

          const gap = parseFloat(window.getComputedStyle(reviewsBox).gap) || 24;
          const cardWidth = originalCards[0].offsetWidth + gap;

          reviewsBox.scrollTo({
            left: currentPosition * cardWidth,
            behavior: 'smooth'
          });
        }
      });
    }
  }

  const burgerBtn = document.querySelector('.header__burger');
  const menuList = document.querySelector('.menu');

  if (burgerBtn && menuList) {
    burgerBtn.addEventListener('click', () => {
      menuList.classList.toggle('open');
      burgerBtn.classList.toggle('active');
    });
  }

});