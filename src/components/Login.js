import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import "../styles/GoogleBtn.css";
import {
  loginGoogle,
  loginEmailPassword,
  loginFacebook,
} from "../redux/actions/actionLogin";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      dispatch(loginEmailPassword(data));
      // navigate("/");
    },
  });

  const handleGoogle = () => {
    dispatch(loginGoogle());
    // navigate("/");
  };
  const handleFacebook = () => {
    dispatch(loginFacebook());
    // navigate("/");
  };

  return (
    <div className="divlog">
      <form className="form-group" onSubmit={formik.handleSubmit}>
        <label>Correo electrónico</label>

        <input
          id="inputEmailSignIn"
          type="email"
          className="form-control mt-2"
          name="email"
          autoComplete="off"
          placeholder="Tu correo"
          required
          onChange={formik.handleChange}
        />
        <label>Contraseña</label>

        <input
          id="inputpasswordSignIn"
          type="password"
          className="form-control mt-2"
          name="password"
          autoComplete="off"
          placeholder="Ingresa tu contraseña"
          required
          onChange={formik.handleChange}
        />

        <br></br>
        <div className="d-grid gap-2 mx-auto mt-2">
          <Button value="Save" type="submit" variant="outline-primary">
            Ingresar
          </Button>
        </div>
        <p>Puedes probar con prueba@prueba.com | 123456</p>
        <br></br>

        <div className="google-btn" onClick={handleGoogle}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt=""
            />
          </div>
          <p className="btn-text">
            <b>Entrar con google</b>
          </p>
        </div>
        <br></br>

        <img
          onClick={handleFacebook}
          className="face-icon"
          src="https://scontent.feoh4-3.fna.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?_nc_cat=105&ccb=1-5&_nc_sid=ad8a9d&_nc_eui2=AeGuNfqzKUEqyoe9TXtNuhyTDpRKUGl8lBMOlEpQaXyUE0eONNlAaXo9dvUfEaw_MjOGEu0OH1fUkcPG06d-uBV4&_nc_ohc=7OIt3P9C1a4AX8w0tH8&_nc_ht=scontent.feoh4-3.fna&oh=00_AT80QfKiSQ3t8hZWNvUeCROBcCLzim25co5kFo0nb4Xi_g&oe=62216A16"
          alt=""
        />
        <br></br>
        <br></br>
        <h6 onClick={() => navigate("/registro")} className="linklogintitle">
          {" "}
          ¿Deseas crear una cuenta? Haz click aqui
        </h6>
      </form>
    </div>
  );
};

export default Login;
