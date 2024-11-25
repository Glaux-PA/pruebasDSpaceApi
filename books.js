import { login } from "./auth.js";

const dspaceUrl = "https://une-dspace-backend.glaux.es/server/api";
const bookData = {
  name: "Libro prueba",
  metadata: {
    "dc.contributor.author": [
      {
        value: "Leonardo",
        language: null,
        authority: null,
        confidence: -1,
        place: 0,
      },
    ],
    "dc.title": [
      {
        value: "Libro prueba",
        language: null,
        authority: null,
        confidence: -1,
        place: 0,
      },
    ],
    "dc.identifier.uri": [
      {
        value: "https://une-dspace.glaux.es/handle/123456789/4",
        language: null,
        authority: null,
        confidence: -1,
        place: 0,
      },
    ],
    "dc.date.issued": [
      {
        value: "2024-01-01",
        language: null,
        authority: null,
        confidence: -1,
        place: 0,
      },
    ],
    "dc.type": [
      {
        value: "Book",
        language: null,
        authority: null,
        confidence: -1,
        place: 0,
      },
    ],
    "dspace.entity.type": [
      {
        value: "Book",
        language: null,
        authority: null,
        confidence: -1,
        place: 0,
      },
    ],
  },

  inArchive: true,
  discoverable: true,
  withdrawn: false,
};

// Funcion para crear un libro
async function crearItem(token, bookData, csrfToken, xsrfCookie) {
  try {
    const response = await fetch(
      `${dspaceUrl}/core/items?owningCollection=4b7108ae-5ba2-4c45-ab0b-f432ecd545e1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken,
          Cookie: xsrfCookie,
        },
        body: JSON.stringify(bookData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Item creado:", data);
      return data;
    } else {
      console.error("Error al crear el Item:", response);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

(async () => {
  const { jwtToken, csrfToken } = await login(
    "jose@glaux.es",
    "g@G57Wy#G%W^Yd4DjECWR@+"
  );

  const xsrfCookie = "DSPACE-XSRF-COOKIE=" + csrfToken; // Obtener la cookie de XSRF.
  crearItem(jwtToken, bookData, csrfToken, xsrfCookie);
})();
