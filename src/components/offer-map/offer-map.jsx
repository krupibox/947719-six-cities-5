import {PureComponent} from "react";
import Leaflet from 'leaflet';
import mapProperties from "@root/proptypes/map-properties";

const ICON_SIZE = [30, 30];

const ICON_DEFAULT = Leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: ICON_SIZE
});

const ICON_ACTIVE = Leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: ICON_SIZE
});

const LAYER = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`;
const COPYRIGHT = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`;

class OfferMap extends PureComponent {
  constructor(props) {
    super(props);
    this._map = null;
    this._pins = new Map();
  }

  componentDidMount() {
    const {latitude, longitude, zoom} = this.props.cityCoords;

    this._initMap([latitude, longitude], zoom);
    Leaflet.tileLayer(LAYER, {attribution: COPYRIGHT}).addTo(this._map);

    this._layerGroup = Leaflet.layerGroup().addTo(this._map);
    this._layerCurrentGroup = Leaflet.layerGroup().addTo(this._map);

    this._renderMarkers();
  }

  componentDidUpdate(prevProps) {
    const {cityName, latitude, longitude, zoom} = this.props.cityCoords;
    const {activeOfferId} = this.props;

    if (cityName !== prevProps.cityCoords.cityName) {
      this._layerGroup.clearLayers();
      this._map.setView([latitude, longitude], zoom);
      this._renderMarkers();
    }

    if (activeOfferId !== prevProps.activeOfferId) {
      this._setActiveMarker(activeOfferId, prevProps.activeOfferId);
    }

    if (this.props.currentCoords !== null) {
      this._layerGroup.clearLayers();
      this._renderMarkers();
      this._setCurrentMarker();
    }
  }

  componentWillUnmount() {
    this._map.remove();
  }

  _initMap(city, zoom) {
    this._map = Leaflet.map(`map`, {
      city,
      zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(city, zoom);
  }

  _renderMarkers() {
    this.props.offersCoords.map(({offerId, latitude, longitude}) => {
      const pin = Leaflet.marker([latitude, longitude], {icon: ICON_DEFAULT});
      this._pins.set(offerId, pin);
      pin.addTo(this._layerGroup);
    });
  }

  _setActiveMarker(nextOfferId, prevOfferId) {
    if (nextOfferId !== null) {
      this._pins.get(nextOfferId).setIcon(ICON_ACTIVE);
    }

    if (prevOfferId !== null) {
      this._pins.get(prevOfferId).setIcon(ICON_DEFAULT);
    }
  }

  _setCurrentMarker() {
    const {latitude, longitude} = this.props.currentCoords;

    if (this._currentPin) {
      this._currentPin.setIcon(ICON_DEFAULT);
    }

    this._currentPin = Leaflet.marker([latitude, longitude], {icon: ICON_ACTIVE}).addTo(this._layerCurrentGroup);
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}></div>
    );
  }
}

OfferMap.propTypes = {
  activeOfferId: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.oneOf([null]).isRequired]),
  offersCoords: PropTypes.arrayOf(PropTypes.shape(mapProperties).isRequired),
  cityCoords: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.oneOf([null]).isRequired]),
  currentCoords: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.oneOf([null]).isRequired])
};

export default OfferMap;
