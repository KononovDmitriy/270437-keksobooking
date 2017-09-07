'use strict';

(function () {

  var clickCollback;
  var keydownCollback;

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  function createDomElements(ads) {
    var domElementsAttributs = {
      DIV_CLASS: 'pin',
      IMG_CLASS: 'rounded',
      IMG_WIDTH: '40',
      IMG_HEIGHT: '40'
    };
    var pin = {
      WIDTH: 56,
      HEIGHT: 75
    };

    var domElements = [];

    ads.forEach(function (value, index) {
      var pinBaloon = document.createElement('div');
      var userAvatar = document.createElement('img');
      pinBaloon.classList.add(domElementsAttributs.DIV_CLASS);
      pinBaloon.style.left = (value.location.x - (pin.WIDTH / 2)) + 'px';
      pinBaloon.style.top = (value.location.y - pin.HEIGHT) + 'px';
      pinBaloon.setAttribute('tabindex', 0);
      userAvatar.src = value.author.avatar;
      userAvatar.className = domElementsAttributs.IMG_CLASS;
      userAvatar.width = domElementsAttributs.IMG_WIDTH;
      userAvatar.height = domElementsAttributs.IMG_HEIGHT;
      pinBaloon.appendChild(userAvatar);

      domElements[index] = pinBaloon;

      pinAddHandler(pinBaloon, index);
    });

    return domElements;
  }

  function appendDomElements(domElements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < domElements.length; i++) {
      fragment.appendChild(domElements[i]);
    }
    tokyoPinMap.appendChild(fragment);
  }

  function drawPins(ads, extClickCollback, extKeydownCollback) {
    clickCollback = extClickCollback;
    keydownCollback = extKeydownCollback;
    var domElements = createDomElements(ads);
    appendDomElements(domElements);
  }

  function pinAddHandler(pin, index) {
    pin.addEventListener('click', pinClickHandler.bind(null, index));
    pin.addEventListener('keydown', pinKeydownHandler.bind(null, index));
  }

  function pinClickHandler(index, evt) {
    clickCollback(index, evt.currentTarget);
  }

  function pinKeydownHandler(index, evt) {
    keydownCollback(index, evt.currentTarget, evt.keyCode);
  }

  function togglePin(currentPin) {
    var activeElement = tokyoPinMap.querySelector('.pin--active');
    if (activeElement) {
      activeElement.classList.remove('pin--active');
    }
    if (currentPin) {
      currentPin.classList.add('pin--active');
    }
  }

  window.pin = {
    togglePin: togglePin,
    drawPins: drawPins
  };
})();
