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

  var filterPrices = {
    LOW: 10000,
    HIGHT: 50000
  };

  var ads;
  var adsFitered;

  var tokyo = document.querySelector('.tokyo');
  var tokyoPinMap = tokyo.querySelector('.tokyo__pin-map');
  var pinMain = tokyoPinMap.querySelector('.pin__main');
  var city = tokyo.querySelector('.tokyo img');
  var filterContainer = tokyo.querySelector('.tokyo__filters-container');
  var address = document.querySelector('#address');
  var filtersContainer = tokyo.querySelector('.tokyo__filters-container');
  var filterType = filtersContainer.querySelector('#housing_type');
  var filterPrice = filtersContainer.querySelector('#housing_price');
  var filterRooms = filtersContainer.querySelector('#housing_room-number');
  var filterGuests = filtersContainer.querySelector('#housing_guests-number');
  var filterFeatures = filtersContainer.querySelectorAll('#housing_features [name = \'feature\']');

  addFiltersHadlers();

  window.backend.load(loadSuccessHandler, loadErrorHandler);
  getLocationLimits();
  displayAddress();
  dragPin();

  function loadSuccessHandler(response) {
    ads = response;
    drawPin();
  }

  function loadErrorHandler(errorMessage) {
    window.utils.displayError(errorMessage);
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
    window.utils.isEnterEvent(evt, index, pinEnterCallback);
  }

  function pinEnterCallback(evt, index) {
    window.showCard(evt.currentTarget, ads[index]);
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

    displayAddress();
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

  function displayAddress() {
    address.value = 'x:' + (pinMain.offsetLeft + pinMain.offsetWidth / 2)
      + ', y:' + (pinMain.offsetTop + pinMain.offsetHeight);
  }

  function addFiltersHadlers() {
    filterType.addEventListener('change', filterChangeHandler);
    filterPrice.addEventListener('change', filterChangeHandler);
    filterRooms.addEventListener('change', filterChangeHandler);
    filterGuests.addEventListener('change', filterChangeHandler);
    filterFeatures.forEach(function (value) {
      value.addEventListener('change', filterChangeHandler);
    });
  }

  function filterChangeHandler() {
    adsFitered = ads.filter(function (element) {
      if (filterType.value !== 'any') {
        return element.offer.type === filterType.value;
      }
      return true;
    });

    console.dir(adsFitered);

    adsFitered = adsFitered.filter(function (element) {
      switch (filterPrice.value) {
        case 'low':
          return element.offer.price <= filterPrices.LOW;
        case 'hight':
          return element.offer.price >= filterPrices.HIGHT;
        case 'middle':
          return element.offer.price >= filterPrices.LOW &&
            element.offer.price <= filterPrices.HIGHT;
      }
    });
    console.dir(adsFitered);
  }

  window.map = {
    displayAddress: displayAddress,
  };

})();
