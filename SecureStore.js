import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteItemAsync = async (key) => {
  return await AsyncStorage.removeItem(key);
};

export const getItemAsync = async (key) => {
  return await AsyncStorage.getItem(key);
};

export const setItemAsync = async (key, data) => {
  return await AsyncStorage.setItem(key, data);
};
