'use strict';

(function () {
  var CAPACITY_NUMBERS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var PRICE = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var noticeForm = document.querySelector('.notice__form');
  var buildingType = noticeForm.querySelector('#type');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var title = noticeForm.querySelector('#title');
  var address = noticeForm.querySelector('#address');
  var price = noticeForm.querySelector('#price');
  var guests = noticeForm.querySelectorAll('#capacity option');
  var capacityField = document.querySelector('#capacity');

  function timeChangeHandler(evt) {
    var elementId = (evt.currentTarget.id === 'timein') ? '#timeout' : '#timein';
    noticeForm.querySelector(elementId).value = evt.currentTarget.value;
  }

  function typeChangeHandler() {
    typeSetMinValue();
  }

  function roomNumberChangeHandler() {
    choiceNumberGuests();
  }

  function noticeFormSubmitHandler(evt) {
    evt.preventDefault();

    if (validateForm()) {
      noticeForm.submit();
      noticeForm.reset();
    }
  }

  function noticeFormInvalidHandler() {
    var elements = noticeForm.querySelectorAll('input:not([type="checkbox"])');

    elements.forEach(function (element) {
      element.classList.toggle('invalid', !element.validity.valid);
    });
  }

  function typeSetMinValue() {
    price.setAttribute('min', PRICE[buildingType.value]);
  }

  function choiceNumberGuests() {
    var values = CAPACITY_NUMBERS[roomNumber.value];

    guests.forEach(function (element) {
      element.disabled = !values.includes(element.value);

      if (!element.disabled) {
        capacityField.value = element.value;
      }
    });
  }

  function validateForm() {
    return title.validity.valid && address.validity.valid && price.validity.valid;
  }

  (function initializeForm() {
    typeSetMinValue();
    choiceNumberGuests();
  })();

  (function addFormHandlers() {
    noticeForm.addEventListener('submit', noticeFormSubmitHandler);
    noticeForm.addEventListener('invalid', noticeFormInvalidHandler, true);
    buildingType.addEventListener('change', typeChangeHandler);
    timeIn.addEventListener('change', timeChangeHandler);
    timeOut.addEventListener('change', timeChangeHandler);
    roomNumber.addEventListener('change', roomNumberChangeHandler);
  })();

})();
