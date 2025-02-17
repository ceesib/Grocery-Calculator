import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GroceryListScreen = ({ route, navigation }) => {
  const { list } = route.params; // Get the selected list
  const [items, setItems] = useState(list.items || []);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: list.name }); // Set screen title to list name
  }, []);

  const saveList = async (updatedItems) => {
    try {
      const savedLists = await AsyncStorage.getItem("groceryLists");
      let lists = savedLists ? JSON.parse(savedLists) : [];

      const updatedLists = lists.map((l) => (l.name === list.name ? { ...l, items: updatedItems } : l));
      await AsyncStorage.setItem("groceryLists", JSON.stringify(updatedLists));
    } catch (error) {
      console.error("Failed to save list:", error);
    }
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    const updatedItems = [...items, newItem.trim()];
    setItems(updatedItems);
    saveList(updatedItems);
    setNewItem("");
  };

  const deleteItem = (index) => {
    Alert.alert("Delete Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedItems = items.filter((_, i) => i !== index);
          setItems(updatedItems);
          saveList(updatedItems);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list.name}</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.item} onLongPress={() => deleteItem(index)}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new item..."
          value={newItem}
          onChangeText={setNewItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>➕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EAF2EF" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  item: { padding: 15, backgroundColor: "#D5F5E3", marginVertical: 5, borderRadius: 8 },
  itemText: { fontSize: 18 },
  inputContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, backgroundColor: "white" },
  addButton: { marginLeft: 10, backgroundColor: "#27AE60", padding: 10, borderRadius: 5 },
  addButtonText: { fontSize: 20, color: "white" },
});

export default GroceryListScreen;
