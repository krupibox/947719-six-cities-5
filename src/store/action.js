export const ActionType = {
  UPDATE_CITY: `UPDATE_CITY`,
};

export const ActionCreator = {
  updateCity: (city) => ({
    type: ActionType.UPDATE_CITY,
    payload: city
  }),
};
