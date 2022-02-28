import { types } from "../types/types.js";
const InitialState = {
  user: [],

};

export const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case types.register:
      return {
        user: [action.payload],
      };

    case types.logout:
      return {
        user: [action.payload],
      };

    case types.login:
      return {
        ...state,
        user: [action.payload],
      };

    

    default:
      return state;
  }
};
