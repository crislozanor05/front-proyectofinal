import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerResena, obtenerComentarios, crearComentario } from "../services/api";

function DetalleResena({ usuario }) {
  let [resena, setResena] = useState(null);
  let [comentarios, setComentarios] = useState([]);
  let [textoComentario, setTextoComentario] = useState("");
  let [cargando, setCargando] = useState(true);
  let [error, setError] = useState("");

  // useParams igual que en M3-5: leemos el :id de la URL
  let params = useParams();
  let id = params.id;

  useEffect(function () {
    // Pedimos la reseña y sus comentarios al mismo tiempo con Promise.all,
    // igual que en el ejercicio de Rick y Morty
    Promise.all([
      obtenerResena(id),
      obtenerComentarios(id)
    ])
      .then(function (resultados) {
        setResena(resultados[0]);
        setComentarios(resultados[1]);
        setCargando(false);
      })
      .catch(function (err) {
        setError(err.message);
        setCargando(false);
      });
  }, [id]);

  function enviarComentario(event) {
    event.preventDefault();

    crearComentario(usuario._id, id, textoComentario)
      .then(function (nuevoComentario) {
        // Añadimos el nuevo comentario al array sin recargar la pagina,
        // igual que cuando añadiamos compositores al array en clase
        setComentarios([...comentarios, nuevoComentario]);
        setTextoComentario("");
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error !== "") {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>{resena.cancion}</h1>
      <h2>{resena.artista}</h2>
      <p>Nota: {resena.nota}/5</p>
      <p>{resena.texto}</p>
      <small>Por {resena.nombreUsuario}</small>

      <hr />

      <h3>Comentarios ({comentarios.length})</h3>

      {comentarios.length === 0 && <p>Todavía no hay comentarios.</p>}

      <ul>
        {comentarios.map(function (comentario) {
          return (
            <li key={comentario._id}>
              <strong>{comentario.nombreUsuario}</strong>
              <p>{comentario.texto}</p>
            </li>
          );
        })}
      </ul>

      {usuario !== null && (
        <form onSubmit={enviarComentario}>
          <textarea
            value={textoComentario}
            onChange={function (e) { setTextoComentario(e.target.value); }}
            placeholder="Escribe un comentario..."
            rows="3"
          />
          <button type="submit">Comentar</button>
        </form>
      )}

      {usuario === null && (
        <p>Inicia sesión para dejar un comentario.</p>
      )}
    </main>
  );
}

export default DetalleResena;