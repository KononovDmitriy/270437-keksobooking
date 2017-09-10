'use strict';

(function () {

  window.synchronizeFields = function (firstElement, secondElement, data,
      callBack) {
    callBack(secondElement, data[firstElement.value]);
  };
})();
