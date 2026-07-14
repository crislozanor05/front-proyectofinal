import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerResenas, borrarResena } from "../services/api"; //[cite: 15]
import "./Feed.css";

function Feed({ usuario }) {
  let [resenas, setResenas] = useState([]); //[cite: 15]
  let [cargando, setCargando] = useState(true); //[cite: 15]
  let [error, setError] = useState(""); //[cite: 15]

  useEffect(function () {
    obtenerResenas() //[cite: 15]
      .then(function (datos) {
        setResenas(datos); //[cite: 15]
        setCargando(false); //[cite: 15]
      })
      .catch(function (err) {
        setError(err.message); //[cite: 15]
        setCargando(false); //[cite: 15]
      });
  }, []);

  if (cargando) {
    return <p className="feed__cargando">Cargando reseñas...</p>; //[cite: 15]
  }

  if (error !== "") {
    return <p className="feed__error">Error: {error}</p>; //[cite: 15]
  }

  function handleBorrarResena(resenaId) {
    let confirmado = window.confirm("¿Seguro que quieres borrar esta reseña?"); //[cite: 15]
    if (!confirmado) return; //[cite: 15]

    borrarResena(usuario._id, resenaId) //[cite: 15]
      .then(function () {
        let nuevasResenas = resenas.filter(function (r) { //[cite: 15]
          return r._id !== resenaId; //[cite: 15]
        });
        setResenas(nuevasResenas); //[cite: 15]
      })
      .catch(function (err) {
        alert(err.message); //[cite: 15]
      });
  }

  return (
    <main className="feed">
      <h1 className="feed__titulo">Feed de reseñas</h1> {/*[cite: 15] */}
      <p className="feed__subtitulo">
        {usuario !== null //[cite: 15]
          ? "¿Qué estás escuchando?" //[cite: 15]
          : "Inicia sesión para publicar tu propia reseña"} {/*[cite: 15] */}
      </p>

      {resenas.length === 0 ? (
        <p className="feed__vacio">Todavía no hay reseñas. ¡Sé el primero!</p> //[cite: 15]
      ) : (
        <ul className="feed__lista"> {/*[cite: 15] */}
          {resenas.map(function (resena) {
            return (
              <li key={resena._id} className="feed__elemento">
                <Link to={"/resena/" + resena._id} className="tarjeta-resena">
                  
                  {/* Portada de la canción (Si existe) */}
                  {resena.portada && (
                    <img 
                      className="tarjeta-resena__portada" 
                      src={resena.portada} 
                      alt={resena.cancion} 
                    />
                  )}

                  {/* Bloque de contenido */}
                  <div className="tarjeta-resena__contenido">
                    <h2 className="tarjeta-resena__cancion">{resena.cancion}</h2> {/*[cite: 15] */}
                    <p className="tarjeta-resena__artista">{resena.artista}</p> {/*[cite: 15] */}
                    <span className="tarjeta-resena__nota">⭐ {resena.nota}/5</span> {/*[cite: 15] */}
                    <p className="tarjeta-resena__texto">{resena.texto}</p> {/*[cite: 15] */}
                    <small className="tarjeta-resena__autor">Por {resena.nombreUsuario}</small> {/*[cite: 15] */}
                  </div>
                </Link>

                {usuario !== null && usuario._id === resena.usuarioId && ( //[cite: 15]
                  <button
                    className="boton-borrar"
                    onClick={function () { handleBorrarResena(resena._id); }} //[cite: 15]
                  >
                    Borrar reseña
                  </button> //[cite: 15]
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