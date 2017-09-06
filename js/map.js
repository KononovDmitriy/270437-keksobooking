'use strict';

var keyCode = {
  ESC: 27,
  ENTER: 13
};



function getLodgeType(type) {
  var LODGE_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return LODGE_TYPE[type];
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

hideDialog();
addDialogCloseHandler();
var ads = window.data.arrayData();
drawPins(ads);
