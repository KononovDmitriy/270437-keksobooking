'use strict';

(function () {
  var clickCollback;
  var keydownCollback;

  function getLodgeType(type) {
    var LODGE_TYPE = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };
    return LODGE_TYPE[type];
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

  function hideDialog() {
    document.querySelector('.dialog').classList.add('hidden');
  }

  function showElement(element) {
    element.classList.remove('hidden');
  }

  function showDialog(ads, index) {
    createDialogPanelFromTemplate(ads[index]);
    showElement(document.querySelector('.dialog'));
  }


  function htmlKeydownHandler(evt) {
    var dialog = document.querySelector('.dialog');

  }

  function addDialogCloseHandler() {
    var element = document.querySelector('.dialog__close');
    element.addEventListener('click', dialogCloseClickHandler);
    document.querySelector('html').addEventListener('keydown',
        htmlKeydownHandler);
  }

  function dialogCloseClickHandler(evt) {
    evt.preventDefault();
    clickCollback();
  }

  window.card = {
    showDialog: showDialog,
    hideDialog: hideDialog
  };
})();

