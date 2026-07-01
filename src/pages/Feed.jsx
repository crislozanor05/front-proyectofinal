import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerResenas } from "../services/api";

function Feed({ usuario }) {
  let [resenas, setResenas] = useState([]);
  let [cargando, setCargando] = useState(true);
  let [error, setError] = useState("");

  // Al cargar la pagina, traemos todas las reseñas de la API.
  // Array vacio [] para que solo se ejecute una vez
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
    return <p>Cargando reseñas...</p>;
  }

  if (error !== "") {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>Reseñas</h1>

      {usuario !== null && (
        <Link to="/nueva-resena">+ Escribir una reseña</Link>
      )}

      {resenas.length === 0 ? (
        <p>Todavía no hay reseñas. ¡Sé el primero!</p>
      ) : (
        <ul>
          {resenas.map(function (resena) {
            return (
              <li key={resena._id}>
                <Link to={"/resena/" + resena._id}>
                  <h2>{resena.cancion}</h2>
                  <p>{resena.artista}</p>
                  <p>Nota: {resena.nota}/5</p>
                  <p>{resena.texto}</p>
                  <small>Por {resena.nombreUsuario}</small>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Feed;