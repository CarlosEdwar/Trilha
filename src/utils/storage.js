export function safeGetItem(key, defaultValue) {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null || value === undefined) return defaultValue;
    return JSON.parse(value);
  } catch (error) {
    console.warn('Error reading from localStorage', error);
    return defaultValue;
  }
}

export function safeSetItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Error writing to localStorage', error);
  }
}
