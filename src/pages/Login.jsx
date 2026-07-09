import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../services/api";
import "./Formulario.css";

function Login({ iniciarSesion }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    loginUsuario(username, password)
      .then(function (datos) {
        iniciarSesion(datos.usuario);
        navigate("/");
      })
      .catch(function (err) {
        setError(err.message);
      });
  }

  return (
    <main className="formulario-pagina">
      <h1 className="formulario-pagina__titulo">Bienvenido</h1>
      <p className="formulario-pagina__subtitulo">Inicia sesión para compartir tu música</p>

      <form className="formulario" onSubmit={handleSubmit}>
        {error !== "" && <p className="formulario__error">{error}</p>}

        <div className="formulario__campo">
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={username}
            onChange={function (e) { setUsername(e.target.value); }}
            placeholder="Tu nombre de usuario"
          />
        </div>

        <div className="formulario__campo">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={function (e) { setPassword(e.target.value); }}
            placeholder="Tu contraseña"
          />
        </div>

        <button className="formulario__boton" type="submit">Entrar</button>
      </form>

      <p className="formulario__link">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </main>
  );
}

export default Login;