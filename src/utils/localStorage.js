export const clearStorage = () => localStorage.clear();

export const getItemFromStorage = (key) => {
  if (!localStorage) {
    return;
  }

  try {
    const value = localStorage.getItem(key);
    try {
      // parse object
      return JSON.parse(value);
    } catch (err) {
      // parse string only
      return value;
    }
  } catch (err) {
    console.log(`Error getting item ${key} from localStorage`, err);
  }
};

export const removeItemFromStorage = (key) => {
  if (!localStorage) {
    return;
  }

  try {
    return localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error removing item ${key} from localStorage`, err);
  }
};

export const storeItem = (key, value) => {
  if (!localStorage) {
    return;
  }

  try {
    return localStorage.setItem(key, value);
  } catch (err) {
    console.error(`Error storing item ${key} to localStorage`, err);
  }
};

export const getSelfId = () => {
  const user = getItemFromStorage('user');
  if (!user) {
    return undefined;
  }
  return user.id;
}

export const getBrand = () => {
  const user = getItemFromStorage('user');
  return user.brand;
}

export const getRole = () => {
  const user = getItemFromStorage('user');
  return user.role;
}

export const getEosName = () => {
  const user = getItemFromStorage('user');
  if (!user) {
    return undefined;
  }
  return user.eosName;
}

export const getEncryptedPrivateKey = () => {
  const user = getItemFromStorage('user');
  if (!user) {
    return undefined;
  }
  return user.encryptedPrivateKey;
}