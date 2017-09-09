'use strict';

(function () {
  var offerDialog = document.querySelector('#offer-dialog');

  function openCard(element, data) {
    var template = window.card.createDialog(data);
    dialogInsertDom(template);
    showDialog();
  }

  function showDialog() {
    offerDialog.classList.remove('hidden');
  }

  function dialogInsertDom(elementFromTemplate) {
    var dialogPanel = offerDialog.querySelector('.dialog__panel');
    dialogPanel.parentNode.replaceChild(elementFromTemplate, dialogPanel);
  }

  window.showCard = openCard;

})();
