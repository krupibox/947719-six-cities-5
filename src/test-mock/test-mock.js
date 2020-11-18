export const TestMock = {

  cities: [`Paris`, `Brussels`, `Hamburg`, `Amsterdam`, `Cologne`],

  review: {
    user: {
      id: 1,
      avatarUrl: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/7.jpg`,
      name: `Max`,
    },
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: `2020-11-05T09:55:08.500Z`,
    rating: 4.1,
  },

  reviews: [{
    user: {
      id: 1,
      avatarUrl: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/7.jpg`,
      name: `Max`,
    },
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: `2020-11-05T09:55:08.500Z`,
    rating: 4.1,
  }],

  favorites: {
    Cologne: [{
      id: 1,
      city: {
        name: `Paris`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      },
      previewImage: `img/apartment-01.jpg`,
      images: [
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
      ],
      type: `Apartment`,
      price: 80,
      rating: 3.1,
      title: `Beautiful &amp; luxurious apartment at great location`,
      coordinates: [52.3909553943508, 4.85309666406198],
      host: {
        id: 1,
        name: `Angelina`,
        isPro: true,
        avatarUrl: `img/avatar-angelina.jpg`
      },
      description: `Discover daily local life in city center.`,
      isPremium: true,
      location: {
        latitude: 0,
        longitude: 0,
      }
    }],
    Hamburg: [{
      id: 1,
      city: {
        name: `Paris`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      },
      previewImage: `img/apartment-01.jpg`,
      images: [
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
      ],
      type: `Apartment`,
      price: 80,
      rating: 3.1,
      title: `Beautiful &amp; luxurious apartment at great location`,
      coordinates: [52.3909553943508, 4.85309666406198],
      host: {
        id: 1,
        name: `Angelina`,
        isPro: true,
        avatarUrl: `img/avatar-angelina.jpg`
      },
      description: `Discover daily local life in city center.`,
      isPremium: true,
      location: {
        latitude: 0,
        longitude: 0,
      }
    }],
  },

  offer: {
    id: 1,
    city: {
      name: `Paris`,
      location: {
        latitude: 0,
        longitude: 0,
      }
    },
    previewImage: `img/apartment-01.jpg`,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
    ],
    type: `Apartment`,
    price: 80,
    rating: 3.1,
    title: `Beautiful &amp; luxurious apartment at great location`,
    coordinates: [52.3909553943508, 4.85309666406198],
    host: {
      id: 1,
      name: `Angelina`,
      isPro: true,
      avatarUrl: `img/avatar-angelina.jpg`
    },
    description: `Discover daily local life in city center.`,
    isPremium: true,
    isFavorite: true,
    location: {
      latitude: 0,
      longitude: 0,
    }
  },

  offers: [
    {
      id: 1,
      city: {
        name: `Paris`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      },
      previewImage: `img/apartment-01.jpg`,
      images: [
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
      ],
      type: `Apartment`,
      price: 80,
      rating: 3.1,
      title: `Beautiful &amp; luxurious apartment at great location`,
      coordinates: [52.3909553943508, 4.85309666406198],
      host: {
        id: 1,
        name: `Angelina`,
        isPro: true,
        avatarUrl: `img/avatar-angelina.jpg`
      },
      description: `Discover daily local life in city center.`,
      isPremium: true,
      isFavorite: true,
      location: {
        latitude: 0,
        longitude: 0,
      }
    }
  ],
};


// const initialState = {
//   offers: [],
//   favorites: [],
//   cities: [],
//   activeCity: ``,
//   activeOfferId: ``,
//   activeCoords: {}
// };
