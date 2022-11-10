function removeStorage(name) {
  localStorage.removeItem(name);
  localStorage.removeItem(name + "_expiresIn");
}

export function getStorage(key) {
  var now = Date.now();
  var expiresIn = localStorage.getItem(key + "_expiresIn");
  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0;
  }

  if (expiresIn < now) {
    removeStorage(key);
    return null;
  }

  var value = localStorage.getItem(key);
  return value;
}

export function setStorage(key, value, expires) {
  if (expires === undefined || expires === null) {
    expires = 24 * 60 * 60;
  } else {
    expires = Math.abs(expires);
  }

  var now = Date.now();
  var schedule = now + expires * 1000;
  localStorage.setItem(key, value);
  localStorage.setItem(key + "_expiresIn", schedule);
}
