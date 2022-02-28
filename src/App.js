import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ListCard from "./ListCard";
import Navbarapp from "./Navbarapp";
import CardDetail from "./CardDetail";
import Login from "./Login";
import Registro from "./Registro";


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbarapp />
        <Routes>
          <Route path="/" element={<ListCard />} />
          <Route path="/pokemon/:id" element={<CardDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
