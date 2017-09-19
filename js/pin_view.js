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

  function Pin(ads) {
    this.pin = createPin(ads);
  }

  Pin.prototype = {
    enablePin: function () {
      this.pin.classList.add('pin--active');
    },
    disablePin: function () {
      this.pin.classList.remove('pin--active');
    },
    addPin: function () {
      tokyoPinMap.appendChild(this.pin);
    },
    removePin: function () {
      tokyoPinMap.removeChild(this.pin);
    }

  };

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

  window.Pin = Pin;

})();
