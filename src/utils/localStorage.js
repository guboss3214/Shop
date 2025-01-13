export const getFromLocalStorage = (key, defaultValue = null) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};