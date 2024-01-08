import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageCreateOrUpdateItem = async (key: string, value: any) => {
  console.log('storageCreateOrUpdateItem', key, value);
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Item with key "${key}" created successfully.`);
  } catch (error) {
    console.error(`Error creating item with key "${key}":`, error);
  }
};

export const storageReadItem = async (key: string, role?: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error reading item with key "${key}":`, error);
    return null;
  }
};

export const storageDeleteItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Item with key "${key}" deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting item with key "${key}":`, error);
  }
};
