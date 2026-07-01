import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/api";

function Login({ iniciarSesion }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  // useNavigate nos permite navegar a otra pagina desde codigo JavaScript, sin que el usuario tenga que hacer click en un Link.
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

    loginUsuario(username, password)
      .then(function (datos) {
        // Guardamos el usuario en el estado de App (a traves de la prop iniciarSesion)
        iniciarSesion(datos.usuario);
        // Redirigimos al feed
        navigate("/");
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  return (
    <main>
      <h1>Iniciar sesión</h1>

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
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={cambiarPassword}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}

export default Login;