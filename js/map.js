'use strict';

var randomBorders = {
  PRICE_MIN: 1000,
  PRICE_MAX: 1000001,
  ROOMS_MIN: 1,
  ROOMS_MAX: 6,
  GUESTS_MIN: 1,
  GUESTS_MAX: 101,
  LOCATION_X_MIN: 300,
  LOCATION_X_MAX: 901,
  LOCATION_Y_MIN: 100,
  LOCATION_Y_MAX: 501
};

var keyCode = {
  ESC: 27,
  ENTER: 13
};

var meanings = {
  TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  CHEK_TIMES: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator',
    'conditioner']
};

var ARRAY_INIT_VALUE = 0;
var MAIN_ARRAY_LENGHT = 8;

var validForm = {
  HEAD_MIN_LENGTH: 30,
  HEAD_MAX_LENGTH: 100,
  PRICE_MAX: 1000000,
  PRICE_BUNGALO: 0,
  PRICE_FLAT: 1000,
  PRICE_HOUSE: 5000,
  PRICE_PALACE: 10000
};

var messages = {
  REQUIRED: 'Заполните поле!',
  MIN_LENGTH_START: 'Минимальная длинна поля ',
  MAX_LENGTH_START: 'Максимальная длинна поля ',
  LENGTH_END: ' символов!',
  MIN_PRICE: 'Минимальная цена ',
  MAX_PRICE: 'Максимальная цена '
};

var PRICE = {
  'flat': 1000,
  'bungalo': 0,
  'house': 5000,
  'palace': 10000
};

var arrayIndexesAvatars = createArrayIndexes(MAIN_ARRAY_LENGHT);
var arrayIndexesTitle = createArrayIndexes(meanings.TITLES.length);

var noticeForm = document.querySelector('.notice__form');
var buildingType = noticeForm.querySelector('#type');
var timeIn = noticeForm.querySelector('#timein');
var timeOut = noticeForm.querySelector('#timeout');
var roomNumber = noticeForm.querySelector('#room_number');
var title = noticeForm.querySelector('#title');
var address = noticeForm.querySelector('#address');
var price = noticeForm.querySelector('#price');
var guests = noticeForm.querySelectorAll('#capacity option');


function createArray() {
  var ads = [];
  for (var i = 0; i < MAIN_ARRAY_LENGHT; i++) {
    ads[i] = createUserObject();
  }
  return ads;
}

function createUserObject() {
  var userObject = {};
  userObject.author = {};
  userObject.author.avatar = getImageSrc();
  userObject.location = {};
  userObject.location.x = getRandomNumber(randomBorders.LOCATION_X_MIN,
      randomBorders.LOCATION_X_MAX);
  userObject.location.y = getRandomNumber(randomBorders.LOCATION_Y_MIN,
      randomBorders.LOCATION_Y_MAX);
  userObject.offer = {};
  userObject.offer.address = userObject.location.x + ', ' +
      userObject.location.y;
  userObject.offer.title = meanings.TITLES[getRandomValues(arrayIndexesTitle,
      ARRAY_INIT_VALUE)];
  userObject.offer.price = getRandomNumber(randomBorders.PRICE_MIN,
      randomBorders.PRICE_MAX);
  userObject.offer.type = getType();
  userObject.offer.rooms = getRandomNumber(randomBorders.ROOMS_MIN,
      randomBorders.ROOMS_MAX);
  userObject.offer.guests = getRandomNumber(randomBorders.GUESTS_MIN,
      randomBorders.GUESTS_MAX);
  userObject.offer.checkin = meanings.CHEK_TIMES[getRandomNumber(
      ARRAY_INIT_VALUE, meanings.CHEK_TIMES.length)];
  userObject.offer.checkout = meanings.CHEK_TIMES[getRandomNumber(
      ARRAY_INIT_VALUE, meanings.CHEK_TIMES.length)];
  userObject.offer.features = getFeatures();
  userObject.offer.description = '';
  userObject.offer.photos = [];
  return userObject;
}

function getImageSrc() {
  var index = getRandomValues(arrayIndexesAvatars, ARRAY_INIT_VALUE);

  index++;
  return 'img/avatars/user0' + index + '.png';
}

function getType() {
  var TYPES = ['flat', 'house', 'bungalo'];
  return TYPES[getRandomNumber(ARRAY_INIT_VALUE, TYPES.length)];
}

