import React from "react";
import { Button, Container, FormControl, InputGroup, Nav, Navbar } from "react-bootstrap";
import { logoutAsincrono } from "./redux/actions/actionLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbarapp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">PokeApi by JFGG</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/')}>Inicio</Nav.Link>
            
            <InputGroup className="mb-3">
  <InputGroup.Text>Pokemon a buscar</InputGroup.Text>
  <FormControl aria-label="Pokemon a buscar" />
  
  <Button variant="danger" onClick={()=> dispatch(logoutAsincrono())}>Cerrar sesion</Button>
</InputGroup>
          </Nav>
        </Container>        
      </Navbar>
    </div>
  );
};

export default Navbarapp;
