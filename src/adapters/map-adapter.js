const getOfferCoords = (places) => places.map((place) => ({
  offerId: place.id,
  latitude: place.location.latitude,
  longitude: place.location.longitude,
  zoom: place.location.zoom
}));

class MapAdapter {
  constructor(data) {
    this.cityCoords = {
      cityName: data[0].city.name,
      latitude: data[0].city.location.latitude,
      longitude: data[0].city.location.longitude,
      zoom: data[0].city.location.zoom
    };
    this.offersCoords = getOfferCoords(data);
  }

  static getOffersCoords(data) {
    return new this(data).offersCoords;
  }

  static getCityCoords(data) {
    return new this(data).cityCoords;
  }
}

export default MapAdapter;
