import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerResenas, borrarResena, toggleLike } from "../services/api";
import "./Feed.css";

function Feed({ usuario }) {
  let [resenas, setResenas] = useState([]);
  let [cargando, setCargando] = useState(true);
  let [error, setError] = useState("");

  useEffect(function () {
    obtenerResenas()
      .then(function (datos) {
        setResenas(datos);
        setCargando(false);
      })
      .catch(function (err) {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className="feed__cargando">Cargando reseñas...</p>;
  }

  if (error !== "") {
    return <p className="feed__error">Error: {error}</p>;
  }

  function handleBorrarResena(resenaId) {
    let confirmado = window.confirm("¿Seguro que quieres borrar esta reseña?");
    if (!confirmado) return;

    borrarResena(usuario._id, resenaId)
      .then(function () {
        let nuevasResenas = resenas.filter(function (r) {
          return r._id !== resenaId;
        });
        setResenas(nuevasResenas);
      })
      .catch(function (err) {
        alert(err.message);
      });
  }

  function handleLike(resenaId) {
    if (!usuario) {
      alert("Debes iniciar sesión para dar me gusta");
      return;
    }

    toggleLike(usuario._id, resenaId)
      .then(function (datosActualizados) {
        
        let resenasActualizadas = resenas.map(function (resena) {
          if (resena._id === resenaId) {
            return { ...resena, likes: datosActualizados.likes };
          }
          return resena;
        });
        setResenas(resenasActualizadas);
      })
      .catch(function (err) {
        alert(err.message);
      });
  }

  return (
    <main className="feed">
      <h1 className="feed__titulo">Feed de reseñas</h1> {}
      <p className="feed__subtitulo">
        {usuario !== null
          ? "¿Qué estás escuchando?"
          : "Inicia sesión para publicar tu propia reseña"}{" "}
        {}
      </p>
      {resenas.length === 0 ? (
        <p className="feed__vacio">Todavía no hay reseñas. ¡Sé el primero!</p>
      ) : (
        <ul className="feed__lista">
          {" "}
          {}
          {resenas.map(function (resena) {
            return (
              <li
                key={resena._id}
                className="feed__elemento tarjeta-resena-contenedor"
              >
                {}
                <Link to={"/resena/" + resena._id} className="tarjeta-resena">
                  {resena.portada && (
                    <img
                      className="tarjeta-resena__portada"
                      src={resena.portada}
                      alt={resena.cancion}
                    />
                  )}

                  <div className="tarjeta-resena__contenido">
                    <h2 className="tarjeta-resena__cancion">
                      {resena.cancion}
                    </h2>
                    <p className="tarjeta-resena__artista">{resena.artista}</p>
                    <span className="tarjeta-resena__nota">
                      ⭐ {resena.nota}/5
                    </span>
                    <p className="tarjeta-resena__texto">{resena.texto}</p>
                    <small className="tarjeta-resena__autor">
                      Por {resena.nombreUsuario}
                    </small>
                  </div>
                </Link>

                {}
                <div className="tarjeta-resena__acciones">
                  {}
                  <button
                    type="button"
                    className={`boton-like ${resena.likes?.includes(usuario?._id) ? "boton-like--activo" : ""}`}
                    onClick={function (e) {
                      e.preventDefault(); 
                      handleLike(resena._id);
                    }}
                  >
                    {resena.likes?.includes(usuario?._id) ? "❤️" : "🤍"}
                    <span className="boton-like__contador">
                      {resena.likes ? resena.likes.length : 0}
                    </span>
                  </button>

                  {}
                  {usuario !== null && usuario._id === resena.usuarioId && (
                    <button
                      className="boton-borrar-tarjeta"
                      onClick={function (e) {
                        e.preventDefault();
                        handleBorrarResena(resena._id);
                      }}
                    >
                      Borrar
                    </button>
                  )}
                </div>

                {}
                {resena.previewUrl && (
                  <div className="contenedor-reproductor-tarjeta">
                    <audio src={resena.previewUrl} controls />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Feed;
