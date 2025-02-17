import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Grocery Calculator</Text>

      {/* New List Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Main', { isNew: true })}
      >
        <Text style={styles.buttonText}>➕ Create New List</Text>
      </TouchableOpacity>

      {/* Existing List Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Saved', { isNew: false })}
      >
        <Text style={styles.buttonText}>📋 View Existing Lists</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#145A32', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#27AE60', 
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
