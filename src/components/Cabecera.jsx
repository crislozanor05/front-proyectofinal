import { Link } from "react-router-dom";
import "./Cabecera.css";

function Cabecera({ usuario, cerrarSesion }) {
  return (
    <header className="cabecera">
      <Link to="/" className="cabecera__logo">MusicBox</Link>

      <nav>
        {/* Si hay usuario logueado mostramos unas opciones, si no otras.*/}
        {usuario !== null ? (
          <>
            <span className="cabecera__saludo">Hola, {usuario.username}</span>
            <Link to="/nueva-resena" className="cabecera__link--destacado">Nueva reseña</Link>
            <Link to="/perfil" className="cabecera__link">Mi perfil</Link>
            <button className="cabecera__boton-cerrar" onClick={cerrarSesion}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="cabecera__link">Iniciar sesión</Link>
            <Link to="/registro" className="cabecera__link--destacado">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Cabecera;