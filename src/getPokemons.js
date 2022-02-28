import axios from "axios";
export const getPokemon = async () => {
    const lista = [];
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((resp) => {
      const data = resp.data.results;
      data.forEach((pokemon) => {
        axios.get(pokemon.url).then((resp) => {
          const detalle = resp.data;
          const poke = {
            id: detalle.id,
            nombre: detalle.name,
            foto: detalle.sprites.other.dream_world.front_default,
            tipo: detalle.types[0].type.name,
            experiencia: detalle.base_experience,
          };
          lista.push(poke);
          // lista = [...lista,poke]
        });
      });
    });
    
    return lista
  };