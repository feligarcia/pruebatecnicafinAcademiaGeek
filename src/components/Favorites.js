import React, { useEffect } from "react";
import { Badge, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { borrarFavASincro, listFavASincrono } from "../redux/actions/favActions";
import Loader from "./Loader";

const Favorites =  () => {
  const dispatch = useDispatch();
  const useruid = JSON.parse(localStorage.getItem("userPoke"))?.uid;
  useEffect(() => {
    dispatch(listFavASincrono(useruid));
  }, []);
   const { favPokemons } = useSelector((store) => store.app);


  return (
    <div>
      <h1>Favoritos</h1>
      <Row xs={1} md={2} className="g-4">
        <ListGroup as="ol" numbered>
          {favPokemons ? (
            favPokemons?.map((e) => (
              
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  key={e.id}
                >
                  <div className="ms-2 me-auto">
                    <img alt='' src={e.foto} />
                    <div className="fw-bold">{e.nombre}</div>
                   Experiencia: {e.experiencia}
                  </div>
                  <Badge bg="danger" pill onClick={()=>dispatch(borrarFavASincro(e.id, e.useruid))}>
                    Eliminar
                  </Badge>
                </ListGroup.Item>
                
            
            ))
          ) : (
            <Loader />
          )}
        </ListGroup>
      </Row>
    </div>
  );
};

export default Favorites;
