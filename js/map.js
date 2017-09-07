'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var ads = window.data.arrayData();

  window.card.hideDialog();
  window.card.addDialogCloseHandler(cardClickCollback, cardKeyDownCollback);
  window.pin.drawPins(ads, pinClickCollback, pinKeyDownCollback);


  function pinKeyDownCollback(index, element, key) {
    if (key === keyCode.ENTER) {
      window.card.showDialog(ads, index);
      window.pin.togglePin(element);
    }
  }

  function pinClickCollback(index, element) {
    window.card.showDialog(ads, index);
    window.pin.togglePin(element);
  }

  function cardKeyDownCollback(key) {
    if (key === keyCode.ESC) {
      window.card.hideDialog();
      window.pin.togglePin();
    }
  }

  function cardClickCollback() {
    window.card.hideDialog();
    window.pin.togglePin();
  }
})();
