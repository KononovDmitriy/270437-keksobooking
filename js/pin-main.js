'use strict';

(function () {

  var pinСoordinates = {
    startX: 0,
    startY: 0,
    locationMinX: 0,
    locationMaxX: 0,
    locationMinY: 0,
    locationMaxY: 0,
  };

  var tokyo = document.querySelector('.tokyo');
  var pinMain = tokyo.querySelector('.pin__main');
  var city = tokyo.querySelector('.tokyo img');
  var filterContainer = tokyo.querySelector('.tokyo__filters-container');

  getLocationLimits();
  window.displayAddress();
  dragMainPin();

  function dragMainPin() {
    pinMain.addEventListener('mousedown', pinMainMouseDownHandler);
  }

  function pinMainMouseDownHandler(evt) {
    evt.preventDefault();

    pinСoordinates.startX = evt.clientX;
    pinСoordinates.startY = evt.clientY;

    document.addEventListener('mouseup', cityMainMouseUpHandler);
    document.addEventListener('mousemove', cityMainMouseMoveHandler);
  }

  function cityMainMouseMoveHandler(evt) {
    evt.preventDefault();

    if (evt.movementX > 0) {
      pinMoveRight(evt.clientX);
    } else {
      pinMoveLeft(evt.clientX);
    }

    if (evt.movementY > 0) {
      pinMoveDown(evt.clientY);
    } else {
      pinMoveUp(evt.clientY);
    }

    pinСoordinates.startX = evt.clientX;
    pinСoordinates.startY = evt.clientY;

    window.displayAddress();
  }

  function cityMainMouseUpHandler(evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', cityMainMouseMoveHandler);
    document.removeEventListener('mouseup', cityMainMouseUpHandler);
  }

  function getLocationLimits() {
    pinСoordinates.locationMaxX = city.clientWidth - pinMain.clientWidth;

    pinСoordinates.locationMaxY = city.clientHeight -
      filterContainer.clientHeight - pinMain.clientHeight;
  }

  function pinMoveRight(clientX) {
    if (pinMain.offsetLeft <= pinСoordinates.locationMaxX) {
      pinMain.style.left = (pinMain.offsetLeft +
        (clientX - pinСoordinates.startX)) + 'px';
    }
  }

  function pinMoveLeft(clientX) {
    if (pinMain.offsetLeft >= 0) {
      pinMain.style.left = (pinMain.offsetLeft -
        (pinСoordinates.startX - clientX)) + 'px';
    }
  }

  function pinMoveDown(clientY) {
    if (pinMain.offsetTop <= pinСoordinates.locationMaxY) {
      pinMain.style.top = (pinMain.offsetTop +
        (clientY - pinСoordinates.startY)) + 'px';
    }
  }

  function pinMoveUp(clientY) {
    if (pinMain.offsetTop >= 0) {
      pinMain.style.top = (pinMain.offsetTop -
        (pinСoordinates.startY - clientY)) + 'px';
    }
  }

})();
