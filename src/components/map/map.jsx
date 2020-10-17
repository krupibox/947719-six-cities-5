import {PureComponent} from "react";
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';


class Map extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const city = [52.38333, 4.9];

    const icon = Leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    const map = Leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    Leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(map);

    const offerCords = [52.3709553943508, 4.89309666406198];
    Leaflet.marker(offerCords, {icon}).addTo(map);

  }


  render() {

    return (
      <div id="map" style={{height: `100%`}}></div>
    );

  }
}

export default Map;
