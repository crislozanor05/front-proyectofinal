import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearResena } from "../services/api";
import "./Formulario.css";

function NuevaResena({ usuario }) {
  // Estados para la búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);

  // Estados del formulario final
  const [cancionSeleccionada, setCancionSeleccionada] = useState(null); 
  const [nota, setNota] = useState("");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  if (usuario === null) {
    return (
      <main className="formulario-pagina">
        <p className="formulario__error">Tienes que iniciar sesión para escribir una reseña.</p>
      </main>
    );
  }

  // Lógica de búsqueda
  function handleBuscar(event) {
    event.preventDefault();
    if (!terminoBusqueda.trim()) return;

    setBuscando(true);
    setError("");

    fetch(`http://localhost:3001/buscador/canciones?q=${encodeURIComponent(terminoBusqueda)}`)
      .then(async function (res) {
        const datos = await res.json();
        if (!res.ok) throw new Error(datos.mensaje || "Error al buscar canciones");
        return datos;
      })
      .then(function (datos) {
        setResultados(datos);
        setBuscando(false);
      })
      .catch(function (err) {
        setError(err.message);
        setBuscando(false);
      });
  }

  // Envío del formulario
  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!cancionSeleccionada) {
      setError("Debes seleccionar una canción primero");
      return;
    }

    crearResena(usuario._id, {
      cancion: cancionSeleccionada.cancion,
      artista: cancionSeleccionada.artista,
      nota: nota,
      texto: texto,
      deezerId: cancionSeleccionada.deezerId, 
      portada: cancionSeleccionada.portada,   
    })
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
      <p className="formulario-pagina__subtitulo">
        {!cancionSeleccionada ? "Busca la canción que estás escuchando" : "Comparte lo que opinas sobre ella"}
      </p>

      {error !== "" && <p className="formulario__error">{error}</p>}

      {/* --- PASO A: BUSCADOR DE CANCIONES --- */}
      {!cancionSeleccionada ? (
        <div>
          <form className="formulario" onSubmit={handleBuscar}>
            <div className="formulario__campo">
              <label>Escribe el título o artista</label>
              <div className="buscador-inline">
                <input
                  type="text"
                  value={terminoBusqueda}
                  onChange={function (e) { setTerminoBusqueda(e.target.value); }}
                  placeholder="Ej: Starboy, Queen, Bad Bunny..."
                />
                <button className="formulario__boton" type="submit">
                  Buscar
                </button>
              </div>
            </div>
          </form>

          {buscando && <p className="buscador-cargando">Buscando en el catálogo...</p>}

          <div className="buscador-resultados">
            {resultados.map(function (track) {
              return (
                <div
                  key={track.deezerId}
                  className="cancion-tarjeta"
                  onClick={function () { setCancionSeleccionada(track); }}
                >
                  {track.portada && (
                    <img
                      className="cancion-tarjeta__portada"
                      src={track.portada}
                      alt={track.album}
                    />
                  )}
                  <div className="cancion-tarjeta__info">
                    <h4 className="cancion-tarjeta__titulo">{track.cancion}</h4>
                    <p className="cancion-tarjeta__detalles">
                      {track.artista} • <span className="cancion-tarjeta__album">{track.album}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* --- PASO B: FORMULARIO DE RESEÑA --- */
        <form className="formulario" onSubmit={handleSubmit}>
          
          <div className="seleccionada-tarjeta">
            {cancionSeleccionada.portada && (
              <img
                className="seleccionada-tarjeta__portada"
                src={cancionSeleccionada.portada}
                alt={cancionSeleccionada.album}
              />
            )}
            <div className="seleccionada-tarjeta__info">
              <h3 className="seleccionada-tarjeta__titulo">{cancionSeleccionada.cancion}</h3>
              <p className="seleccionada-tarjeta__artista">{cancionSeleccionada.artista}</p>
            </div>
            <button
              type="button"
              className="seleccionada-tarjeta__boton-cambiar"
              onClick={function () { setCancionSeleccionada(null); }}
            >
              Cambiar
            </button>
          </div>

          <div className="formulario__campo">
            <label>Nota (1-5)</label>
            <select
              value={nota}
              onChange={function (e) { setNota(e.target.value); }}
              required
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

          <button className="formulario__boton" type="submit">
            Publicar reseña
          </button>
        </form>
      )}
    </main>
  );
}

export default NuevaResena;