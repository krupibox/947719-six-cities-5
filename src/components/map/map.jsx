import {PureComponent} from "react";
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';


class Map extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Leaflet.map(`map`).setView([51.505, -0.09], 13);
  }


  render() {

    return (
      <div id="map" style={{height: `100%`}}></div>
    );

  }
}

export default Map;
