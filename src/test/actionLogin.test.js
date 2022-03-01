import "@testing-library/jest-dom";
import { loginSincronico, logoutSincrono } from "../redux/actions/actionLogin";
import { types } from "../redux/types/types";

describe("Pruebas de autenticacion", () => {
  test("Validacion de login", () => {
    const uid = 1111-111-111
    const displayname = "Felipe";
    const image = "www.google.com";

    const loginAction = loginSincronico(uid, displayname, image);
    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayname,
        image,
      },
    });
  });

  test("Validacion de loggout", () => {
    const actionLoggout = logoutSincrono();
    expect(actionLoggout).toEqual({
      type: types.logout,
      payload: {},
    });
  });
});
