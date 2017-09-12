'use strict';

(function () {
  var keyCode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  function displayError(errorMessage) {
    var node = document.createElement('div');
    node.setAttribute('style', 'margin: 0 auto; text-align: center;' +
      'background-color: red; z-index: 100; position: absolute; left: 0;' +
      'right: 0; font-size: 30px');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.utils = {
    isEnterEvent: function (evt, index, action) {
      if (evt.keyCode === keyCode.ENTER_KEYCODE) {
        action(evt, index);
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === keyCode.ESC_KEYCODE) {
        action();
      }
    },
    displayError: displayError
  };

})();
