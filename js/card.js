'use strict';

(function () {
  var LODGE_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var lodgeTemplate = document.querySelector('#lodge-template');
  var dialogTitleImg = document.querySelector('.dialog__title img');

  function createFeaturesElements(currentElement, features) {
    var parent = currentElement.querySelector('.lodge__features');

    features.forEach(function (value) {
      var span = document.createElement('span');
      span.className = 'feature__image feature__image--' + value;
      parent.appendChild(span);
    });
  }

  function createDialogPanelFromTemplate(ads) {
    var template = lodgeTemplate.content.cloneNode(true);

    template.querySelector('.lodge__title').textContent = ads.offer.title;
    template.querySelector('.lodge__address').textContent = ads.offer.address;
    template.querySelector('.lodge__price').textContent =
        ads.offer.price + '\u20bd/ночь';
    template.querySelector('.lodge__type').textContent =
        LODGE_TYPE[ads.offer.type];
    template.querySelector('.lodge__rooms-and-guests').textContent =
        'Для ' + ads.offer.guests + ' гостей в ' + ads.offer.rooms + ' комнатах';
    template.querySelector('.lodge__checkin-time').textContent =
        'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
    template.querySelector('.lodge__description').textContent =
        ads.offer.description;
    dialogTitleImg.src = ads.author.avatar;

    createFeaturesElements(template, ads.offer.features);
    return template;
  }

  window.card = {
    createDialog: createDialogPanelFromTemplate
  };
})();

