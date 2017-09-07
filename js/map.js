'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var ads = window.data.arrayData();
  var html = document.querySelector('html');

  window.card.hideDialog();
  addDialogCloseHandler();

  ads.forEach(function (value, index) {
    var pinBaloon = window.pin.drawPin(value);
    pinAddHandler(pinBaloon, index);
  });

  function openCard(index, element) {
    window.card.showDialog(ads, index);
    window.pin.togglePin(element);
  }

  function closeCard() {
    window.card.hideDialog();
    window.pin.togglePin();
  }

  function pinAddHandler(pin, index) {
    pin.addEventListener('click', pinClickHandler.bind(null, index));
    pin.addEventListener('keydown', pinKeydownHandler.bind(null, index));
  }

  function pinClickHandler(index, evt) {
    openCard(index, evt.currentTarget);
  }

  function pinKeydownHandler(index, evt) {
    if (evt.keyCode === keyCode.ENTER) {
      openCard(index, evt.currentTarget);
    }
  }

  function htmlKeydownHandler(evt) {
    if (evt.keyCode === keyCode.ESC &&
        !window.card.offerDialogEl.classList.contains('hidden')) {
      closeCard();
    }
  }

  function addDialogCloseHandler() {
    window.card.dialogCloseEl.addEventListener('click',
        dialogCloseClickHandler);
    html.addEventListener('keydown',
        htmlKeydownHandler);
  }

  function dialogCloseClickHandler(evt) {
    evt.preventDefault();
    closeCard();
  }
})();