function getFeatures() {
  var randomNumberElements = getRandomNumber(ARRAY_INIT_VALUE,
      meanings.FEATURES.length);
  var arrayIndexesFeatures = createArrayIndexes(randomNumberElements);
  var features = [];
  for (var i = ARRAY_INIT_VALUE; i < arrayIndexesFeatures.length; i++) {
    features[i] = getRandomValues(arrayIndexesFeatures, ARRAY_INIT_VALUE);
  }

  features.forEach(function (value, index) {
    features[index] = meanings.FEATURES[value];
  });
  return features;
}

function getLodgeType(type) {
  var LODGE_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return LODGE_TYPE[type];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValues(indexes, minIndex) {
  var randomValue = getRandomNumber(minIndex, indexes.length);
  return indexes.splice(randomValue, 1);
}

function createDomElements(ads) {
  var domElementsAttributs = {
    DIV_CLASS: 'pin',
    IMG_CLASS: 'rounded',
    IMG_WIDTH: '40',
    IMG_HEIGHT: '40'
  };
  var pin = {
    WIDTH: 56,
    HEIGHT: 75
  };

  var domElements = [];
  ads.forEach(function (value, index) {
    var pinBaloon = document.createElement('div');
    var userAvatar = document.createElement('img');
    pinBaloon.classList.add(domElementsAttributs.DIV_CLASS);
    pinBaloon.style.left = (value.location.x - (pin.WIDTH / 2)) + 'px';
    pinBaloon.style.top = (value.location.y - pin.HEIGHT) + 'px';
    pinBaloon.setAttribute('tabindex', 0);
    userAvatar.src = value.author.avatar;
    userAvatar.className = domElementsAttributs.IMG_CLASS;
    userAvatar.width = domElementsAttributs.IMG_WIDTH;
    userAvatar.height = domElementsAttributs.IMG_HEIGHT;
    pinBaloon.appendChild(userAvatar);

    domElements[index] = pinBaloon;

    pinAddHandler(pinBaloon, index);
  });

  return domElements;
}

function appendDomElements(domElements) {
  var parent = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < domElements.length; i++) {
    fragment.appendChild(domElements[i]);
  }
  parent.appendChild(fragment);
}

function createFeaturesElements(currentElement, features) {
  var parent = currentElement.querySelector('.lodge__features');

  features.forEach(function (value) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + value;
    parent.appendChild(span);
  });

}

function createDialogPanelFromTemplate(ads) {
  var template = document.querySelector('#lodge-template').content.cloneNode(true);

  template.querySelector('.lodge__title').textContent = ads.offer.title;
  template.querySelector('.lodge__address').textContent = ads.offer.address;
  template.querySelector('.lodge__price').textContent =
      ads.offer.price + '\u20bd/ночь';
  template.querySelector('.lodge__type').textContent =
      getLodgeType(ads.offer.type);
  template.querySelector('.lodge__rooms-and-guests').textContent =
      'Для ' + ads.offer.guests + ' гостей в ' + ads.offer.rooms + ' комнатах';
  template.querySelector('.lodge__checkin-time').textContent =
      'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
  template.querySelector('.lodge__description').textContent =
      ads.offer.description;
  document.querySelector('.dialog__title img').src = ads.author.avatar;

  createFeaturesElements(template, ads.offer.features);

  templateInsertDom(template);
}

function templateInsertDom(elementFromTemplate) {
  var oldNode = document.querySelector('.dialog__panel');
  oldNode.parentNode.replaceChild(elementFromTemplate, oldNode);
}

function createArrayIndexes(maxValue) {
  var newArrayIndexes = [];
  for (var i = 0; i < maxValue; i++) {
    newArrayIndexes[i] = i;
  }
  return newArrayIndexes;
}

function drawPins(ads) {
  var domElements = createDomElements(ads);
  appendDomElements(domElements);
}

function hideDialog() {
  document.querySelector('.dialog').classList.add('hidden');
  togglePin();
}

function showElement(element) {
  element.classList.remove('hidden');
}

function togglePin(currentPin) {
  var activeElement = document.querySelector('.pin--active');
  if (activeElement) {
    activeElement.classList.remove('pin--active');
  }
  if (currentPin) {
    currentPin.classList.add('pin--active');
  }
}

function showDialog(element, index) {
  togglePin(element);
  createDialogPanelFromTemplate(ads[index]);
  showElement(document.querySelector('.dialog'));
}


function htmlKeydownHandler(evt) {
  var dialog = document.querySelector('.dialog');
  if (evt.keyCode === keyCode.ESC && !dialog.classList.contains('hidden')) {
    hideDialog();
  }
}

