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
  var footerButtons = document.querySelectorAll('.footer__button ');
  var closeAllButtons = function () {
    footerButtons.forEach(function (button) {
      if (!button.classList.contains('js-closed')) {
        button.classList.add('js-closed');
        button.nextElementSibling.style.maxHeight = null;
      }
    });
  };

  footerButtons.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      var infoElement = item.nextElementSibling;
console.log(infoElement.scrollHeight);
      if (!item.classList.contains('js-closed')) {
        item.classList.add('js-closed');
        infoElement.style.maxHeight = null;
        return;
      }

      closeAllButtons();
      item.classList.remove('js-closed');
      infoElement.style.maxHeight = infoElement.scrollHeight + 'px';
    });
  });

}());
