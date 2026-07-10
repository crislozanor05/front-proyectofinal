import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerResenas, borrarResena } from "../services/api";
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
      // Quitamos la reseña del array sin recargar, igual que con los compositores
      let nuevasResenas = resenas.filter(function (r) {
        return r._id !== resenaId;
      });
      setResenas(nuevasResenas);
    })
    .catch(function (err) {
      alert(err.message);
    });
}

  return (
    <main className="feed">
      <h1 className="feed__titulo">Feed de reseñas</h1>
      <p className="feed__subtitulo">
        {usuario !== null
          ? "¿Qué estás escuchando?"
          : "Inicia sesión para publicar tu propia reseña"}
      </p>

      {resenas.length === 0 ? (
        <p className="feed__vacio">Todavía no hay reseñas. ¡Sé el primero!</p>
      ) : (
        <ul className="feed__lista">
          {resenas.map(function (resena) {
  return (
    <li key={resena._id}>
      <Link to={"/resena/" + resena._id} className="tarjeta-resena">
        <h2 className="tarjeta-resena__cancion">{resena.cancion}</h2>
        <p className="tarjeta-resena__artista">{resena.artista}</p>
        <span className="tarjeta-resena__nota">⭐ {resena.nota}/5</span>
        <p className="tarjeta-resena__texto">{resena.texto}</p>
        <small className="tarjeta-resena__autor">Por {resena.nombreUsuario}</small>
      </Link>

      {usuario !== null && usuario._id === resena.usuarioId && (
        <button
          className="boton-borrar"
          onClick={function () { handleBorrarResena(resena._id); }}
        >
          Borrar reseña
        </button>
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