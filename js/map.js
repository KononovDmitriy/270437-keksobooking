'use strict';

//  Верхняя граница на 1 больше, т.к. Math.random не включает верхее значение
var randomBorders = {
  AVATAR_MIN: 0,
  TITLE_MIN: 0,
  PRICE_MIN: 1000,
  PRICE_MAX: 1000001,
  TYPE_MIN: 0,
  TYPE_MAX: 3,
  ROOMS_MIN: 1,
  ROOMS_MAX: 6,
  GUESTS_MIN: 1,
  GUESTS_MAX: 101,
  CHECK_IN_OUT_MIN: 0,
  CHECK_IN_OUT_MAX: 3,
  FEATURES_MIN: 0,
  FEATURES_MAX: 6,
  LOCATION_X_MIN: 300,
  LOCATION_X_MAX: 901,
  LOCATION_Y_MIN: 100,
  LOCATION_Y_MAX: 501,
};

var meanings = {
  AVATAR: ['01', '02', '03', '04', '05', '06', '07', '08'],
  TITLE: ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
    'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'],
  TYPE: ['flat', 'house', 'bungalo'],
  CHECK_IN_OUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};

var avatarStrings = {
  START: 'img/avatars/user',
  END: '.png'
};

var domElementsAttributs = {
  DIV_CLASS: 'pin',
  IMG_CLASS: 'rounded',
  IMG_WIDTH: '40',
  IMG_HEIGHT: '40'
};

var MAIN_ARRAY_LENGHT = 8;

// Объект с большой буквы ?!?!
var arrayIndexesAvatars = {
  arrayIndexes: [0, 1, 2, 3, 4, 5, 6, 7],
  amountElements: 8
};

var arrayIndexesTitle = {
  arrayIndexes: [0, 1, 2, 3, 4, 5, 6, 7],
  amountElements: 8
};

var creatingArray = function (ads) {
  for (var i = 0; i < MAIN_ARRAY_LENGHT; i++) {
    ads[i] = {};
    ads[i].author = {};
    ads[i].author.avatar = avatarStrings.START +
      meanings.AVATAR[getRandomValues(arrayIndexesAvatars, randomBorders.AVATAR_MIN)]
        + avatarStrings.END;
    ads[i].offer = {};
    ads[i].offer.title = meanings.TITLE[getRandomValues(arrayIndexesTitle, randomBorders.TITLE_MIN)];
    ads[i].offer.price = getRandom(randomBorders.PRICE_MIN, randomBorders.PRICE_MAX);
    ads[i].offer.type = meanings.TYPE[getRandom(randomBorders.TYPE_MIN, randomBorders.TYPE_MAX)];
    ads[i].offer.rooms = getRandom(randomBorders.ROOMS_MIN, randomBorders.ROOMS_MAX);
    ads[i].offer.guests = getRandom(randomBorders.GUESTS_MIN, randomBorders.GUESTS_MAX);
    ads[i].offer.checkin = meanings.CHECK_IN_OUT[
        getRandom(randomBorders.CHECK_IN_OUT_MIN, randomBorders.CHECK_IN_OUT_MAX)];
    ads[i].offer.checkout = meanings.CHECK_IN_OUT[
        getRandom(randomBorders.CHECK_IN_OUT_MIN, randomBorders.CHECK_IN_OUT_MAX)];
    ads[i].offer.features = getFeatures();
    ads[i].offer.description = '';
    ads[i].offer.photos = [];
    ads[i].location = {};
    ads[i].location.x = getRandom(randomBorders.LOCATION_X_MIN, randomBorders.LOCATION_X_MAX);
    ads[i].location.y = getRandom(randomBorders.LOCATION_Y_MIN, randomBorders.LOCATION_Y_MAX);
    ads[i].offer.address = ads[i].location.x + ', ' + ads[i].location.y;
  }
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomValues = function (indexes, minIndex) {
  var randomValue = getRandom(minIndex, indexes.amountElements);
  indexes.amountElements--;
  return indexes.arrayIndexes.splice(randomValue, 1);
};

var getFeatures = function () {
  var arrayIndexesFeatures = {
    arrayIndexes: [0, 1, 2, 3, 4, 5],
    amountElements: 6
  };
  var features = [];
  for (var i = randomBorders.FEATURES_MIN; i < randomBorders.FEATURES_MAX; i++) {
    features[i] = getRandomValues(arrayIndexesFeatures, randomBorders.FEATURES_MIN);
  }
  var randomLenght = getRandom(randomBorders.FEATURES_MIN + 1, randomBorders.FEATURES_MAX);
  features.splice(randomLenght, features.length - randomLenght);
  for (i = 0; i < features.length; i++) {
    features[i] = meanings.FEATURES[features[i]];
  }
  return features;
};

var creatingDomElements = function (ads, domElements) {
  var div;
  var img;
  // Цикл
  var i = 0;
  div = document.createElement('div');
  div.className = domElementsAttributs.DIV_CLASS
  // стили что-то не работают
  div.style.left = ads[i].location.x + 'px';
  div.style.height = ads[i].location.y + 'px';
  img = document.createElement('img');
  img.src = ads[i].author.avatar;
  img.className = domElementsAttributs.IMG_CLASS;
  // стили что-то не работают
  img.style.width = domElementsAttributs.IMG_WIDTH;
  img.style.height = domElementsAttributs.IMG_HEIGHT;
};

var ads = [];
var domElements = [];
creatingArray(ads);
creatingDomElements(ads, domElements);
