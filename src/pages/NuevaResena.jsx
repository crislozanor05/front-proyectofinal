import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearResena } from "../services/api";
import "./Formulario.css";

function NuevaResena({ usuario }) {
  let [cancion, setCancion] = useState("");
  let [artista, setArtista] = useState("");
  let [nota, setNota] = useState("");
  let [texto, setTexto] = useState("");
  let [error, setError] = useState("");

  let navigate = useNavigate();

  if (usuario === null) {
    return (
      <main className="formulario-pagina">
        <p>Tienes que iniciar sesión para escribir una reseña.</p>
      </main>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    crearResena(usuario._id, { cancion, artista, nota, texto })
      .then(function () {
        navigate("/");
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  return (
    <main className="formulario-pagina">
      <h1 className="formulario-pagina__titulo">Nueva reseña</h1>
      <p className="formulario-pagina__subtitulo">Comparte lo que estás escuchando</p>

      <form className="formulario" onSubmit={handleSubmit}>
        {error !== "" && <p className="formulario__error">{error}</p>}

        <div className="formulario__campo">
          <label>Canción</label>
          <input
            type="text"
            value={cancion}
            onChange={function (e) { setCancion(e.target.value); }}
            placeholder="Nombre de la canción"
          />
        </div>

        <div className="formulario__campo">
          <label>Artista</label>
          <input
            type="text"
            value={artista}
            onChange={function (e) { setArtista(e.target.value); }}
            placeholder="Nombre del artista"
          />
        </div>

        <div className="formulario__campo">
          <label>Nota (1-5)</label>
          <select
            value={nota}
            onChange={function (e) { setNota(e.target.value); }}
          >
            <option value="">-- Elige una nota --</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐ </option>
            <option value="3">⭐⭐⭐ </option>
            <option value="4">⭐⭐⭐⭐ </option>
            <option value="5">⭐⭐⭐⭐⭐ </option>
          </select>
        </div>

        <div className="formulario__campo">
          <label>Tu reseña</label>
          <textarea
            value={texto}
            onChange={function (e) { setTexto(e.target.value); }}
            placeholder="Cuéntanos qué te parece..."
            rows="4"
          />
        </div>

        <button className="formulario__boton" type="submit">Publicar reseña</button>
      </form>
    </main>
  );
}

export default NuevaResena;