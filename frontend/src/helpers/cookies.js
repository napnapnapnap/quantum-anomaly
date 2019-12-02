export function setCookie(name, value, minutes) {
  const expiresDate = new Date(),
        ttl = minutes * 60 * 1000;
  expiresDate.setTime(expiresDate.setTime(expiresDate.getTime() + ttl));
  document.cookie = `${name}=${value};expires=${expiresDate.toUTCString()};path=/`;
}

export function deleteCookie(name, value) {
  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.setTime(expiresDate.getTime() - 1000));
  document.cookie = `${name}=${value};expires=${expiresDate.toUTCString()};path=/`;
}

export function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie),
        cookieArray = decodedCookie.split('; ');

  let cookieValue = null;
  cookieArray.forEach((cookie) => {
    const cookieParts = cookie.split('=');
    if (cookieParts[0] === name) cookieValue = cookieParts[1].toString();
  });

  return cookieValue;
}

export function deleteAllCookies() {
  if (document.cookie !== '') {
    const cookieArray = document.cookie.split(';');

    cookieArray.forEach((cookie) => {
      const cookieParts = cookie.split('=');
      setCookie(cookieParts[0], cookieParts[1], -1000);
    });
  }
}