function addDialogCloseHandler() {
  var element = document.querySelector('.dialog__close');
  element.addEventListener('click', dialogCloseClickHandler);
  document.querySelector('html').addEventListener('keydown',
      htmlKeydownHandler);
}

function pinAddHandler(pin, index) {
  pin.addEventListener('click', pinClickHandler.bind(null, index));
  pin.addEventListener('keydown', pinKeydownHandler.bind(null, index));
}

function pinClickHandler(index, evt) {
  showDialog(evt.currentTarget, index);
}

function pinKeydownHandler(index, evt) {
  if (evt.keyCode === keyCode.ENTER) {
    showDialog(evt.currentTarget, index);
  }
}

function dialogCloseClickHandler(evt) {
  evt.preventDefault();
  hideDialog();
}


function addFormHandlers(form) {
  noticeForm.addEventListener('submit', noticeFormSubmitHandler);
  buildingType.addEventListener('change', typeInputHandler);
  timeIn.addEventListener('change', timeInputHandler);
  timeOut.addEventListener('change', timeInputHandler);
  roomNumber.addEventListener('change', roomNumberInputHandler);
  title.addEventListener('change', elementInputHandler);
  address.addEventListener('change', elementInputHandler);
  price.addEventListener('change', elementInputHandler);
}

function timeInputHandler(evt) {
  validateTime(evt.currentTarget);
}

function typeInputHandler() {
  validateTypes();
}

function roomNumberInputHandler(evt) {
  validateGuests();
}

function elementInputHandler(evt) {
  evt.currentTarget.setCustomValidity('');
}

function noticeFormSubmitHandler(evt) {
  var formData = {
    ACTION: 'https://1510.dump.academy/keksobooking'
  };

  evt.preventDefault();
  if (validateForm()) {
    noticeForm.setAttribute('action', formData.ACTION);
    noticeForm.submit();
  }
}

function validateForm() {
  var title = validateTitle();
  var address = validateAddress();
  var price = validatePrice();
  return title && address && price;
}

function validateGuests() {
  guests.forEach(function (value) {
    value.removeAttribute('disabled');
  });
  if (roomNumber.value === '100') {
    for (var i = guests.length - 2; i >= 0; i--) {
      guests[i].setAttribute('disabled', '');
    }
    guests[0].parentNode.value = 0;
  } else {
    guests[guests.length - 1].setAttribute('disabled', '');
    for (i = 0; i <= (guests.length - 2) - roomNumber.value; i++) {
      guests[i].setAttribute('disabled', '');
    }
    guests[0].parentNode.value = roomNumber.value;
  }
}

function validateTitle() {
  if (!title.value) {
    title.setCustomValidity(messages.REQUIRED);
    return false;
  }
  if (title.value.length < validForm.HEAD_MIN_LENGTH) {
    title.setCustomValidity(messages.MIN_LENGTH_START + validForm.HEAD_MIN_LENGTH + messages.LENGTH_END);
    return false;
  }
  if (title.value.length >= validForm.HEAD_MAX_LENGTH) {
    title.setCustomValidity(messages.MAX_LENGTH_START + validForm.HEAD_MAX_LENGTH + messages.LENGTH_END);
    return false;
  }
  return true;
}

function validateAddress() {
  var address = document.querySelector('#address');
  if (!address.value) {
    address.setCustomValidity(messages.REQUIRED);
    return false;
  }
  return true;
}

function validatePrice() {
  var minPrice = getMinPrice();
  if (price.value < minPrice) {
    price.setCustomValidity(messages.MIN_PRICE + minPrice);
    return false;
  }
  if (price.value > validForm.PRICE_MAX) {
    price.setCustomValidity(messages.MAX_PRICE + validForm.MAX_PRICE);
    return false;
  }
  return true;
}

function validateTypes() {
  price.setAttribute('min', getMinPrice());

}

function validateTime(time) {
  var elementId = (time.id === 'timein') ? '#timeout' : '#timein';
  document.querySelector(elementId).value = time.value;
}

function getMinPrice() {
  return PRICE[buildingType.value];
}

function initializeForm() {
  setHtmlAttributes();
  validateTypes();
  validateGuests();
}

function setHtmlAttributes() {
  title.setAttribute('required', '');
  title.setAttribute('minlength', validForm.HEAD_MIN_LENGTH);
  title.setAttribute('maxlength', validForm.HEAD_MAX_LENGTH);
  address.setAttribute('required', '');
  price.setAttribute('required', '');
  price.setAttribute('max', validForm.PRICE_MAX);
}

hideDialog();
addDialogCloseHandler();
var ads = createArray();
drawPins(ads);
initializeForm();
addFormHandlers();
