import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedListScreen = ({ navigation }) => {
  const [savedLists, setSavedLists] = useState([]);

  useEffect(() => {
    loadSavedLists();
  }, []);

  const loadSavedLists = async () => {
    try {
      const data = await AsyncStorage.getItem("groceryLists");
      if (data) {
        setSavedLists(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to load saved lists:", error);
    }
  };

  const deleteList = async (index) => {
    Alert.alert("Delete List", "Are you sure you want to delete this list?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const updatedLists = savedLists.filter((_, i) => i !== index);
            setSavedLists(updatedLists);
            await AsyncStorage.setItem("groceryLists", JSON.stringify(updatedLists));
          } catch (error) {
            console.error("Failed to delete list:", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Lists</Text>
      <FlatList
        data={savedLists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate("GroceryListScreen", { list: item })}
            onLongPress={() => deleteList(index)}
          >
            <Text style={styles.listText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EAF2EF" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  listItem: { padding: 15, backgroundColor: "#D5F5E3", marginVertical: 5, borderRadius: 8 },
  listText: { fontSize: 18, fontWeight: "600" },
});

export default SavedListScreen;
