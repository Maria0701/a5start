'use strict';
(function () {
  var elementToClip = document.querySelector('.js-clip');
  var textSize = 439;
  var tabletScreen = 1023;
  var elipsis = '..';
  var text = elementToClip.innerHTML;
  if (text.length > textSize && screen.width <= tabletScreen) {
    text = text.substr(0, textSize);
    elementToClip.innerHTML = text + elipsis;
  }
}());

(function () {
  var footerButtons = document.querySelectorAll('.footer__button');
  var closeAllButtons = function () {
    footerButtons.forEach(function (button) {
      if (!button.classList.contains('js-closed')) {
        button.classList.add('js-closed');
        button.nextElementSibling.classList.add('js-hidden');
      }
    });
  };

  footerButtons.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      var infoElement = item.nextElementSibling;
      if (!item.classList.contains('js-closed')) {
        item.classList.add('js-closed');
        infoElement.classList.add('js-hidden');
        return;
      }

      closeAllButtons();
      item.classList.remove('js-closed');
      infoElement.classList.remove('js-hidden');
    });
  });
}());

(function () {
  window.maskPhoneNumper = function (formBlock, hide) {
    var MAIN_KEYCODES = {
      BACKSPACE: 8,
      LEFT_ARROW: 37,
      RIGHT_ARROW: 39,
      DELETE: 46,
    };

    var phoneField = formBlock.querySelector('.js-phone');
    var textField = formBlock.querySelector('.form__textarea');
    var enterFirstLetters = function (evt) {
      evt.preventDefault();
      phoneField.value = '+7 (';

      phoneField.removeEventListener('keydown', enterFirstLetters);
      phoneField.removeEventListener('click', enterFirstLetters);

      var oldValueLength = phoneField.value.length;
      phoneField.addEventListener('keydown', function (pressedKey) {
        if (!((pressedKey.key >= 0 && pressedKey.key <= 9) || pressedKey.keyCode === MAIN_KEYCODES.BACKSPACE || pressedKey.keyCode === MAIN_KEYCODES.DELETE || pressedKey.keyCode === MAIN_KEYCODES.LEFT_ARROW || pressedKey.keyCode === MAIN_KEYCODES.RIGHT_ARROW)) {
          pressedKey.preventDefault();
        }

        var currentLength = phoneField.value.length;
        if (currentLength < oldValueLength) {
          oldValueLength--;
          return;
        }

        if (currentLength < 5) {
          phoneField.value = '+7 (';
        }

        if (currentLength === 7) {
          phoneField.value = phoneField.value + ') ';
        }

        if (currentLength === 12) {
          phoneField.value = phoneField.value + '-';
        }

        if (currentLength === 15) {
          phoneField.value = phoneField.value + '-';
        }

        if ((currentLength > 17) && pressedKey.keyCode !== MAIN_KEYCODES.BACKSPACE && pressedKey.keyCode !== MAIN_KEYCODES.DELETE && pressedKey.keyCode !== MAIN_KEYCODES.LEFT_ARROW && pressedKey.keyCode !== MAIN_KEYCODES.RIGHT_ARROW) {
          textField.focus();
        }

        oldValueLength++;
      });
    };

    phoneField.addEventListener('keydown', enterFirstLetters);
    phoneField.addEventListener('click', enterFirstLetters);

    if (hide) {
      phoneField.removeEventListener('keydown', enterFirstLetters);
      phoneField.removeEventListener('click', enterFirstLetters);
    }
  };
})();

(function () {
  var setCustomValidation = function (input) {
    var fieldValidate = input.validity;
    if (input.type !== 'submit' && input.type !== 'checkbox') {
      if (fieldValidate.valueMissing) {
        input.setCustomValidity('Заполните поле');
      } else if (fieldValidate.tooShort) {
        input.setCustomValidity('Мало букв');
      } else if (fieldValidate.tooLong) {
        input.setCustomValidity('Много букв');
      } else if (fieldValidate.patternMismatch) {
        input.setCustomValidity('не подходит по паттерну');
      } else {

        input.setCustomValidity('');
      }
    } else if (input.type === 'checkbox') {
      if (fieldValidate.valueMissing) {
        input.setCustomValidity('Согласитесь с правилами обработки данных');
      } else {
        input.setCustomValidity('');
      }
    }
  };

  window.formValidate = function (form, hide) {
    Array.from(form.elements).forEach(function (it) {
      if (hide) {
        it.removeEventListener('invalid', setCustomValidation(it));
        return;
      }
      it.addEventListener('invalid', setCustomValidation(it));
    });
  };
})();

