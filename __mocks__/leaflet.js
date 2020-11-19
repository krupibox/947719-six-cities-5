const leaflet = jest.genMockFromModule(`leaflet`);

leaflet.icon = () => {};

leaflet.map = () => {
  return {
    setView: () => {},
    remove: () => {},
    once: () => {},
    removeLayer: () => {},
    flyTo: () => {},
    scrollWheelZoom: () => {}
  };
};

leaflet.marker = () => {
  return {
    addTo: () => {
      return {
        bindPopup: () => {}
      };
    },
  };
};

leaflet.tileLayer = () => {
  return {
    addTo: () => {},
  };
};

module.exports = leaflet;
