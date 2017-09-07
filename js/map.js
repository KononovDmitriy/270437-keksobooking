'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var ads = window.data.arrayData();

  window.pin.drawPins(ads, pinClickCollBack, pinKeyDownCallBack);


  function pinKeyDownCallBack(index, element, key) {
    if (key === keyCode.ENTER) {
      window.card.showDialog(ads, index);
      window.pin.togglePin(element);
    }
  }

  function pinClickCollBack(index, element) {
    window.card.showDialog(ads, index);
    window.pin.togglePin(element);
  }


  // hideDialog();
  // addDialogCloseHandler();
  // var ads = window.data.arrayData();
  // drawPins(ads);
})();
