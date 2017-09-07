'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var ads = window.data.arrayData();
  var html = document.querySelector('html');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = document.querySelector('.dialog__close');

  hideDialog();
  addDialogCloseHandler();
  drawPin();

  function drawPin() {
    var pinBaloonArray = [];
    ads.forEach(function (value, index) {
      var pinBaloon = window.pin.createPin(value);
      pinAddHandler(pinBaloon, index);
      pinBaloonArray[index] = pinBaloon;
    });
    appendDomElement(pinBaloonArray);
  }

  function pinAddHandler(pin, index) {
    pin.addEventListener('click', pinClickHandler.bind(null, index));
    pin.addEventListener('keydown', pinKeydownHandler.bind(null, index));
  }

  function pinClickHandler(index, evt) {
    openCard(index, evt.currentTarget);
  }

  function pinKeydownHandler(index, evt) {
    if (evt.keyCode === keyCode.ENTER) {
      openCard(index, evt.currentTarget);
    }
  }

  function htmlKeydownHandler(evt) {
    if (evt.keyCode === keyCode.ESC &&
        !offerDialog.classList.contains('hidden')) {
      closeCard();
    }
  }

  function addDialogCloseHandler() {
    dialogClose.addEventListener('click', dialogCloseClickHandler);
    html.addEventListener('keydown', htmlKeydownHandler);
  }

  function dialogCloseClickHandler(evt) {
    evt.preventDefault();
    closeCard();
  }

  function appendDomElement(pinBaloonArray) {
    var fragment = document.createDocumentFragment();

    pinBaloonArray.forEach(function (domElement) {
      fragment.appendChild(domElement);
    });
    tokyoPinMap.appendChild(fragment);
  }

  function openCard(index, element) {
    var template = window.card.createDialog(ads[index]);
    dialogInsertDom(template);
    showDialog();
    window.pin.togglePin(element);
  }

  function closeCard() {
    hideDialog();
    window.pin.togglePin();
  }

  function dialogInsertDom(elementFromTemplate) {
    var dialogPanel = offerDialog.querySelector('.dialog__panel');
    dialogPanel.parentNode.replaceChild(elementFromTemplate, dialogPanel);
  }

  function hideDialog() {
    offerDialog.classList.add('hidden');
  }

  function showDialog() {
    offerDialog.classList.remove('hidden');
  }
})();
