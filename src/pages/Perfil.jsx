import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { eliminarCuenta, obtenerResenas, borrarResena } from "../services/api";
import "./Perfil.css";
import "./Feed.css"; 
function Perfil({ usuario, cerrarSesion }) {
  let [misResenas, setMisResenas] = useState([]);
  let [cargando, setCargando] = useState(true);
  let [error, setError] = useState("");
  let navigate = useNavigate();

  
  useEffect(
    function () {
      if (usuario === null) return;

      obtenerResenas()
        .then(function (todasLasResenas) {
          // Filtramos solo las reseñas que pertenezcan a este usuario
          let filtradas = todasLasResenas.filter(function (resena) {
            return resena.usuarioId === usuario._id;
          });
          setMisResenas(filtradas);
          setCargando(false);
        })
        .catch(function (err) {
          setError(err.message);
          setCargando(false);
        });
    },
    [usuario]
  );

  if (usuario === null) {
    return (
      <main className="perfil">
        <p className="perfil__error">Tienes que iniciar sesión para ver tu perfil.</p>
      </main>
    );
  }


  function handleEliminarCuenta() {
    let confirmado = window.confirm(
      "¿Estás seguro? Se eliminarán tu cuenta, tus reseñas y tus comentarios."
    );

    if (!confirmado) return;

    eliminarCuenta(usuario._id)
      .then(function () {
        cerrarSesion();
        navigate("/");
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  
  function handleBorrarResena(resenaId) {
    let confirmado = window.confirm("¿Seguro que quieres borrar esta reseña?");
    if (!confirmado) return;

    borrarResena(usuario._id, resenaId)
      .then(function () {
        // Actualizamos el estado para quitar la reseña eliminada de la pantalla
        let nuevasResenas = misResenas.filter(function (r) {
          return r._id !== resenaId;
        });
        setMisResenas(nuevasResenas);
      })
      .catch(function (err) {
        alert(err.message);
      });
  }

  return (
    <main className="perfil">
      <h1 className="perfil__titulo">Mi perfil</h1>

      <div className="perfil__tarjeta">
        <p className="perfil__dato">
          Usuario: <span>{usuario.username}</span>
        </p>
        <p className="perfil__dato">
          Reseñas publicadas: <span>{misResenas.length}</span>
        </p>
      </div>

      {}
      <section className="perfil__resenas-seccion">
        <h2 className="perfil__seccion-titulo">Mis reseñas</h2>

        {cargando ? (
          <p className="feed__cargando">Cargando tus reseñas...</p>
        ) : misResenas.length === 0 ? (
          <p className="perfil__vacio">Aún no has escrito ninguna reseña.</p>
        ) : (
          <ul className="feed__lista">
            {misResenas.map(function (resena) {
              return (
                <li key={resena._id} className="feed__elemento">
                  <Link to={"/resena/" + resena._id} className="tarjeta-resena">
                    
                    {}
                    {resena.portada && (
                      <img 
                        className="tarjeta-resena__portada" 
                        src={resena.portada} 
                        alt={resena.cancion} 
                      />
                    )}

                    <div className="tarjeta-resena__contenido">
                      <h3 className="tarjeta-resena__cancion">{resena.cancion}</h3>
                      <p className="tarjeta-resena__artista">{resena.artista}</p>
                      <span className="tarjeta-resena__nota">⭐ {resena.nota}/5</span>
                      <p className="tarjeta-resena__texto">{resena.texto}</p>
                    </div>
                  </Link>

                  <button
                    className="boton-borrar"
                    onClick={function () { handleBorrarResena(resena._id); }}
                  >
                    Borrar reseña
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <hr className="perfil__separador" />

      {}
      <div className="perfil__zona-peligro">
        <h2>Zona de peligro</h2>
        <p>Esta acción es irreversible. Se eliminarán tu cuenta, tus reseñas y tus comentarios.</p>
        <button
          className="perfil__boton-eliminar"
          onClick={handleEliminarCuenta}
        >
          Eliminar mi cuenta
        </button>
        {error !== "" && <p className="perfil__error">{error}</p>}
      </div>
    </main>
  );
}

export default Perfil;