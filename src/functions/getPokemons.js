import axios from "axios";
export const getPokemons = async () => {
  const lista = [];
  await  axios
    .get("https://pokeapi.co/api/v2/pokemon/?limit=25&offset=25")
    .then((resp) => {
      const data = resp.data.results;
      data.forEach((pokemon) => {
        axios
          .get(pokemon.url)
          .then((resp) => {
            const detalle = resp.data;
            const poke = {
              id: detalle.id,
              nombre: detalle.name,
              foto: detalle.sprites.other.dream_world.front_default,
              tipo: detalle.types[0].type.name,
              tipo2: detalle.types[1]?.type.name,
              experiencia: detalle.base_experience,
            };
            lista.push(poke);
          })
          .catch((e) => {
            console.log(e);
          });
      });

    
    })
    .catch((e) => {
      console.log(e);
    });
    return lista
};