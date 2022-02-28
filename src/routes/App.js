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

function App() {
  const [checking, setChecking] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLogin(true);
        const {displayName, email, photoURL} = user
        const sesion = {displayName,email,photoURL}
        localStorage.setItem('userPoke', JSON.stringify(sesion))
      } else {
        setIsLogin(false);
        localStorage.removeItem('userPoke')
      }
      setChecking(false);
    });
  }, [setChecking, setIsLogin]);

  if (checking) {
    return <Loader />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbarapp isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<ListCard />} />
          <Route path="/pokemon/:id" element={<CardDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
