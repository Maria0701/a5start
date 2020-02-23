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