(function () {
  window.elementInViewport = function (el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
    );
  };
})();

(function () {
  window.setLocalStorage = function (form) {
    var nameField = form.querySelector('[name=name]');
    var phoneField = form.querySelector('[name=phone]');
    var messageField = form.querySelector('[name=message]');
    var isStorageSupport = true;
    var storage = {
      name: '',
      phone: '',
      message: '',
    };

    try {
      storage.name = localStorage.getItem('nameField');
      storage.phone = localStorage.getItem('phoneField');
      storage.message = localStorage.getItem('messageField');
    } catch (err) {
      isStorageSupport = false;
    }

    form.addEventListener('submit', function () {
      window.formValidate(form, false);
      if (isStorageSupport) {
        localStorage.setItem('nameField', nameField.value);
        localStorage.setItem('phoneField', phoneField.value);
        localStorage.setItem('messageField', messageField.value);
      }
    });

    if (window.elementInViewport(form)) {
      if (!storage.name) {
        nameField.focus();
      }
      if (storage.name !== '') {
        nameField.value = storage.name;
        phoneField.focus();
      }
      if (storage.phone !== '') {
        phoneField.value = storage.phone;
        messageField.focus();
      }
      if (storage.message !== '') {
        messageField.value = storage.message;
      }
    }
  };
})();

(function () {
  var popupOpeners = document.querySelectorAll('.js-popup-open');
  var popupBlock = document.querySelector('.popup');
  var popupCloser = popupBlock.querySelector('.popup__close');
  var overlayBlock = document.querySelector('.overlay');
  var popupForm = popupBlock.querySelector('.popup__form');
  var ESCAPE_BUTTON = 27;

  var popupCloseHandler = function (evt) {
    evt.preventDefault();
    popupBlock.classList.remove('js-popup-show');
    overlayBlock.removeEventListener('click', popupCloseHandler);
    document.removeEventListener('keydown', popupEscPressHandler);
    window.maskPhoneNumper(popupForm, true);
    window.formValidate(popupForm, true);
    document.querySelector('body').classList.remove('no-scroll');
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESCAPE_BUTTON) {
      popupCloseHandler(evt);
    }
  };

  var popupHandler = function (evt) {
    evt.preventDefault();
    popupBlock.classList.add('js-popup-show');
    document.querySelector('body').classList.add('no-scroll');
    popupCloser.addEventListener('click', popupCloseHandler);
    overlayBlock.addEventListener('click', popupCloseHandler);
    document.addEventListener('keydown', popupEscPressHandler);
    window.maskPhoneNumper(popupForm, false);
    window.setLocalStorage(popupForm);
  };

  popupOpeners.forEach(function (item) {
    item.addEventListener('click', popupHandler);
  });
})();

(function () {
  var form = document.querySelector('.feedback__form');
  window.maskPhoneNumper(form, false);
  window.setLocalStorage(form);
})();

(function () {
  var FRAMES_COUNT = 20;
  var ANIMATION_TIME = 400;

  var scrollElements = document.querySelectorAll('.js-scroll');

  scrollElements.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();

      var coordY = document.querySelector(item.getAttribute('href'))
          .getBoundingClientRect().top;

      var scrollHandler = function () {
        var scrollBy = coordY / FRAMES_COUNT;
        if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
          window.scrollBy(0, scrollBy);
        } else {
          window.scrollTo(0, coordY);
          clearInterval(scrollerInterval);
        }
      };

      var scrollerInterval = setInterval(scrollHandler, ANIMATION_TIME / FRAMES_COUNT);
    });
  });
})();
