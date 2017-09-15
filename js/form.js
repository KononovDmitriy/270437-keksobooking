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
  var price = noticeForm.querySelector('#price');
  var guests = noticeForm.querySelectorAll('#capacity option');
  var formSubmitButton = noticeForm.querySelector('.form__submit');
  var capacityField = document.querySelector('#capacity');
  var address = noticeForm.querySelector('#address');
  var formInputs = noticeForm.querySelectorAll('input:not([type="checkbox"])');
  var formInputsArray = Array.prototype.slice.call(formInputs, 0);

  noticeForm.addEventListener('submit', noticeFormSubmitHandler);
  formSubmitButton.addEventListener('click', formSubmitButtonClickHandler);
  buildingType.addEventListener('change', buildingTypeChangeHandler);
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);
  address.addEventListener('input', addressInputHandler);

  window.synchronizeFields(buildingType, price, PRICE, typeChangeCallback);
  window.synchronizeFields(roomNumber, guests, CAPACITY_NUMBERS,
      roomNumberChangeCallback);

  function addressInputHandler() {
    address.value = '';
  }

  function timeInChangeHandler() {
    window.synchronizeFields(timeIn, timeOut, TIME, timeChangeCallback);
  }

  function timeOutChangeHandler() {
    window.synchronizeFields(timeOut, timeIn, TIME, timeChangeCallback);
  }

  function timeChangeCallback(element, value) {
    element.value = value;
  }

  function buildingTypeChangeHandler() {
    window.synchronizeFields(buildingType, price, PRICE, typeChangeCallback);
  }

  function typeChangeCallback(element, value) {
    element.setAttribute('min', value);
  }

  function roomNumberChangeHandler() {
    window.synchronizeFields(roomNumber, guests, CAPACITY_NUMBERS,
        roomNumberChangeCallback);
  }

  function roomNumberChangeCallback(elements, value) {
    var elementsArray = Array.prototype.slice.call(elements, 0);

    elementsArray.forEach(function (element) {
      element.disabled = !value.includes(element.value);

      if (!element.disabled) {
        capacityField.value = element.value;
      }
    });
  }

  function noticeFormSubmitHandler(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), saveOnLoadHandler,
        saveErrorHandler);
  }

  function saveOnLoadHandler() {
    noticeForm.reset();
  }

  function saveErrorHandler(errorMessage) {
    window.utils.displayError(errorMessage);
  }

  function formSubmitButtonClickHandler() {
    formInputsArray.forEach(function (element) {
      element.classList.toggle('invalid', !element.validity.valid);
    });
  }

  function setAddress(value) {
    address.value = value;
  }

  window.setAddress = setAddress;

})();
