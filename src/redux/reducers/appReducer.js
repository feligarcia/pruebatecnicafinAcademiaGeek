import {types} from '../types/types'

const initialState = {
Pokemons:{},

}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {

  case types.listar:
    return { ...state}



  default:
    return state
  }
}
