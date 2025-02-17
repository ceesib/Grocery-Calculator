import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    if (!itemName.trim()) return;
    
    onAddItem({ id: Date.now(), name: itemName, price: price || null, checked: false });
    setItemName('');
    setPrice('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter grocery item"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter price (optional)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
});

export default AddItemForm;
