import ReactDOM from 'react-dom';
import App from './components/app/app';
import offersMock from './mocks/offers-mocks';
import reviewsMock from './mocks/reviews-mocks';
import nearbyMock from './mocks/nearby-mocks';

ReactDOM.render(
    <App
      numberOfPlaces={`999`}
      offersMock={offersMock}
      reviewsMock={reviewsMock}
      nearbyMock={nearbyMock}
    />,
    document.getElementById(`root`)
);
