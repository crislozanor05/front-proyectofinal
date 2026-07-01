import logo from './logo.svg';
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
  // El usuario logueado vive aqui, en el componente raiz.
  // Lo pasaremos por props a los componentes que lo necesiten,
  // igual que hicimos con los compositores y el puerto deportivo.
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
      {/* La Cabecera se muestra en todas las paginas, igual que en el ejercicio
          de compositores donde la cabecera estaba fuera de las Routes */}
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