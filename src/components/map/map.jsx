import {PureComponent} from "react";
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafIcon = Leaflet.Icon.extend({
  options: {iconSize: [30, 30]}
});

const iconDefault = new LeafIcon({iconUrl: `img/pin.svg`});
const iconActive = new LeafIcon({iconUrl: `img/pin-active.svg`});

class Map extends PureComponent {

  constructor(props) {
    super(props);
  }

  _setCurrentMarker(nextCoords) {
    if (nextCoords !== null) {
      Leaflet.marker([
        nextCoords.latitude,
        nextCoords.longitude
      ]).setIcon(iconActive)
        .addTo(this._layerGroup);
    }
  }

  _setMarker(prevCoords) {
    if (prevCoords !== null) {
      Leaflet.marker([
        prevCoords.latitude,
        prevCoords.longitude
      ]).setIcon(iconDefault)
        .addTo(this._layerGroup);
    }
  }

  componentDidMount() {

    const {latitude, longitude, zoom} = this.props.cityCenterCoords;
    this._city = [latitude, longitude];
    this._zoom = zoom;

    this._map = Leaflet.map(`map`, {
      city: this._city,
      zoom: this._zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(this._city, this._zoom);

    Leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this._map);

    this._layerGroup = Leaflet.layerGroup().addTo(this._map);

    this.props.offerCoords.map((coordinates, index) => this._setMarker(coordinates, index));

    this._setCurrentMarker(this.props.currentCoords);
  }


  componentWillUnmount() {
    this._map.remove();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.activeCoords) !== JSON.stringify(prevProps.activeCoords)) {
      this._setMarker(prevProps.activeCoords);
      this._setCurrentMarker(this.props.activeCoords);
    }

    if (JSON.stringify(this.props.cityCenterCoords) !== JSON.stringify(prevProps.cityCenterCoords)) {
      const {latitude, longitude, zoom} = this.props.cityCenterCoords;

      this._city = [latitude, longitude];
      this._zoom = zoom;

      this._map.setView(this._city, this._zoom);
      this.props.offerCoords.map((coordinates, index) => this._setMarker(coordinates, index));
    }

    if (JSON.stringify(this.props.currentCoords) !== JSON.stringify(prevProps.currentCoords)) {
      this._setMarker(prevProps.currentCoords);
      this._setCurrentMarker(this.props.currentCoords);
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
  cityCenterCoords: PropTypes.object.isRequired,
  activeCoords: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.oneOf([null]).isRequired]),
  currentCoords: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.oneOf([null]).isRequired])
};

export default Map;
