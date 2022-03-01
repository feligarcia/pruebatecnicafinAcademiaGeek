import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import ListCard from "../containers/ListCard";
import Navbarapp from "../components/Navbarapp";
import CardDetail from "../components/CardDetail";
import Login from "../components/Login";
import Registro from "../components/Registro";
import Favorites from "../components/Favorites";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginRoutes } from "./LoginRoutes";

function App() {
  const [checking, setChecking] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLogin(true);
        const { uid, displayName, photoURL } = user;
        const sesion = {  uid, displayName, photoURL };
        localStorage.setItem("userPoke", JSON.stringify(sesion));
      } else {
        setIsLogin(false);
        localStorage.removeItem("userPoke");
      }
      setChecking(false);
    });
  }, [setChecking, setIsLogin]);

  if (checking) {
    return <Loader />;
  }
  return (
    <div className="App">
      <HashRouter>
        <Navbarapp isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<ListCard />} />
          <Route path="/pokemon/:id" element={<CardDetail />} />        
          <Route path="/favorites" element={<Favorites />} />

          <Route
            path="/login"
            element={
              <LoginRoutes isAuthenticated={isLogin}>
                <Login />
              </LoginRoutes>
            }
          />
          <Route
            path="/registro"
            element={
              <LoginRoutes isAuthenticated={isLogin}>
                <Registro />
              </LoginRoutes>
            }
          />

          
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
