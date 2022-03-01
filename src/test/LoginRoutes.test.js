import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { LoginRoutes } from "../routes/LoginRoutes";
import Login from "../components/Login";
import Registro from "../components/Registro";


describe("Validar rutas con inicio de sesion", () => {
  test("Validar render de <LoginRoutes /> con <Login />", () => {
    const isLogin = true;
    const wrapper = shallow(
      <LoginRoutes isAuthenticated={isLogin} children={<Login />} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("Validar render de <LoginRoutes /> con <Registro />", () => {
    const isLogin = true;
    const wrapper = shallow(
        <LoginRoutes isAuthenticated={isLogin} children={<Registro />} />
      );
    expect(wrapper).toMatchSnapshot();
  });
});
