'use strict';
(function () {
  var elementToClip = document.querySelector('.js-clip');
  var textSize = 439;
  var tabletScreen = 768;
  var elipsis = '...';
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
  var popupOpeners = document.querySelectorAll('.js-popup-open');
  var popupBlock = document.querySelector('.popup');
  var popupCloser = popupBlock.querySelector('.popup__close');
  var overlayBlock = document.querySelector('.overlay');
  var ESCAPE_BUTTON = 27;

  var popupCloseHandler = function (evt) {
    evt.preventDefault();
    popupBlock.classList.remove('js-popup-show');
    overlayBlock.removeEventListener('click', popupCloseHandler);
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESCAPE_BUTTON) {
      popupCloseHandler(evt);
    }
  };

  var popupHandler = function (evt) {
    evt.preventDefault();
    popupBlock.classList.add('js-popup-show');
    popupCloser.addEventListener('click', popupCloseHandler);
    overlayBlock.addEventListener('click', popupCloseHandler);
    document.addEventListener('keydown', popupEscPressHandler);
  };

  popupOpeners.forEach(function (item) {
    item.addEventListener('click', popupHandler);
  });
}());
