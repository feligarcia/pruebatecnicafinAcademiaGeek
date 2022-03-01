import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { types } from "../types/types";

export const listFavASincrono = (useruid) => {
  return async (dispatch) => {
    const FavDB = collection(db, "favPoke");
    const queri = query(FavDB, where("useruid", "==", useruid));
    const FavDBPrev = await getDocs(queri);
    const favpokes = [];
    FavDBPrev.forEach((poke) => {
      favpokes.push({
        ...poke.data(),
      });
    });

    dispatch(listFavSincronico(favpokes));
  };
};

export const listFavSincronico = (favpokes) => {
  return {
    type: types.listarpoke,
    payload: favpokes,
  };
};

export const regisFavASincrono = (poke, useruid) => {
  return async (dispatch) => {
    const FavDB = collection(db, "favPoke");
    const queri = query(
      FavDB,
      where("id", "==", poke.id),
      where("useruid", "==", useruid)
    );
    const FavDBPrev = await getDocs(queri);
    let existe = false;
    FavDBPrev.forEach((pokefav) => {
      existe = true;
    });
    if (!existe) {
      const { nombre, id, foto, experiencia } = poke;
      const newpokefav = { nombre, id, foto, experiencia, useruid: useruid };

      addDoc(collection(db, "favPoke"), newpokefav)
        .then((resp) => {
          dispatch(regisFavSicrono(newpokefav));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const regisFavSicrono = (poke) => {
  return {
    type: types.registrarpoke,
    payload: poke,
  };
};

export const borrarFavASincro = (id, useruid) => {
  return async (dispatch) => {
    const FavDB = collection(db, "favPoke");
    const queri = query(
      FavDB,
      where("id", "==", id),
      where("useruid", "==", useruid)
    );

    const FavDBPrev = await getDocs(queri);
    FavDBPrev.forEach((pokefav) => {
      deleteDoc(doc(db, "favPoke", pokefav.id)).then((res) => {
        dispatch(borrarFavSINcrono(id));
      });
    });
  };
};

export const borrarFavSINcrono = (poke) => {
  return {
    type: types.borrarpoke,
    payload: poke,
  };
};
