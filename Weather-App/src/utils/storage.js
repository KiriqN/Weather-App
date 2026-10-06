export function localStorageAvailable() {
  try {
    const Key = "__storage_test__";
    localStorage.setItem(Key, Key);
    localStorage.removeItem(Key);
    return true;
  } catch (e) {
    return false;
  }
}

export function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}
