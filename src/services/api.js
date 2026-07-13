const API_URL = process.env.REACT_APP_API_URL;

// Función auxiliar para no repetir la lógica de fetch + manejo de errores
// en cada una de las funciones de abajo.
async function peticion(ruta, opciones = {}) {
  let respuesta = await fetch(API_URL + ruta, opciones);
  let datos = await respuesta.json();

  if (!respuesta.ok) {
    // Si el backend respondió con un código de error (400, 401, 404, 409...),
    // lanzamos un error con el mensaje que nos mandó el backend.
    throw new Error(datos.mensaje || "Ha ocurrido un error");
  }

  return datos;
}

// --- Usuarios ---

export function registrarUsuario(username, password) {
  return peticion("/usuarios/registro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export function loginUsuario(username, password) {
  return peticion("/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export function eliminarCuenta(userId) {
  return peticion("/usuarios/" + userId, {
    method: "DELETE",
    headers: { "x-user-id": userId },
  });
}
export function actualizarUsername(userId, nuevoUsername) {
  return peticion("/usuarios/" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({ username: nuevoUsername }),
  });
}

// --- Reseñas ---

export function obtenerResenas() {
  return peticion("/resenas");
}

export function obtenerResena(id) {
  return peticion("/resenas/" + id);
}

export function crearResena(userId, datosResena) {
  return peticion("/resenas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify(datosResena),
  });
}

// --- Comentarios ---

export function obtenerComentarios(resenaId) {
  return peticion("/comentarios/" + resenaId);
}

export function crearComentario(userId, resenaId, texto) {
  return peticion("/comentarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({ resenaId, texto }),
  });
}


export function borrarResena(userId, resenaId) {
  return peticion("/resenas/" + resenaId, {
    method: "DELETE",
    headers: { "x-user-id": userId },
  });
}

export function borrarComentario(userId, comentarioId) {
  return peticion("/comentarios/" + comentarioId, {
    method: "DELETE",
    headers: { "x-user-id": userId },
  });
}