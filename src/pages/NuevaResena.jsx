import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearResena } from "../services/api";

function NuevaResena({ usuario }) {
  let [cancion, setCancion] = useState("");
  let [artista, setArtista] = useState("");
  let [nota, setNota] = useState("");
  let [texto, setTexto] = useState("");
  let [error, setError] = useState("");

  let navigate = useNavigate();

  // Si no hay usuario logueado, no dejamos acceder a esta pagina
  if (usuario === null) {
    return (
      <main>
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
    <main>
      <h1>Nueva reseña</h1>

      {error !== "" && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Canción</label>
          <input
            type="text"
            value={cancion}
            onChange={function (e) { setCancion(e.target.value); }}
          />
        </div>

        <div>
          <label>Artista</label>
          <input
            type="text"
            value={artista}
            onChange={function (e) { setArtista(e.target.value); }}
          />
        </div>

        <div>
          <label>Nota (1-5)</label>
          <select
            value={nota}
            onChange={function (e) { setNota(e.target.value); }}
          >
            <option value="">-- Elige una nota --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <label>Tu reseña</label>
          <textarea
            value={texto}
            onChange={function (e) { setTexto(e.target.value); }}
            rows="4"
          />
        </div>

        <button type="submit">Publicar reseña</button>
      </form>
    </main>
  );
}

export default NuevaResena;