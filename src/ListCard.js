import React, { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
// import { getPokemon } from "./getPokemons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ListCard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    if (isLoading) {
      const getPokemon = () => {
        const lista = [];
        axios
          .get("https://pokeapi.co/api/v2/pokemon/")
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
                    experiencia: detalle.base_experience,
                  };
                  lista.push(poke);
                })
                .catch((e) => {
                  console.log(e);
                });
            });

            setPokemons(lista);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      getPokemon();
    }
  }, [isLoading]);
  const handleCardDetail = (id) => {
    navigate(`/pokemon/${id}`);
  };
  console.log(pokemons);
  console.log(isLoading);
  if (isLoading) {
    return <Loader />;
  }
  console.log(pokemons);
  console.log(isLoading);
  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} onClick={() => handleCardDetail(pokemon.id)}>
            <Card.Img variant="top" src={pokemon.foto} />
            <Card.Body>
              <Card.Title>{pokemon.nombre}</Card.Title>

              <li>Id:{pokemon.id}</li>
              <li> Tipo: {pokemon.tipo}</li>
              <li> Experiencia: {pokemon.experiencia}</li>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default ListCard;
