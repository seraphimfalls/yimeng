export const setString = (key, val) => {
  localStorage.setItem(key, val);
};

export const setObject = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const getString = key => {
  return localStorage.getItem(key);
};

export const getObject = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const remove = key => {
  return localStorage.removeItem(key);
};
