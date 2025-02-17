import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalDisplay = ({ items }) => {
  const total = items
    .filter(item => item.checked && item.price)
    .reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TotalDisplay;
