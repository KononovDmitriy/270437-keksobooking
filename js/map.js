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

  var functionsFilters = [applyFilterTypes, applyFiltersPrice, applyFilterRooms,
    applyFilterGuests, applyFiltersFeatures];

  tokyoFilters.addEventListener('change', function () {
    window.showCard.closeCard();
    adsFiltered = filterAds();
    window.utils.debounce(loadDebounceCallback);
  });

  window.backend.load(loadSuccessCallback, loadErrorCallback);

  function loadSuccessCallback(response) {
    ads = response;
    adsFiltered = filterAds();
    adsFiltered = adsFiltered.slice(0, 3);
    drawPins();
  }

  function loadErrorCallback(errorMessage) {
    window.utils.displayError(errorMessage);
  }

  function loadDebounceCallback() {
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
    window.showCard.openCard(element, adsFiltered[index]);
  }

  function filterAds() {
    var adsArray = ads.filter(function (ad) {
      return functionsFilters.every(function (func) {
        return func(ad);
      });
    });
    return adsArray;
  }

  function applyFilterTypes(elementsArray) {
    if (filterType.value !== 'any') {
      return (elementsArray.offer['type'] === filterType.value);
    }
    return true;
  }

  function applyFilterRooms(elementsArray) {
    if (filterRooms.value !== 'any') {
      var rooms = Number(filterRooms.value);
      return (elementsArray.offer['rooms'] === rooms);
    }
    return true;
  }

  function applyFilterGuests(elementsArray) {
    if (filterGuests.value !== 'any') {
      var guests = Number(filterGuests.value);
      return (elementsArray.offer['guests'] === guests);
    }
    return true;
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
    var filterFeaturesArray = Array.prototype.slice.call(filterFeatures, 0);

    filterFeaturesArray.forEach(function (featureElement) {
      if (featureElement.checked) {
        features = features && elementsArray.offer.features.includes(featureElement.value);
      }
    });
    return features;
  }

})();
