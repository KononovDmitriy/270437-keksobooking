'use strict';

(function () {
  var ENTER = 13;

  var pinСoordinates = {
    startX: 0,
    startY: 0,
    locationMinX: 0,
    locationMaxX: 0,
    locationMinY: 0,
    locationMaxY: 0,
  };

  var ads;
  var tokyo = document.querySelector('.tokyo');
  var tokyoPinMap = tokyo.querySelector('.tokyo__pin-map');
  var pinMain = tokyoPinMap.querySelector('.pin__main');
  var city = tokyo.querySelector('.tokyo img');
  var filterContainer = tokyo.querySelector('.tokyo__filters-container');
  var address = document.querySelector('#address');

  window.backend.load(loadSuccessHandler, loadErrorHandler);
  getLocationLimits();
  outputAddress();
  dragPin();

  function loadSuccessHandler(response) {
    ads = response;
    drawPin();
  }

  function loadErrorHandler(errorMessage) {
    var node = document.createElement('div');
    node.setAttribute('style', 'margin: 0 auto; text-align: center;' +
      'background-color: red; z-index: 100; position: absolute; left: 0;' +
      'right: 0; font-size: 30px');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

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
    window.showCard(evt.currentTarget, ads[index]);
  }

  function pinKeydownHandler(index, evt) {
    if (evt.keyCode === ENTER) {
      window.showCard(evt.currentTarget, ads[index]);
    }
  }

  function appendDomElement(pinBaloonArray) {
    var fragment = document.createDocumentFragment();

    pinBaloonArray.forEach(function (domElement) {
      fragment.appendChild(domElement);
    });
    tokyoPinMap.appendChild(fragment);
  }

  function dragPin() {
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

    outputAddress();
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

  function outputAddress() {
    address.value = 'x:' + (pinMain.offsetLeft + pinMain.offsetWidth / 2)
      + ', y:' + (pinMain.offsetTop + pinMain.offsetHeight);
  }

  window.map = {
    outputAddress: outputAddress
  };

})();
