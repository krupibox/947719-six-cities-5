const Leaflet = jest.genMockFromModule(`leaflet`);

Leaflet.icon = () => {};

Leaflet.map = () => {
  return {
    setView: () => {},
  };
};

Leaflet.marker = () => {
  return {
    addTo: () => {},
  };
};

Leaflet.tileLayer = () => {
  return {
    addTo: () => {},
  };
};

Leaflet.layerGroup = () => {
  return {
    addTo: () => {},
  };
};

module.exports = Leaflet;
