import {PureComponent} from "react";
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';


class Map extends PureComponent {

  constructor(props) {
    super(props);
    this.offerCords = props;
  }

  componentDidMount() {
    const city = [52.38333, 4.9];

    const icon = Leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });


    const zoom = 12;

    // initialize the map and return map object
    const map = Leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    // add layer
    Leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(map);

    // iterate object as an array
    if (typeof this.offerCords === `object` && this.offerCords !== null) {
      Object.values(this.offerCords).map((coordinates) => Leaflet.marker(coordinates, {icon}).addTo(map));
    }

  }

  render() {

    return (
      <div id="map" style={{height: `100%`}}></div>
    );

  }
}

export default Map;
