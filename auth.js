const dspaceUrl = "https://une-dspace-backend.glaux.es/server/api";

// Función para obtener CSRF Token
export async function getCsrfToken() {
  try {
    const response = await fetch(`${dspaceUrl}/security/csrf`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `La petición fetch no se ha completado correctamente: ${response.statusText}`
      );
    }
    const csrfToken = response.headers.get("DSPACE-XSRF-TOKEN");

    const setCookieHeader = response.headers.get("set-cookie");
    const xsrfCookie = setCookieHeader ? setCookieHeader.split(";")[0] : null;

    if (!csrfToken || !xsrfCookie) {
      throw new Error("No se pudo obtener el CSRF Token o la cookie");
    }
    return { csrfToken, xsrfCookie };
  } catch (error) {
    console.error("Error:", error.sa);
    return null;
  }
}

// Función para autenticar
export async function login(username, password) {
  const { csrfToken, xsrfCookie } = await getCsrfToken();

  const response = await fetch(`${dspaceUrl}/authn/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-XSRF-TOKEN": csrfToken,
      Cookie: xsrfCookie,
    },
    body: new URLSearchParams({
      user: username,
      password: password,
    }),
  });

  const jwtToken = response.headers.get("authorization").split(" ")[1];
  return { jwtToken, csrfToken };
}
