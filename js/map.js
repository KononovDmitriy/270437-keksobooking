'use strict';

(function () {
  var ads = [];
  var pins = [];

  window.backend.load(loadSuccessCallback, loadErrorCallback);

  function loadSuccessCallback(response) {
    var pin;
    ads = response;
    ads.forEach(function (value) {
      pin = new window.Pin(value);
      pin.addPin();
      pin.pin.addEventListener('click',
          pinClickHandler.bind(null, pin, value));
      pins.push(pin);
    });
  }

  function pinClickHandler(pinBaloon, ad) {
    pins.forEach(function (pin) {
      pin.disablePin();
    });

    pinBaloon.enablePin();
    window.showCard.openCard(ad);
  }

  function loadErrorCallback(errorMessage) {
    window.utils.displayError(errorMessage);
  }

})();
