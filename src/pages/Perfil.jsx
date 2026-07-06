import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eliminarCuenta } from "../services/api";

function Perfil({ usuario, cerrarSesion }) {
  let [error, setError] = useState("");
  let navigate = useNavigate();

  if (usuario === null) {
    return (
      <main>
        <p>Tienes que iniciar sesión para ver tu perfil.</p>
      </main>
    );
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
    <main>
      <h1>Mi perfil</h1>
      <p>Usuario: {usuario.username}</p>

      {error !== "" && <p>{error}</p>}

      <hr />

      <h2>Zona de peligro</h2>
      <button onClick={handleEliminarCuenta}>
        Eliminar mi cuenta
      </button>
    </main>
  );
}

export default Perfil;