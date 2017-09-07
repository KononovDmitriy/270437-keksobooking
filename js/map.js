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
      openCard(index, element);
    }
  }

  function pinClickCollback(index, element) {
    openCard(index, element);
  }

  function cardKeyDownCollback(key) {
    if (key === keyCode.ESC) {
      closeCard();
    }
  }

  function cardClickCollback() {
    closeCard();
  }

  function openCard(index, element) {
    window.card.showDialog(ads, index);
    window.pin.togglePin(element);
  }

  function closeCard() {
    window.card.hideDialog();
    window.pin.togglePin();
  }
})();
