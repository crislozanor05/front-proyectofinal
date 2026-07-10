import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerResena, obtenerComentarios, crearComentario, borrarComentario } from "../services/api";
import "./DetalleResena.css";

function DetalleResena({ usuario }) {
  let [resena, setResena] = useState(null);
  let [comentarios, setComentarios] = useState([]);
  let [textoComentario, setTextoComentario] = useState("");
  let [cargando, setCargando] = useState(true);
  let [error, setError] = useState("");

  let params = useParams();
  let id = params.id;

  useEffect(function () {
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
        setComentarios([...comentarios, nuevoComentario]);
        setTextoComentario("");
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  if (cargando) {
    return <p className="feed__cargando">Cargando...</p>;
  }

  if (error !== "") {
    return <p className="feed__error">Error: {error}</p>;
  }

  function handleBorrarComentario(comentarioId) {
  let confirmado = window.confirm("¿Seguro que quieres borrar este comentario?");
  if (!confirmado) return;

  borrarComentario(usuario._id, comentarioId)
    .then(function () {
      let nuevosComentarios = comentarios.filter(function (c) {
        return c._id !== comentarioId;
      });
      setComentarios(nuevosComentarios);
    })
    .catch(function (err) {
      alert(err.message);
    });
}

  return (
    <main className="detalle">
      <Link to="/" className="detalle__volver">← Volver al feed</Link>

      <h1 className="detalle__cancion">{resena.cancion}</h1>
      <p className="detalle__artista">{resena.artista}</p>
      <span className="detalle__nota">⭐ {resena.nota}/5</span>
      <p className="detalle__texto">{resena.texto}</p>
      <small className="detalle__autor">Por {resena.nombreUsuario}</small>

      <hr className="detalle__separador" />

      <h2 className="detalle__titulo-comentarios">
        Comentarios ({comentarios.length})
      </h2>

      {comentarios.length === 0 && (
        <p className="comentarios__vacio">Todavía no hay comentarios. ¡Sé el primero!</p>
      )}

      <ul className="comentarios__lista">
        {comentarios.map(function (comentario) {
  return (
    <li key={comentario._id} className="comentario">
      <p className="comentario__autor">{comentario.nombreUsuario}</p>
      <p className="comentario__texto">{comentario.texto}</p>

      {usuario !== null && usuario._id === comentario.usuarioId && (
        <button
          className="boton-borrar"
          onClick={function () { handleBorrarComentario(comentario._id); }}
        >
          Borrar
        </button>
      )}
    </li>
  );
})}
      </ul>

      {usuario !== null ? (
        <form className="comentarios__form" onSubmit={enviarComentario}>
          <textarea
            value={textoComentario}
            onChange={function (e) { setTextoComentario(e.target.value); }}
            placeholder="Escribe un comentario..."
            rows="3"
          />
          <button className="comentarios__boton" type="submit">Comentar</button>
        </form>
      ) : (
        <p className="comentarios__aviso">
          <Link to="/login">Inicia sesión</Link> para dejar un comentario.
        </p>
      )}
    </main>
  );
}

export default DetalleResena;