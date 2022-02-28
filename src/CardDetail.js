import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";

const CardDetail = () => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((resp) => {
        const detalle = resp.data;
        console.log(detalle);
        const poke = {
          id: detalle.id,
          nombre: detalle.name,
          foto: detalle.sprites.other.dream_world.front_default,
          tipo: detalle.types[0].type.name,
          experiencia: detalle.base_experience,
          fotobt: detalle.sprites.back_default,
          altura: detalle.height,
          peso: detalle.weight,
          habilidad: detalle.abilities[0].ability.name,
          evolucion: detalle.forms[0].name,
        };
        setPokemon(poke);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  console.log(params);

  return (
    <div>
      <Card className="cardpokemon">
        <Card.Img variant="top" src={pokemon.foto} />
        <Card.Img variant="top" src={pokemon.fotobt} />
        <Card.Body>
          <Card.Title>
            <h3>{pokemon.nombre}</h3>
          </Card.Title>

          <h5>Tipo:{pokemon.tipo}</h5>
          <h5>Id: {pokemon.id}</h5>
          <h5>Experiencia: {pokemon.experiencia}</h5>
          <h5>Altura: {pokemon.altura}</h5>
          <h5>Peso: {pokemon.peso}</h5>
          <h5>Habilidad: {pokemon.habilidad}</h5>
          <h5>Evolución: {pokemon.evolucion}</h5>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardDetail;
