const getPlaces = (places) => {

  return places.map((place) => ({
    latitude: place.location.latitude,
    longitude: place.location.longitude,
    zoom: place.location.zoom
  }));
};

export const getCoordinates = (places) => {
  return {
    cityCenter: {
      latitude: places[0].city.location.latitude,
      longitude: places[0].city.location.longitude,
      zoom: places[0].city.location.zoom
    },
    places: getPlaces(places),
  };
};
