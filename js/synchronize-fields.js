'use strict';

(function () {

  function synchronize(elem1, elem2, data, callBack) {
    callBack(elem2, data[elem1.value]);
  }

  window.synchronizeFields = synchronize;
})();
