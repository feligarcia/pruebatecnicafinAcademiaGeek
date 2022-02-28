import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createUserActionAsincrono } from "../redux/actions/actionLogin";
import { imgUpload } from "../functions/imgUpload";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Registro = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageURL, setimageURL] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      image: "",
    },
    onSubmit: (data) => {
      data.image = imageURL;
      dispatch(createUserActionAsincrono(data));
    },
  });

  const handleFileChanged = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    imgUpload(file)
      .then((response) => {
        setimageURL(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="divlog">
      <form className="form-group" onSubmit={formik.handleSubmit}>
        <label>Nombre</label>
        <input
          id="inputName"
          type="text"
          className="form-control mt-2"
          name="name"
          autoComplete="off"
          placeholder="Ingresa tu nombre"
          required
          onChange={formik.handleChange}
        />
        <label>Correo electrónico</label>
        <input
          id="inputEmail"
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
          id="inputpassword"
          type="password"
          className="form-control mt-2"
          name="password"
          autoComplete="off"
          placeholder="Configura una contraseña"
          required
          onChange={formik.handleChange}
        />
        <label>Imagen para tu perfil</label>
        <input
          id="inputImage"
          type="file"
          className="form-control "
          placeholder="Adjuntar una imagen"
          name="image"
          required
          onChange={handleFileChanged}
        />
        <br></br>
        <div className="d-grid gap-2 mx-auto mt-2">
          <Button value="Save" type="submit" variant="outline-primary">
            Registrar
          </Button>
        </div>
        <br></br>
        <h6 onClick={() => navigate("/login")} className="linklogintitle">
          ¿Ya tienes una cuenta? Haz click aqui
        </h6>
      </form>
    </div>
  );
};

export default Registro;
