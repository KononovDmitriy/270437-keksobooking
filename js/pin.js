'use strict';

(function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  function createdomElement(pinEl) {
    var domElementAttributs = {
      DIV_CLASS: 'pin',
      IMG_CLASS: 'rounded',
      IMG_WIDTH: '40',
      IMG_HEIGHT: '40'
    };
    var pin = {
      WIDTH: 56,
      HEIGHT: 75
    };

    var pinBaloon = document.createElement('div');
    var userAvatar = document.createElement('img');

    pinBaloon.classList.add(domElementAttributs.DIV_CLASS);
    pinBaloon.style.left = (pinEl.location.x - (pin.WIDTH / 2)) + 'px';
    pinBaloon.style.top = (pinEl.location.y - pin.HEIGHT) + 'px';
    pinBaloon.setAttribute('tabindex', 0);
    userAvatar.src = pinEl.author.avatar;
    userAvatar.className = domElementAttributs.IMG_CLASS;
    userAvatar.width = domElementAttributs.IMG_WIDTH;
    userAvatar.height = domElementAttributs.IMG_HEIGHT;
    pinBaloon.appendChild(userAvatar);

    return pinBaloon;
  }

  function appenddomElement(domElement) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(domElement);
    tokyoPinMap.appendChild(fragment);
  }

  function drawPin(pinEl) {
    var domElement = createdomElement(pinEl);
    appenddomElement(domElement);

    return domElement;
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
    drawPin: drawPin
  };
})();
