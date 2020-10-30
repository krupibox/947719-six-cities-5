export const ActionType = {
  GET_CITIES: `GET_CITIES`,
};

export const ActionCreator = {
  getCities: () => ({
    type: ActionType.GET_CITIES,
  }),
};

