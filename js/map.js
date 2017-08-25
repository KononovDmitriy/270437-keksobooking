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

var meanings = {
  TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
    'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'],
  CHEK_TIMES: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};

var ARRAY_INIT_VALUE = 0;
var MAIN_ARRAY_LENGHT = 8;

var createArray = function () {
  var ads = [];
  for (var i = 0; i < MAIN_ARRAY_LENGHT; i++) {
    ads[i] = createUserObject();
  }
  return ads;
};

var createUserObject = function () {
  var userObject = {};
  userObject.author = {};
  userObject.author.avatar = getImageSrc();
  userObject.location = {};
  userObject.location.x = getRandomNumber(randomBorders.LOCATION_X_MIN, randomBorders.LOCATION_X_MAX);
  userObject.location.y = getRandomNumber(randomBorders.LOCATION_Y_MIN, randomBorders.LOCATION_Y_MAX);
  userObject.offer = {};
  userObject.offer.address = userObject.location.x + ', ' + userObject.location.y;
  userObject.offer.title = meanings.TITLES[getRandomValues(arrayIndexesTitle, ARRAY_INIT_VALUE)];
  userObject.offer.price = getRandomNumber(randomBorders.PRICE_MIN, randomBorders.PRICE_MAX);
  userObject.offer.type = getType();
  userObject.offer.rooms = getRandomNumber(randomBorders.ROOMS_MIN, randomBorders.ROOMS_MAX);
  userObject.offer.guests = getRandomNumber(randomBorders.GUESTS_MIN, randomBorders.GUESTS_MAX);
  userObject.offer.checkin = meanings.CHEK_TIMES[getRandomNumber(ARRAY_INIT_VALUE, meanings.CHEK_TIMES.length)];
  userObject.offer.checkout = meanings.CHEK_TIMES[getRandomNumber(ARRAY_INIT_VALUE, meanings.CHEK_TIMES.length)];
  userObject.offer.features = getFeatures();
  userObject.offer.description = '';
  userObject.offer.photos = [];
  return userObject;
};

var getImageSrc = function () {
  var avatarStrings = {
    START: 'img/avatars/user',
    END: '.png'
  };
  var index = getRandomValues(arrayIndexesAvatars, ARRAY_INIT_VALUE);

  index++;
  return avatarStrings.START + '0' + index + avatarStrings.END;
};

var getType = function () {
  var TYPES = ['flat', 'house', 'bungalo'];
  return TYPES[getRandomNumber(ARRAY_INIT_VALUE, TYPES.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomValues = function (indexes, minIndex) {
  var randomValue = getRandomNumber(minIndex, indexes.length);
  return indexes.splice(randomValue, 1);
};

var getFeatures = function () {
  var randomNumberElements = getRandomNumber(ARRAY_INIT_VALUE, meanings.FEATURES.length);
  var arrayIndexesFeatures = createArrayIndexes(randomNumberElements);
  var features = [];
  for (var i = ARRAY_INIT_VALUE; i < arrayIndexesFeatures.length; i++) {
    features[i] = getRandomValues(arrayIndexesFeatures, ARRAY_INIT_VALUE);
  }
  features.forEach(function (value, index) {
    features[index] = meanings.FEATURES[value];
  });
  return features;
};

var createDomElements = function (ads) {
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
    pinBaloon.className = domElementsAttributs.DIV_CLASS;
    pinBaloon.style.left = (value.location.x - (pin.WIDTH / 2)) + 'px';
    pinBaloon.style.top = (value.location.y - pin.HEIGHT) + 'px';
    userAvatar.src = value.author.avatar;
    userAvatar.className = domElementsAttributs.IMG_CLASS;
    userAvatar.width = domElementsAttributs.IMG_WIDTH;
    userAvatar.height = domElementsAttributs.IMG_HEIGHT;
    pinBaloon.appendChild(userAvatar);
    domElements[index] = pinBaloon;
  });

  return domElements;
};

var appendDomElements = function (domElements) {
  var parent = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < domElements.length; i++) {
    fragment.appendChild(domElements[i]);
  }
  parent.appendChild(fragment);
};

var getLodgeType = function (type) {
  var LODGE_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return LODGE_TYPE[type];
};

var createFeaturesElements = function (currentElement, features) {
  var parent = currentElement.querySelector('.lodge__features');

  features.forEach(function (value) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + value;
    parent.appendChild(span);
  });

};

var createElementFromTemplate = function (ads) {
  var template = document.querySelector('#lodge-template').content.cloneNode(true);

  template.querySelector('.lodge__title').textContent = ads.offer.title;
  template.querySelector('.lodge__address').textContent = ads.offer.address;
  template.querySelector('.lodge__price').textContent = getLodgePrice(ads.offer.price);
  template.querySelector('.lodge__type').textContent = getLodgeType(ads.offer.type);
  template.querySelector('.lodge__rooms-and-guests').textContent =
    getLodgeGuests(ads.offer.guests, ads.offer.rooms);
  template.querySelector('.lodge__checkin-time').textContent =
    getLodgeCheckinTime(ads.offer.checkin, ads.offer.checkout);
  template.querySelector('.lodge__description').textContent = ads.offer.description;
  document.querySelector('.dialog__title img').src = ads.author.avatar;

  createFeaturesElements(template, ads.offer.features);

  return template;
};

var getLodgePrice = function (lodgePrice) {
  return lodgePrice + '\u20bd/ночь';
};

var getLodgeGuests = function (lodgeGuests, lodgeRooms) {
  return 'Для ' + lodgeGuests + ' гостей в ' +
    lodgeRooms + ' комнатах';
};

var getLodgeCheckinTime = function (checkIn, checkOut) {
  return 'Заезд после ' + checkIn + ', выезд до ' + checkOut;
};


var templateReplace = function (elementFromTemplate) {
  var oldNode = document.querySelector('.dialog__panel');
  oldNode.parentNode.replaceChild(elementFromTemplate, oldNode);
};

var createArrayIndexes = function (maxValue) {
  var newArrayIndexes = [];
  for (var i = 0; i < maxValue; i++) {
    newArrayIndexes[i] = i;
  }
  return newArrayIndexes;
};

var drawElements = function (ads) {
  var domElements = createDomElements(ads);
  appendDomElements(domElements);
  var elementFromTemplate = createElementFromTemplate(ads[0]);
  templateReplace(elementFromTemplate);
};

var arrayIndexesAvatars = createArrayIndexes(MAIN_ARRAY_LENGHT);
var arrayIndexesTitle = createArrayIndexes(meanings.TITLES.length);
var ads = createArray();
drawElements(ads);


