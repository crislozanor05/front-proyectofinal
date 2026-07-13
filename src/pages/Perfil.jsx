import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eliminarCuenta, actualizarUsername } from "../services/api";
import "./Perfil.css";

function Perfil({ usuario, cerrarSesion }) {
  let [error, setError] = useState("");
  let navigate = useNavigate();

  if (usuario === null) {
    return (
      <main className="perfil">
        <p>Tienes que iniciar sesión para ver tu perfil.</p>
      </main>
    );
  }
   function handleCambiarUsername(event) {
    event.preventDefault();
    setError("");
    setExito("");

    actualizarUsername(usuario._id, nuevoUsername)
      .then(function (datos) {
        // Actualizamos el usuario en el estado de App y en localStorage
        iniciarSesion(datos.usuario);
        setEditando(false);
        setNuevoUsername("");
        setExito("Nombre de usuario actualizado correctamente");
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  function handleEliminarCuenta() {
    let confirmado = window.confirm(
      "¿Estás seguro? Se eliminarán tu cuenta, tus reseñas y tus comentarios."
    );

    if (!confirmado) {
      return;
    }

    eliminarCuenta(usuario._id)
      .then(function () {
        cerrarSesion();
        navigate("/");
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  return (
   <main className="perfil">
      <h1 className="perfil__titulo">Mi perfil</h1>

      <div className="perfil__tarjeta">
        <p className="perfil__dato">
          Usuario: <span>{usuario.username}</span>
        </p>

        <hr className="perfil__separador" />

        {!editando ? (
          <button
            className="perfil__boton-editar"
            onClick={function () { setEditando(true); }}
          >
            Cambiar nombre de usuario
          </button>
        ) : (
          <form onSubmit={handleCambiarUsername} className="perfil__form">
            <label>Nuevo nombre de usuario</label>
            <input
              type="text"
              value={nuevoUsername}
              onChange={function (e) { setNuevoUsername(e.target.value); }}
              placeholder="Escribe el nuevo nombre"
            />
            <div className="perfil__form-botones">
              <button className="perfil__boton-guardar" type="submit">
                Guardar
              </button>
              <button
                className="perfil__boton-cancelar"
                type="button"
                onClick={function () {
                  setEditando(false);
                  setNuevoUsername("");
                  setError("");
                }}
              >
                Cancelar
              </button>
            </div>
            {error !== "" && <p className="perfil__error">{error}</p>}
          </form>
        )}

        {exito !== "" && <p className="perfil__exito">{exito}</p>}
      </div>

      <div className="perfil__zona-peligro">
        <h2>Zona de peligro</h2>
        <p>Esta acción es irreversible. Se eliminarán tu cuenta, tus reseñas y tus comentarios.</p>
        <button
          className="perfil__boton-eliminar"
          onClick={handleEliminarCuenta}
        >
          Eliminar mi cuenta
        </button>
      </div>
    </main>
  );
}

export default Perfil;