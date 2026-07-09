import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../services/api";
import "./Formulario.css";

function Registro({ iniciarSesion }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    registrarUsuario(username, password)
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
      <h1 className="formulario-pagina__titulo">Crear cuenta</h1>
      <p className="formulario-pagina__subtitulo">Únete a la comunidad de música</p>

      <form className="formulario" onSubmit={handleSubmit}>
        {error !== "" && <p className="formulario__error">{error}</p>}

        <div className="formulario__campo">
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={username}
            onChange={function (e) { setUsername(e.target.value); }}
            placeholder="Elige un nombre de usuario"
          />
        </div>

        <div className="formulario__campo">
          <label>Contraseña (mínimo 8 caracteres)</label>
          <input
            type="password"
            value={password}
            onChange={function (e) { setPassword(e.target.value); }}
            placeholder="Mínimo 8 caracteres"
          />
        </div>

        <button className="formulario__boton" type="submit">Crear cuenta</button>
      </form>

      <p className="formulario__link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </main>
  );
}

export default Registro;