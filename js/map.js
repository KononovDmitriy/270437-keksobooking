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
  var adsFiltered;

  var tokyo = document.querySelector('.tokyo');
  var tokyoPinMap = tokyo.querySelector('.tokyo__pin-map');
  var pinMain = tokyoPinMap.querySelector('.pin__main');
  var city = tokyo.querySelector('.tokyo img');
  var filterContainer = tokyo.querySelector('.tokyo__filters-container');
  var tokyoFilters = tokyo.querySelector('.tokyo__filters');
  var filterType = tokyoFilters.querySelector('#housing_type');
  var filterPrice = tokyoFilters.querySelector('#housing_price');
  var filterRooms = tokyoFilters.querySelector('#housing_room-number');
  var filterGuests = tokyoFilters.querySelector('#housing_guests-number');
  var filterFeatures = tokyoFilters.querySelectorAll('#housing_features [name = \'feature\']');

  var functionsFilters = [applyFilters, applyFiltersPrice, applyFiltersFeatures];

  tokyoFilters.addEventListener('change', function () {
    window.closeCard();
    adsFiltered = filterAds();
    window.pin.hidePins();
    window.utils.debounce(drawPin);
  });

  window.backend.load(loadSuccessHandler, loadErrorHandler);
  getLocationLimits();
  window.displayAddress();
  dragPin();

  function loadSuccessHandler(response) {
    ads = response;
    adsFiltered = filterAds();
    adsFiltered = adsFiltered.slice(0, 3);
    drawPin();
  }

  function loadErrorHandler(errorMessage) {
    window.utils.displayError(errorMessage);
  }

  function drawPin() {
    var pinBaloonArray = [];
    adsFiltered.forEach(function (value, index) {
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
    window.showCard(evt.currentTarget, adsFiltered[index]);
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

  function filterAds() {
    var adsArray = ads.filter(function (ad) {
      return functionsFilters.every(function (func) {
        return func(ad);
      });
    });
    return adsArray;
  }

  function applyFilters(elementsArray) {
    var filtersOptions = [
      {elementValue: filterType.value, key: 'type', isNumber: false},
      {elementValue: filterRooms.value, key: 'rooms', isNumber: true},
      {elementValue: filterGuests.value, key: 'guests', isNumber: true}
    ];

    var features = true;

    filtersOptions.forEach(function (value) {
      if (value.elementValue !== 'any') {
        value.elementValue = value.isNumber ? Number(value.elementValue) : value.elementValue;

        features = features && (elementsArray.offer[value.key] === value.elementValue);
      }
    });
    return features;
  }

  function applyFiltersPrice(elementsArray) {
    switch (filterPrice.value) {
      case 'low':
        return elementsArray.offer.price <= filterPrices.LOW;
      case 'high':
        return elementsArray.offer.price >= filterPrices.HIGHT;
      case 'middle':
        return elementsArray.offer.price >= filterPrices.LOW &&
          elementsArray.offer.price <= filterPrices.HIGHT;
    }
    return true;
  }

  function applyFiltersFeatures(elementsArray) {
    var features = true;

    filterFeatures.forEach(function (featureElement) {
      if (featureElement.checked) {
        features = features && elementsArray.offer.features.includes(featureElement.value);
      }
    });
    return features;
  }

})();
