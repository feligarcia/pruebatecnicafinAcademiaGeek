import { types } from "../types/types";

export const actionSearch = (searchtext) => {
  return {
    type: types.search,
    payload: searchtext,
  };
};
