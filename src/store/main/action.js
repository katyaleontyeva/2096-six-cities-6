export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  CHANGE_SORTING: `main/changeSorting`,
  LOAD_OFFERS: `main/loadOffers`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  changeSorting: (sorting) => ({
    type: ActionType.CHANGE_SORTING,
    payload: sorting
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  })
};
