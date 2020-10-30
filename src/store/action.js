export const ActionType = {
  UPDATE_ACTIVE_CITY: `UPDATE_ACTIVE_CITY`,
};

export const ActionCreator = {
  updateCity: (activeCity) => ({
    type: ActionType.UPDATE_ACTIVE_CITY,
    payload: activeCity
  }),
};
