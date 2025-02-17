import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  static async saveList(name, items) {
    try {
      let lists = await AsyncStorage.getItem("groceryLists");
      lists = lists ? JSON.parse(lists) : [];
      
      const newList = { name, items };
      lists.push(newList);
      
      await AsyncStorage.setItem("groceryLists", JSON.stringify(lists));
      return true;
    } catch (error) {
      console.error("Failed to save list:", error);
      return false;
    }
  }

  static async getLists() {
    try {
      const data = await AsyncStorage.getItem("groceryLists");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load lists:", error);
      return [];
    }
  }

  static async deleteList(index) {
    try {
      let lists = await AsyncStorage.getItem("groceryLists");
      lists = lists ? JSON.parse(lists) : [];
      
      lists.splice(index, 1);
      await AsyncStorage.setItem("groceryLists", JSON.stringify(lists));
      
      return true;
    } catch (error) {
      console.error("Failed to delete list:", error);
      return false;
    }
  }
}

export default Storage;
