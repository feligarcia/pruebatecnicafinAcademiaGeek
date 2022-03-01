import React from "react";
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
 
} from "react-bootstrap";
import { logoutAsincrono } from "../redux/actions/actionLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { actionSearch } from "../redux/actions/actionSearch";

const Navbarapp = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      search: "",
    },

    onSubmit: (data) => {
      dispatch(actionSearch(data.search));
    },
  });
  dispatch(actionSearch(formik.values.search));

  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            PokeApi by JFGG
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/") } >Inicio</Nav.Link>
            <p id='clickinicio'>.</p>
          </Nav>

          <form onSubmit={formik.handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Buscar pokemon</InputGroup.Text>
              <FormControl
                aria-label="Pokemon a buscar"
                name="search"
                id="search"
                onChange={formik.handleChange}
              />
              {isLogin ? (
                <>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(logoutAsincrono());
                      navigate("/");
                    }}
                  >
                    Cerrar sesion
                  </Button>
                  <img
                    alt=""
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    className="icon-avatar"
                    // onClick={() => window.open('/favorites','_self')}
                    onClick={() => navigate('/favorites')}
                    //al guardar pokemon se guarda objeto sin array y me muestra error, por eso se recarga favorites
                  />
                </>
              ) : (
                <Button variant="primary" onClick={() => navigate("/login")}>
                  Ingresar
                </Button>
              )}
            </InputGroup>
          </form>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarapp;
