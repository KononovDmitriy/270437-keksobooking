'use strict';

(function () {
  var ESC = 27;

  var html = document.querySelector('html');
  var offerDialog = html.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');

  addDialogCloseHandler();
  closeCard();

  function openCard(element, data) {
    var template = window.card.createDialog(data);
    dialogInsertDom(template);
    offerDialog.classList.remove('hidden');
    window.pin.togglePin(element);
  }

  function dialogInsertDom(elementFromTemplate) {
    var dialogPanel = offerDialog.querySelector('.dialog__panel');
    dialogPanel.parentNode.replaceChild(elementFromTemplate, dialogPanel);
  }

  function closeCard() {
    offerDialog.classList.add('hidden');
    window.pin.togglePin();
  }

  function addDialogCloseHandler() {
    dialogClose.addEventListener('click', dialogCloseClickHandler);
    html.addEventListener('keydown', htmlKeydownHandler);
  }

  function dialogCloseClickHandler() {
    closeCard();
  }

  function htmlKeydownHandler(evt) {
    if (evt.keyCode === ESC &&
        !offerDialog.classList.contains('hidden')) {
      closeCard();
    }
  }

  function showCard(element, data) {
    openCard(element, data);
    closeCard();
  }

  window.showCard = showCard;

})();
