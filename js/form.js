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

  initializeForm();
  addFormHandlers();

  function timeInHandler() {
    window.synchronizeFields(timeIn, timeOut, TIME, timeChangeCallBack);
  }

  function timeOutHandler() {
    window.synchronizeFields(timeOut, timeIn, TIME, timeChangeCallBack);
  }

  function timeChangeCallBack(element, value) {
    element.value = value;
  }

  function typeChangeHandler() {
    window.synchronizeFields(buildingType, price, PRICE, typeChangeCallBack);
  }

  function typeChangeCallBack(element, value) {
    element.setAttribute('min', value);
  }

  function roomNumberChangeHandler() {
    window.synchronizeFields(roomNumber, guests, CAPACITY_NUMBERS,
        roomNumberChangeCallBack);
  }

  function roomNumberChangeCallBack(elements, value) {
    elements.forEach(function (elementent) {
      elementent.disabled = !value.includes(elementent.value);

      if (!elementent.disabled) {
        capacityField.value = elementent.value;
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
    var node = document.createElement('div');
    node.setAttribute('style', 'margin: 0 auto; text-align: center;' +
      'background-color: red; z-index: 100; position: absolute; left: 0;' +
      'right: 0; font-size: 30px');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function formSubmitButtonClickHandler() {
    var elementents = noticeForm.querySelectorAll('input:not([type="checkbox"])');

    elementents.forEach(function (elementent) {
      elementent.classList.toggle('invalid', !elementent.validity.valid);
    });
  }

  function initializeForm() {
    window.synchronizeFields(buildingType, price, PRICE, typeChangeCallBack);
    window.synchronizeFields(roomNumber, guests, CAPACITY_NUMBERS,
        roomNumberChangeCallBack);
  }

  function addFormHandlers() {
    noticeForm.addEventListener('submit', noticeFormSubmitHandler);
    formSubmitButton.addEventListener('click', formSubmitButtonClickHandler);
    buildingType.addEventListener('change', typeChangeHandler);
    timeIn.addEventListener('change', timeInHandler);
    timeOut.addEventListener('change', timeOutHandler);
    roomNumber.addEventListener('change', roomNumberChangeHandler);
  }

})();
