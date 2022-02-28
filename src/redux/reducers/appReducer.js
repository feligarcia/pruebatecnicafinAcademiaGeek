import {types} from '../types/types'

const initialState = {
favPokemons:[],
search:''

}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {

  case types.listar:
    return { ...state}

    case types.search:
      return {
        ...state,
        search: action.payload,
      };

  default:
    return state
  }
}
