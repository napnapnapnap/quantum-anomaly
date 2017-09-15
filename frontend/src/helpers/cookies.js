function setCookie(name, value, days) {
  let expiresDate = new Date();
  expiresDate.setTime(expiresDate.setTime(expiresDate.getTime() + (days * 24 * 60 * 60 * 1000)));
  let expiresString = 'expires=' + expiresDate.toUTCString();
  document.cookie   = name + '=' + value + ';' + expiresString + ';path=/';
}

function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie),
        cookieArray   = decodedCookie.split(';');
  let cookieValue;
  cookieArray.forEach(cookie => {
    let cookieParts = cookie.split('=');
    if (cookieParts[0] === name) {
      cookieValue = cookieParts[1].toString();
    }
  });
  return cookieValue;
}

function deleteAllCookies() {
  const cookieArray = document.cookie.split(';');
  cookieArray.forEach(cookie => {
    cookie = cookie.split('=');
    setCookie(cookie[0], cookie[1], -1000);
  });
}

export {
  setCookie,
  getCookie,
  deleteAllCookies
};
