import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cabecera.css";

function Cabecera({ usuario, cerrarSesion }) {
  // Estado para controlar si el menú hamburguesa está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);

  function toggleMenu() {
    setMenuAbierto(!menuAbierto);
  }

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <header className="cabecera">
      <Link to="/" className="cabecera__logo" onClick={cerrarMenu}>
        MusicBox
      </Link>

      {/* Bloque central/derecho que SÍ se ve en móvil por defecto */}
      <div className="cabecera__visibles-movil">
        {usuario && (
          <>
            <span className="cabecera__saludo">Hola, {usuario.username}</span>
            <Link to="/nueva" className="cabecera__boton-publicar" onClick={cerrarMenu}>
              Publicar reseña
            </Link>
          </>
        )}
      </div>

      {/* Botón de Hamburguesa (Solo visible en móviles) */}
      <button 
        className={`cabecera__hamburguesa ${menuAbierto ? "cabecera__hamburguesa--activo" : ""}`} 
        onClick={toggleMenu}
        aria-label="Menú de navegación"
      >
        <span className="barra"></span>
        <span className="barra"></span>
        <span className="barra"></span>
      </button>

      {/* Navegación (Se convierte en menú desplegable en móviles) */}
      <nav className={`cabecera__nav ${menuAbierto ? "cabecera__nav--abierto" : ""}`}>
        <Link to="/" className="cabecera__link" onClick={cerrarMenu}>
          Inicio
        </Link>
        
        {usuario ? (
          <>
            <Link to="/perfil" className="cabecera__link" onClick={cerrarMenu}>
              Mi Perfil
            </Link>
            <button 
              className="cabecera__boton-cerrar" 
              onClick={function() {
                cerrarSesion();
                cerrarMenu();
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="cabecera__link" onClick={cerrarMenu}>
              Iniciar sesión
            </Link>
            <Link to="/registro" className="cabecera__link" onClick={cerrarMenu}>
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Cabecera;