import { types } from "../types/types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { facebook, google } from "../../firebaseConfig.js";

export const loginFacebook = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, facebook)
      .then(({ user }) => {
        // console.log(user);
        dispatch(
          loginSincronico(user.uid, user.displayName, user.photoURL)
        );
        console.log("Ingreso OK");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const loginGoogle = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, google)
      .then(({ user }) => {
        dispatch(
          loginSincronico(user.uid, user.displayName, user.photoURL)
        );
        console.log("Ingreso OK");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const loginEmailPassword = (logUser) => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, logUser.email, logUser.password)
      .then(({ user }) => {
        dispatch(loginSincronico(user.uid, user.displayName, user.photoURL));
        console.log("Ingreso OK");
      })
      .catch((e) => {
        console.log("El usuario no existe" + e);
      });
  };
};

export const loginSincronico = (uid, displayname,  image) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayname,      
      image,
    },
  };
};

export const logoutAsincrono = () => {
  return (dispatch) => {
    const auth = getAuth();
    signOut(auth)
      .then((user) => {
        dispatch(logoutSincrono());
        console.log("Ha salido satisfactoriamente");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const logoutSincrono = () => {
  return {
    type: types.logout,
    payload: {},
  };
};

export const createUserActionAsincrono = (newUser) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, {
          displayName: newUser.name,
          photoURL: newUser?.image,
        });
        dispatch(createUserActionSincro(newUser));
      })

      .catch((error) => console.log(error));
  };
};

export const createUserActionSincro = (user) => {
  return {
    type: types.register,
    payload: user,
  };
};
