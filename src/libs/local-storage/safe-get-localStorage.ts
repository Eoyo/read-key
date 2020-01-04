export default function safeGetLocalStorage(key: string) {
  try {
    const storeDataStr = localStorage.getItem(key);
    if (storeDataStr) {
      const storeData = JSON.parse(storeDataStr);
      return storeData;
    } else {
      return {};
    }
  } catch (err) {
    return {};
  }
}
