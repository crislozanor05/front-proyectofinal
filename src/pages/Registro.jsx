import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/api";

function Registro({ iniciarSesion }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  let navigate = useNavigate();

  function cambiarUsername(event) {
    setUsername(event.target.value);
  }

  function cambiarPassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    registrarUsuario(username, password)
      .then(function (datos) {
        // Tras registrarse, inicia sesion automaticamente
        iniciarSesion(datos.usuario);
        navigate("/");
      })
      .catch(function (err) {
        // Aqui llegaran los mensajes de validacion:
        // "Ese nombre de usuario ya está en uso"
        // "La contraseña debe tener al menos 8 caracteres"
        setError(err.message);
      });
  }

  return (
    <main>
      <h1>Crear cuenta</h1>

      {error !== "" && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={username}
            onChange={cambiarUsername}
          />
        </div>

        <div>
          <label>Contraseña (mínimo 8 caracteres)</label>
          <input
            type="password"
            value={password}
            onChange={cambiarPassword}
          />
        </div>

        <button type="submit">Crear cuenta</button>
      </form>
    </main>
  );
}

export default Registro;