import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

const GroceryItem = ({ item, toggleItem }) => {
  return (
    <View style={styles.itemContainer}>
      <Checkbox
        status={item.checked ? 'checked' : 'unchecked'}
        onPress={() => toggleItem(item.id)}
      />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price ? `$${item.price}` : 'No Price'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GroceryItem;
