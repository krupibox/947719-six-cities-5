export const ActionType = {
  SET_REQUEST: `SET_REQUEST`,
};

export const setRequestAction = ({status}) => ({
  type: ActionType.SET_REQUEST,
  payload: {status}
});
