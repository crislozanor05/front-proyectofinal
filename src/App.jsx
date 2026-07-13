import './App.css';

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import NuevaResena from "./pages/NuevaResena";
import DetalleResena from "./pages/DetalleResena";
import Perfil from "./pages/Perfil";
import Cabecera from "./components/Cabecera";

function App() {
  // El usuario logueado se guarda aqui, en el componente raiz.
  let usuarioGuardado = localStorage.getItem("usuario");
  let [usuario, setUsuario] = useState(
    usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  );

  function iniciarSesion(datosUsuario) {
    setUsuario(datosUsuario);
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
  }

  function cerrarSesion() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  return (
    <BrowserRouter>
      {/* La Cabecera aparece en todas las paginas*/}
      <Cabecera usuario={usuario} cerrarSesion={cerrarSesion} />

      <Routes>
        <Route path="/" element={<Feed usuario={usuario} />} />
        <Route path="/login" element={<Login iniciarSesion={iniciarSesion} />} />
        <Route path="/registro" element={<Registro iniciarSesion={iniciarSesion} />} />
        <Route path="/nueva-resena" element={<NuevaResena usuario={usuario} />} />
        <Route path="/resena/:id" element={<DetalleResena usuario={usuario} />} />
        <Route path="/perfil" element={<Perfil usuario={usuario} cerrarSesion={cerrarSesion} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;