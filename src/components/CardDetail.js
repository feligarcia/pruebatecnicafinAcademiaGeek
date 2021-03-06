import React, { useEffect, useState } from "react";
import {
  
  
  useNavigate,
  useParams,
} from "react-router-dom";
import { Card, Row, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { regisFavASincrono } from "../redux/actions/favActions";

const CardDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((resp) => {
        const detalle = resp.data;

        const poke = {
          id: detalle.id,
          nombre: detalle.name,
          foto: detalle.sprites.other.dream_world.front_default,
          tipo: detalle.types[0].type.name,
          tipo2: detalle.types[1]?.type.name,
          experiencia: detalle.base_experience,
          fotobt: detalle.sprites.back_default,
          fotobs: detalle.sprites.back_shiny,
          fotofs: detalle.sprites.front_shiny,
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

  const useruid = JSON.parse(localStorage.getItem("userPoke"))?.uid;

  return (
    <div>
      <Card className="cardpokemon">
        <Row>
          <Card.Img variant="top" src={pokemon.foto} className="imgpokefront" />
          <Card.Img
            variant="top"
            src={pokemon.fotobt}
            className="imgpokeback"
          />
          <Card.Img
            variant="top"
            src={pokemon.fotofs}
            className="imgpokeback"
          />
          <Card.Img
            variant="top"
            src={pokemon.fotobs}
            className="imgpokeback"
          />
        </Row>
        <Card.Body>
          <Card.Title>
            <h1>{pokemon.nombre}</h1>
          </Card.Title>
          <Card.Header>
            <Button
              variant="info"
              onClick={() => {
                if (useruid) {
                  dispatch(regisFavASincrono(pokemon, useruid));
                } else {
                  navigate("/login");
                }
              }}
            >
              Agregar <b>{pokemon.nombre}</b> a favoritos
            </Button>{" "}
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Tipo: {pokemon.tipo},{pokemon.tipo2}{" "}
            </ListGroup.Item>
            <ListGroup.Item>Experiencia: {pokemon.experiencia}</ListGroup.Item>

            <ListGroup.Item>Altura: {pokemon.altura}</ListGroup.Item>

            <ListGroup.Item>Peso: {pokemon.peso}</ListGroup.Item>

            <ListGroup.Item>Habilidad: {pokemon.habilidad}</ListGroup.Item>

            <ListGroup.Item>Evoluci??n: {pokemon.evolucion}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Detalles de: {pokemon.nombre} | id: {pokemon.id}
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardDetail;
