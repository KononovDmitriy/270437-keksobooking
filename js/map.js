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

var lodge = {
  PRICE: '{{offer.price}}\u20bd/ночь',
  PRICE_TEMPLATE: '{{offer.price}}',
  GUESTS: 'Для {{offer.guests}} гостей в {{offer.rooms}} комнатах',
  GUESTS_TEMPLATE: '{{offer.guests}}',
  ROOMS_TEMPLATE: '{{offer.rooms}}',
  TIME: 'Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}',
  TIME_IN_TEMPLATE: '{{offer.checkin}}',
  TIME_OUT_TEMPLATE: '{{offer.checkout}}',
  FEATURES: 'feature__image feature__image--{{offer.features}}',
  FEATURES_TEMPLATE: '{{offer.features}}'
};

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
  var width;
  var height;
  for (var i = 0; i < ads.length; i++) {
    div = document.createElement('div');
    div.className = domElementsAttributs.DIV_CLASS;
    width = window.parseInt(window.getComputedStyle(div, null).width);
    height = window.parseInt(window.getComputedStyle(div, null).height);
    div.style.left = (ads[i].location.x - (width / 2)) + 'px';
    div.style.top = (ads[i].location.y - height) + 'px';
    img = document.createElement('img');
    img.src = ads[i].author.avatar;
    img.className = domElementsAttributs.IMG_CLASS;
    img.width = domElementsAttributs.IMG_WIDTH;
    img.height = domElementsAttributs.IMG_HEIGHT;
    div.appendChild(img);
    domElements[i] = div;
  }
};

var appendDomElements = function (domElements) {
  var parent = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < domElements.length; i++) {
    fragment.appendChild(domElements[i]);
  }
  parent.appendChild(fragment);
};

var gettingLodgeType = function (type) {
  var returnValue;
  switch (type) {
    case 'flat': returnValue = 'Квартира'; break;
    case 'bungalo': returnValue = 'Бунгало'; break;
    case 'house': returnValue = 'Дом'; break;
  }
  return returnValue;
};

var creatingFeaturesElements = function (currentElement, features) {
  var parent = currentElement.querySelector('.lodge__features');
  var span;
  for (var i = 0; i < features.length; i++) {
    span = document.createElement('span');
    span.className = lodge.FEATURES.replace(lodge.FEATURES_TEMPLATE, features[i]);
    parent.appendChild(span);
  }
};

var creatingElementFromTemplate = function (ads) {
  var template = document.querySelector('#lodge-template');
  template.content.querySelector('.lodge__title').textContent = ads.offer.title;
  template.content.querySelector('.lodge__address').textContent = ads.offer.address;
  template.content.querySelector('.lodge__price').textContent =
      lodge.PRICE.replace(lodge.PRICE_TEMPLATE, ads.offer.price);
  template.content.querySelector('.lodge__type').textContent = gettingLodgeType(ads.offer.type);
  var temp = lodge.GUESTS.replace(lodge.GUESTS_TEMPLATE, ads.offer.guests);
  temp = temp.replace(lodge.ROOMS_TEMPLATE, ads.offer.rooms);
  template.content.querySelector('.lodge__rooms-and-guests').textContent = temp;
  temp = lodge.TIME.replace(lodge.TIME_IN_TEMPLATE, ads.offer.checkin);
  temp = temp.replace(lodge.TIME_OUT_TEMPLATE, ads.offer.checkout);
  template.content.querySelector('.lodge__checkin-time').textContent = temp;
  creatingFeaturesElements(template.content, ads.offer.features);
  template.content.querySelector('.lodge__description').textContent = ads.offer.description;
  document.querySelector('.dialog__title img').src = ads.author.avatar;
  return document.importNode(template.content, true);
};

var templateReplacement = function (elementFromTemplate) {
  var oldNode = document.querySelector('.dialog__panel');
  oldNode.parentNode.replaceChild(elementFromTemplate, oldNode);
};

var ads = [];
var domElements = [];
creatingArray(ads);
creatingDomElements(ads, domElements);
appendDomElements(domElements);
var elementFromTemplate = creatingElementFromTemplate(ads[0]);
templateReplacement(elementFromTemplate);
