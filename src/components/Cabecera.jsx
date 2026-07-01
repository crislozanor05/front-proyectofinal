import { Link } from "react-router-dom";

function Cabecera({ usuario, cerrarSesion }) {
  return (
    <header>
      <Link to="/">MusicBox</Link>

      <nav>
        {/* Si hay usuario logueado mostramos unas opciones, si no otras.*/}
        {usuario !== null ? (
          <>
            <span>Hola, {usuario.username}</span>
            <Link to="/nueva-resena">Nueva reseña</Link>
            <Link to="/perfil">Mi perfil</Link>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/registro">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Cabecera;