'use strict';

(function () {

  var domElementAttributs = {
    DIV_CLASS: 'pin',
    IMG_CLASS: 'rounded',
    IMG_WIDTH: '40',
    IMG_HEIGHT: '40'
  };
  var pinParameters = {
    WIDTH: 56,
    HEIGHT: 75
  };

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  function createPin(pin) {
    var pinBaloon = document.createElement('div');
    var userAvatar = document.createElement('img');

    pinBaloon.classList.add(domElementAttributs.DIV_CLASS);
    pinBaloon.style.left = (pin.location.x - (pinParameters.WIDTH / 2)) + 'px';
    pinBaloon.style.top = (pin.location.y - pinParameters.HEIGHT) + 'px';
    pinBaloon.setAttribute('tabindex', 0);
    userAvatar.src = pin.author.avatar;
    userAvatar.className = domElementAttributs.IMG_CLASS;
    userAvatar.width = domElementAttributs.IMG_WIDTH;
    userAvatar.height = domElementAttributs.IMG_HEIGHT;
    pinBaloon.appendChild(userAvatar);

    return pinBaloon;
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

  function hidePins() {
    var pins = tokyoPinMap.querySelectorAll('.pin:not(.pin__main)');
    var pinsArray = Array.prototype.slice.call(pins, 0);
    pinsArray.forEach(function (value) {
      value.remove();
    });
  }

  function pinAddHandler(pin, index, clickCallback) {
    pin.addEventListener('click', pinClickHandler.bind(null, index, clickCallback));
    pin.addEventListener('keydown', pinKeydownHandler.bind(null, index, clickCallback));
  }

  function pinClickHandler(index, clickCallback, evt) {
    clickCallback(evt.currentTarget, index);
  }

  function pinKeydownHandler(index, clickCallback, evt) {
    window.utils.isEnterEvent(evt, index, pinEnterCallback, clickCallback);
  }

  function pinEnterCallback(evt, index, clickCallback) {
    clickCallback(evt.currentTarget, index);
  }

  function getPin(value, index, clickCallback) {
    var pinBaloon = createPin(value);
    pinAddHandler(pinBaloon, index, clickCallback);
    return pinBaloon;
  }

  window.pin = {
    getPin: getPin,
    togglePin: togglePin,
    hidePins: hidePins
  };

})();
