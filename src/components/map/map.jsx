import {PureComponent} from "react";
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafIcon = Leaflet.Icon.extend({
  options: {iconSize: [30, 30]}
});

const icon = new LeafIcon({iconUrl: `img/pin.svg`});
const iconActive = new LeafIcon({iconUrl: `img/pin-active.svg`});

class Map extends PureComponent {

  constructor(props) {
    super(props);
    this._cityCenterCoords = props.cityCenterCoords;
    this._offerCoords = props.offerCoords;
    this._markers = [];
  }

  componentDidMount() {
    const city = [this._cityCenterCoords.latitude, this._cityCenterCoords.longitude];
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

    if (typeof this._offerCoords === `object` && this._offerCoords !== null) {
      this._markers = Object.values(this._offerCoords).map((coordinates) => Leaflet.marker(coordinates, {icon}).addTo(this._layerGroup));
    }

  }

  componentWillUnmount() {
    this._map.remove();
  }

  componentDidUpdate(prevProps) {
    // need to check if the previous state and the current state are different !important
    if (this.props.activeCoords !== prevProps.activeCoords) {
      this._markers.map((marker) => {
        const {lat: prevLatitude, lng: prevLongitude} = marker._latlng;
        const [activeLatitude, activeLongitude] = this.props.activeCoords;

        if (prevLatitude === activeLatitude && prevLongitude === activeLongitude) {
          marker.setIcon(iconActive); return;
        }

        marker.setIcon(icon);
      });
    }

    if (JSON.stringify(this.props.offerCoords) !== JSON.stringify(prevProps.offerCoords)) {
      const {latitude, longitude, zoom} = this.props.cityCenterCoords;
      this._map.setView([latitude, longitude, zoom]);
      this._layerGroup.clearLayers();
      this._markers = Object.values(this.props.offerCoords).map((coordinates) => Leaflet.marker(coordinates, {icon}).addTo(this._layerGroup));
    }

    if (this.props.currentCoords) {
      const {latitude, longitude} = this.props.currentCoords;
      Leaflet.marker([latitude, longitude], {icon}).addTo(this._layerGroup).setIcon(iconActive);
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
  activeCoords: PropTypes.array.isRequired,
  currentCoords: PropTypes.object.isRequired,
};

export default Map;
