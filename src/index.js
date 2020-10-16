import ReactDOM from 'react-dom';
import App from './components/app/app';
import offersMock from './mocks/offers-mocks';
import reviewsMock from './mocks/reviews-mocks';

ReactDOM.render(
    <App
      numberOfPlaces={`999`}
      offersMock={offersMock}
      reviewsMock={reviewsMock}
    />,
    document.getElementById(`root`)
);
