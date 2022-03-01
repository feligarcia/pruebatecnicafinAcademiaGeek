import "@testing-library/jest-dom";
import { appReducer } from "../redux/reducers/appReducer";
import { regisFavSicrono } from "../redux/actions/favActions";
import { userReducer } from "../redux/reducers/userReducer";
import { types } from "../redux/types/types";

describe("Pruebas de redux de la app", () => {
  test("Validar types", () => {
    const typesTest = {
      listarpoke: "listar Pokemons",
      registrarpoke: "registrar Pokemons",
      borrarpoke: "borrar Pokemons",
      login: "Login User",
      register: "Register User",
      logout: "Logout User",
      search: "search Pokemon",
    };
    expect(typesTest).toEqual(types);
  });

  test("Validar userReducer", () => {
    const InitialState = {
      user: [],
    };

    const action = {
      type: types.register,
      payload: {
        uid: 1111 - 111 - 111,
        displayname: "Juan Prueba",
        photoURL: "www.google.com",
      },
    };

    const state = userReducer(InitialState, action);
    expect(state).toEqual({
      user: [
        {
          uid: 1111 - 111 - 111,
          displayname: "Juan Prueba",
          photoURL: "www.google.com",
        },
      ],
    });
  });

  test("Validar appReducer", () => {
    const InitialState = {
      favPokemons: [],
    };

    const action = {
      type: types.listarpoke,
      payload: {
        id: 150,
        nombre: "mew",
        foto: "www.google.com/fotomewpokemon",
        experiencia: "56",
        useruid: 1111 - 111 - 111,
      },
    };

    const state = appReducer(InitialState, action);
    expect(state).toEqual({
      favPokemons: 
        {
          id: 150,
          nombre: "mew",
          foto: "www.google.com/fotomewpokemon",
          experiencia: "56",
          useruid: 1111 - 111 - 111,
        },
      
    });
  })
  test("Validar registrar Pokemon", () => {
    const newpokefav = { nombre: 'mew', id:'150', foto:'www.google.com/imagenmew', experiencia: 152, useruid: 1111 - 111 - 111 }
    const regisFav = regisFavSicrono(newpokefav);
    expect(regisFav).toEqual({
      type: types.registrarpoke,
      payload: newpokefav
    });
  });
});
