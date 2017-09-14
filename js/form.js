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
  var formElements = noticeForm.querySelectorAll('input:not([type="checkbox"])');

  noticeForm.addEventListener('submit', noticeFormSubmitHandler);
  formSubmitButton.addEventListener('click', formSubmitButtonClickHandler);
  buildingType.addEventListener('change', typeChangeHandler);
  timeIn.addEventListener('change', timeInHandler);
  timeOut.addEventListener('change', timeOutHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);
  address.addEventListener('input', addressInputHandler);

  window.synchronizeFields(buildingType, price, PRICE, typeChangeCallback);
  window.synchronizeFields(roomNumber, guests, CAPACITY_NUMBERS,
      roomNumberChangeCallback);

  function addressInputHandler() {
    address.value = '';
  }

  function timeInHandler() {
    window.synchronizeFields(timeIn, timeOut, TIME, timeChangeCallback);
  }

  function timeOutHandler() {
    window.synchronizeFields(timeOut, timeIn, TIME, timeChangeCallback);
  }

  function timeChangeCallback(element, value) {
    element.value = value;
  }

  function typeChangeHandler() {
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
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = !value.includes(elements[i].value);

      if (!elements[i].disabled) {
        capacityField.value = elements[i].value;
      }
    }
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
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].classList.toggle('invalid', !formElements[i].validity.valid);
    }
  }

  function setAddress(value) {
    address.value = value;
  }

  window.setAddress = setAddress;

})();
