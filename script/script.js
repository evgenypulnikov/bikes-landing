/* Slider Vars */

const slider = document.querySelector('.slider');
const sliderTexts = slider.querySelectorAll('.slider__text');
const carousel = slider.querySelector('.slider__slides');
const slides = slider.querySelectorAll('.slider__slide');
const activeSlide = slider.querySelector('.slider__slide_is_active');
const prevBtn = slider.querySelector('.slider__button_to_left');
const nextBtn = slider.querySelector('.slider__button_to_right');
let slideIndex = 1;

/* Tabs Vars */

const tabs = document.querySelectorAll('.bikes__tab');
const activeTab = document.querySelector('.bikes__tab_is_active');
const bikesSlides = document.querySelectorAll('.bikes__slide');
const activeBIkesSlide = document.querySelector('.bikes__slide_is_active');

/* Form Vars */

const subscribeForm = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const formSubmit = document.querySelector('.form__input-submit');

/* Animated Elements */

const animBtn = document.querySelector('.button');

/* Theme Vars */

const themeToggler = document.querySelector('.theme-toggler__checkbox');
const themeElements = document.querySelectorAll('.page, .header, .header__nav-link, .title, .paragraph, .intro__tip, .quote__cite, .quote__author, .quote__underline, .slider__button, .bikes__tab, .bikes__tab_is_active, .bikes__name, .apps__link, .footer, .footer__title, .footer__copyright, .theme-toggler, .form__input, .form__input-submit, .form__input-submit_is_hidden');
const themeElementsAnim = document.querySelectorAll('.page, .header, .footer, .footer__copyright, .form__input, .form__input-submit, .form__input-submit_is_hidden');

/* ___ Add Anim */

animBtn.addEventListener('mouseover', function() {
  animBtn.classList.add('button_is_animated');
  animBtn.removeEventListener('mouseover', function() {
  });
});

/* ___ 1. Slider */

function slidesMoving(n) {
  if (n < 1) {
    slideIndex = sliderTexts.length;
  } else if (n > sliderTexts.length) {
    slideIndex = 1;
  }
  for (let i = 0; i < sliderTexts.length; i++) {
    sliderTexts[i].classList.remove('slider__text_is_active');
    slides[i].classList.remove('slider__slide_is_active');
    slides[i].classList.remove('slider__slide_is_next');
  }
  sliderTexts[slideIndex - 1].classList.add('slider__text_is_active');
  slides[slideIndex - 1].classList.add('slider__slide_is_active');
  if (slideIndex < slides.length) {
    slides[slideIndex].classList.add('slider__slide_is_next');
  }
}

function slidesCounter(n) {
  slidesMoving(slideIndex += n);
}

prevBtn.addEventListener('click', function() {
  slidesCounter(-1);
});

nextBtn.addEventListener('click', function() {
  slidesCounter(1);
});

/* ___ 2.Tabs */

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function(evt) {
    if (activeTab) {
      document.querySelector('.bikes__tab_is_active').classList.remove('bikes__tab_is_active');
    }
    evt.target.classList.add('bikes__tab_is_active');
    if (activeBIkesSlide) {
      document.querySelector('.bikes__slide_is_active').classList.remove('bikes__slide_is_active');
    }
    bikesSlides[i].classList.add('bikes__slide_is_active');
  });
}

/* ___ 3. Subscribe Form */

formInput.addEventListener('focus', function() {
  formSubmit.classList.remove('form__input-submit_is_hidden');
});

formInput.addEventListener('focusout', function() {
  formSubmit.classList.add('form__input-submit_is_hidden');
});

subscribeForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  if (formInput.value.length > 1) {
    formInput.value = 'Круто!';
    formSubmit.classList.add('form__input-submit_is_hidden');
  }
});

/* ___ 4. Theme Toggler */

themeToggler.addEventListener('change', function() {
  if (this.checked) {
    themeElements.forEach(function(element) {
      let elementClass;
      if (element.classList.length === 1) {
        elementClass = element.classList[0] += ' ' + element.classList[0] + '_theme_dark';
        element.className = elementClass;
      } else {
        elementClass = element.classList[0] += ' ' + element.classList[0] + '_theme_dark' + ' ' + element.classList[1];
        element.className = elementClass;
      }
    });
    themeElementsAnim.forEach(function(element) {
      element.style.transition = 'border 0.4s ease, color 0.4s ease, background-color 0.4s ease, opacity 0.4s ease, visibility 0.4s ease';
    });
  } else {
    themeElements.forEach(function(element) {
      let elementClass = element.classList;
      elementClass.forEach(function(item) {
        if (item.indexOf('_theme_dark') !== -1) {
          elementClass.remove(item);
        }
      });
    });
  }
});
