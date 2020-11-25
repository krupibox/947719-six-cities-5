import {PureComponent} from "react";
import Leaflet from 'leaflet';

const ICON_DEFAULT = Leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [30, 30]
});

const ICON_ACTIVE = Leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [30, 30]
});

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this._markers = null;
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
    this._layerCurrentGroup = Leaflet.layerGroup().addTo(this._map);

    this._renderMarkers();
    this._setCurrentMarker();
  }

  componentDidUpdate(prevProps) {

    if (JSON.stringify(this.props.activeCoords) !== JSON.stringify(prevProps.activeCoords)) {
      this._setActiveMarker(this.props.activeCoords, prevProps.activeCoords);
    }

    if (JSON.stringify(this.props.cityCenterCoords) !== JSON.stringify(prevProps.cityCenterCoords)) {
      this._layerGroup.clearLayers();

      const {latitude, longitude, zoom} = this.props.cityCenterCoords;

      this._city = [latitude, longitude];
      this._zoom = zoom;

      this._map.setView(this._city, this._zoom);

      this._renderMarkers();
    }

    if (JSON.stringify(this.props.currentCoords) !== JSON.stringify(prevProps.currentCoords)) {
      this._layerGroup.clearLayers();
      this._renderMarkers();
      this._setActiveMarker(this.props.currentCoords, prevProps.currentCoords);
      this._setCurrentMarker();
    }
  }

  componentWillUnmount() {
    this._map.remove();
  }

  _renderMarkers() {
    this._markers = this.props.offerCoords.map((coordinates) => Leaflet.marker([coordinates.latitude, coordinates.longitude], {icon: ICON_DEFAULT}).addTo(this._layerCurrentGroup));
  }

  _setActiveMarker(activeCoords, prevCoords) {
    if (activeCoords !== null) {
      this._markers.map((markerCoords) => this._isPin(activeCoords, markerCoords) && markerCoords.setIcon(ICON_ACTIVE));
    }

    if (prevCoords !== null) {
      this._markers.map((markerCoords) => this._isPin(prevCoords, markerCoords) && markerCoords.setIcon(ICON_DEFAULT));
    }
  }

  _setCurrentMarker() {
    if (this._currentMarker) {
      this._currentMarker.setIcon(ICON_DEFAULT);
    }

    if (this.props.currentCoords) {
      this._currentMarker = Leaflet.marker([this.props.currentCoords.latitude, this.props.currentCoords.longitude], {icon: ICON_ACTIVE}).addTo(this._layerCurrentGroup);
    }
  }

  _isPin(activeCoords, markerCoords) {
    return markerCoords._latlng.lat === activeCoords.latitude && markerCoords._latlng.lng === activeCoords.longitude;
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
