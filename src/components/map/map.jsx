import {PureComponent} from "react";
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const icon = Leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const iconActive = Leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [30, 30]
});

class Map extends PureComponent {

  constructor(props) {
    super(props);
    this._offerCoords = props.offerCoords;
    this._markers = [];
  }

  componentDidMount() {
    const city = [52.38333, 4.9];
    const zoom = 12;

    // initialize the map and return map object
    this._map = Leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    this._map.setView(city, zoom);

    // add layer
    Leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this._map);

    this._layerGroup = Leaflet.layerGroup().addTo(this._map); // add layer to map

    // iterate object as an array
    if (typeof this._offerCoords === `object` && this._offerCoords !== null) {
      this._markers = Object.values(this._offerCoords).map((coordinates) => Leaflet.marker(coordinates, {icon}).addTo(this._layerGroup)); // add to layer instead of directly to map
    }
  }

  componentWillUnmount() {
    this._map.remove();
  }

  componentDidUpdate(prevProps) {
    // need to check if the previous state and the current state are different !important
    if (this.props.activeCoords !== prevProps.activeCoords) {
      this._markers.map((marker) => {
        if (marker._latlng.lat === this.props.activeCoords[0]
          && marker._latlng.lng === this.props.activeCoords[1]) {
          marker.setIcon(iconActive);
        } else {
          marker.setIcon(icon);
        }
      });
    }

    if (JSON.stringify(this.props.offerCoords) !== JSON.stringify(prevProps.offerCoords)) {
      this._layerGroup.clearLayers();
      this._markers = Object.values(this.props.offerCoords).map((coordinates) => Leaflet.marker(coordinates, {icon}).addTo(this._layerGroup));
    }

  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  offerCoords: PropTypes.array.isRequired,
  activeCoords: PropTypes.array.isRequired,
};

export default Map;
