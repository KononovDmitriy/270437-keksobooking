'use strict';

(function () {

  var filterPrices = {
    LOW: 10000,
    HIGHT: 50000
  };

  var ads;
  var adsFiltered;

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var filterType = tokyoFilters.querySelector('#housing_type');
  var filterPrice = tokyoFilters.querySelector('#housing_price');
  var filterRooms = tokyoFilters.querySelector('#housing_room-number');
  var filterGuests = tokyoFilters.querySelector('#housing_guests-number');
  var filterFeatures = tokyoFilters.querySelectorAll('#housing_features [name = \'feature\']');

  var functionsFilters = [applyFilters, applyFiltersPrice, applyFiltersFeatures];

  tokyoFilters.addEventListener('change', function () {
    window.closeCard();
    adsFiltered = filterAds();
    window.utils.debounce(loadSuccessCallback);
  });

  window.backend.load(loadSuccessHandler, loadErrorHandler);

  function loadSuccessHandler(response) {
    ads = response;
    adsFiltered = filterAds();
    adsFiltered = adsFiltered.slice(0, 3);
    drawPins();
  }

  function loadErrorHandler(errorMessage) {
    window.utils.displayError(errorMessage);
  }

  function loadSuccessCallback() {
    window.pin.hidePins();
    drawPins();
  }

  function drawPins() {
    var pinBaloonArray = [];
    adsFiltered.forEach(function (value, index) {
      var pinBaloon = window.pin.getPin(value, index, pinClickCallback);
      pinBaloonArray[index] = pinBaloon;
    });
    addPinToDom(pinBaloonArray);
  }

  function addPinToDom(pinBaloonArray) {
    var fragment = document.createDocumentFragment();

    pinBaloonArray.forEach(function (domElement) {
      fragment.appendChild(domElement);
    });
    tokyoPinMap.appendChild(fragment);
  }

  function pinClickCallback(element, index) {
    window.showCard(element, adsFiltered[index]);
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
