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

  var TIME = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  var noticeForm = document.querySelector('.notice__form');
  var buildingType = noticeForm.querySelector('#type');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  // var title = noticeForm.querySelector('#title');
  // var address = noticeForm.querySelector('#address');
  var price = noticeForm.querySelector('#price');
  var guests = noticeForm.querySelectorAll('#capacity option');
  var formSubmitButton = noticeForm.querySelector('.form__submit');
  var capacityField = document.querySelector('#capacity');

  function timeInHandler() {
    window.synchronizeFields(timeIn, timeOut, TIME, timeChangeCallBack);
  }

  function timeOutHandler() {
    window.synchronizeFields(timeOut, timeIn, TIME, timeChangeCallBack);
  }

  function timeChangeCallBack(elem, value) {
    elem.value = value;
  }

  function typeChangeHandler() {
    window.synchronizeFields(buildingType, price, PRICE, typeChangeCallBack);
  }

  function typeChangeCallBack(elem, value) {
    elem.setAttribute('min', value);
  }

  function roomNumberChangeHandler() {
    window.synchronizeFields(roomNumber, guests, CAPACITY_NUMBERS,
        roomNumberChangeCallBack);
  }

  function roomNumberChangeCallBack(elem, value) {
    elem.forEach(function (element) {
      element.disabled = !value.includes(element.value);

      if (!element.disabled) {
        capacityField.value = element.value;
      }
    });
  }

  function noticeFormSubmitHandler(evt) {
    evt.preventDefault();

    noticeForm.submit();
    noticeForm.reset();
  }

  function formSubmitButtonClickHandler() {
    var elements = noticeForm.querySelectorAll('input:not([type="checkbox"])');

    elements.forEach(function (element) {
      element.classList.toggle('invalid', !element.validity.valid);
    });
  }

  (function initializeForm() {
    window.synchronizeFields(buildingType, price, PRICE, typeChangeCallBack);
    window.synchronizeFields(roomNumber, guests, CAPACITY_NUMBERS,
        roomNumberChangeCallBack);
  })();

  (function addFormHandlers() {
    noticeForm.addEventListener('submit', noticeFormSubmitHandler);
    formSubmitButton.addEventListener('click', formSubmitButtonClickHandler);
    buildingType.addEventListener('change', typeChangeHandler);
    timeIn.addEventListener('change', timeInHandler);
    timeOut.addEventListener('change', timeOutHandler);
    roomNumber.addEventListener('change', roomNumberChangeHandler);
  })();

})();
