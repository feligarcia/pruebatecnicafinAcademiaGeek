import React, { useEffect, useState } from "react";
import { Card, ListGroup, Row } from "react-bootstrap";
// import { getPokemon } from "./getPokemons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const ListCard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const { search } = useSelector((store) => store.app);
  useEffect(() => {
    if (isLoading) {
      const getPokemon = () => {
        const lista = [];
        axios
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

  const filterPoke = (search, poke) => {
    search = search?.toLocaleLowerCase();
    return poke.filter((pokemon) =>
      pokemon.nombre.toLocaleLowerCase().includes(search)
    );
  };
  const pokefiltrado = filterPoke(search, pokemons);

  console.log(pokemons);  
  console.log(isLoading);
  if (isLoading) {
    return <Loader />;
  }
  console.log(pokemons);
  console.log(isLoading);
  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {pokefiltrado.map((pokemon) => (
          <Card
            key={pokemon.id}
            onClick={() => handleCardDetail(pokemon.id)}
            className="cardpoke"
          >
            <Card.Img variant="top" src={pokemon.foto} className="imgpoke" />
            <Card.Body>
              <Card.Title>{pokemon.nombre}</Card.Title>
              <Card.Header>Id:{pokemon.id} </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Tipo: {pokemon.tipo},{pokemon.tipo2}{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  Experiencia: {pokemon.experiencia}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default ListCard;
