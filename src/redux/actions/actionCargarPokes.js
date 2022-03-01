//esta accion no se esta usando, pero se deja como posible solucion
import axios from "axios";
import { types } from "../types/types";

export const actionCargarPokesASINCRO = () => {
  return async (dispatch) => {
    const lista = [];
    await axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=25&offset=25")
      .then((resp) => {
        const data = resp.data.results;
        data.forEach((pokemon) => {
          axios
            .get(pokemon.url)
            .then(async (resp) => {
              const detalle = resp.data;
              const poke = {
                id: detalle.id,
                nombre: detalle.name,
                foto: detalle.sprites.other.dream_world.front_default,
                tipo: detalle.types[0].type.name,
                tipo2: detalle.types[1]?.type.name,
                experiencia: detalle.base_experience,
              };
              await lista.push(poke);
            })
            .catch((e) => {
              console.log(e);
            });
        });
        dispatch(actionCargarPokesSincro(lista));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const actionCargarPokesSincro = (pokes) => {
  return {
    type: types.listpokes,
    payload: pokes,
  };
};
