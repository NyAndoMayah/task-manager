const useLocalStorage = () => {
  const addItem = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  };
  const getItem = (key: string) => {
    return window.localStorage.getItem(key);
  };
  return { addItem, getItem };
};

export { useLocalStorage };
