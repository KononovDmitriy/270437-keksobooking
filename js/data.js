'use strict';

(function () {
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
      'Огромный прекрасный дворец', 'Маленький ужасный дворец',
      'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    CHEK_TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator',
      'conditioner']
  };

  var TYPES = ['flat', 'house', 'bungalo'];

  var MAIN_ARRAY_LENGHT = 8;
  var ARRAY_INIT_VALUE = 0;

  var arrayIndexesAvatars = createArrayIndexes(MAIN_ARRAY_LENGHT);
  var arrayIndexesTitle = createArrayIndexes(meanings.TITLES.length);

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

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomValues(indexes, minIndex) {
    var randomValue = getRandomNumber(minIndex, indexes.length);
    return indexes.splice(randomValue, 1);
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

  function createArrayIndexes(maxValue) {
    var newArrayIndexes = [];
    for (var i = 0; i < maxValue; i++) {
      newArrayIndexes[i] = i;
    }
    return newArrayIndexes;
  }

  function getType() {
    return TYPES[getRandomNumber(ARRAY_INIT_VALUE, TYPES.length)];
  }

  window.data = {
    createArray: createArray
  };
})();


