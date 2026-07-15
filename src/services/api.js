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

// --- Reseñas ---
export function buscarEnDeezer(query) {
  return fetch(`${API_URL}/buscador/canciones?q=${encodeURIComponent(query)}`)
    .then(async function (res) {
      const datos = await res.json();
      if (!res.ok) throw new Error(datos.mensaje || "Error al buscar");
      return datos;
    });
}

export function obtenerResenas() {
  return peticion("/resenas");
}

export function obtenerResena(id) {
  return peticion("/resenas/" + id);
}

export function crearResena(userId, datosResena) {
  return fetch(`${API_URL}/resenas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({
      cancion: datosResena.cancion,
      artista: datosResena.artista,
      nota: datosResena.nota,
      texto: datosResena.texto,
      deezerId: datosResena.deezerId, // <-- Mandamos el ID del track
      portada: datosResena.portada,   // <-- Mandamos la URL de la carátula
    }),
  }).then(async function (res) {
    const datos = await res.json();
    if (!res.ok) throw new Error(datos.mensaje || "Error al crear la reseña");
    return datos;
  });
}


export function toggleLike(userId, resenaId) {
  return fetch(`${process.env.REACT_APP_API_URL}/resenas/${resenaId}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
  }).then(async function (res) {
    let datos = await res.json();
    if (!res.ok) {
      throw new Error(datos.mensaje || "Error al dar like");
    }
    return datos; // Nos devolverá { likes: [...] }
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