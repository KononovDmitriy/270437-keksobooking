'use strict';

(function () {

  var html = document.querySelector('html');
  var offerDialog = html.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');

  dialogClose.addEventListener('click', dialogCloseClickHandler);
  html.addEventListener('keydown', htmlKeydownHandler);
  closeCard();

  function dialogInsertDom(elementFromTemplate) {
    var dialogPanel = offerDialog.querySelector('.dialog__panel');
    dialogPanel.parentNode.replaceChild(elementFromTemplate, dialogPanel);
  }

  function closeCard() {
    offerDialog.classList.add('hidden');
    window.pin.togglePin();
  }

  function dialogCloseClickHandler(evt) {
    evt.preventDefault();
    closeCard();
  }

  function htmlKeydownHandler(evt) {
    if (!offerDialog.classList.contains('hidden')) {
      window.utils.isEscEvent(evt, function () {
        closeCard();
      });
    }
  }

  function openCard(element, data) {
    var template = window.card.createDialog(data);
    dialogInsertDom(template);
    offerDialog.classList.remove('hidden');
    window.pin.togglePin(element);
  }

  window.showCard = {
    openCard: openCard,
    closeCard: closeCard
  };

})();
