import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainScreen from './screens/mainScreen'; // Import your home screen component
import loadingScreen from './screens/loadingScreen'; // Import your loading screen component
import homeScreen from './screens/homeScreen'; // Import your home screen component
import GroceryListScreen from './screens/groceryListScreen'; // Import your grocery list screen component
import SavedListScreen from './screens/savedListScreen'; // Import your saved list screen component
//import AppNavigator from './Navigation/appNavigator'; // Import your app navigator component


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data, setting up)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Loading" component={loadingScreen} />
        ) : (
          <>
          <Stack.Screen name="Home" component={homeScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Saved" component={SavedListScreen} />
          <Stack.Screen name="GroceryList" component={GroceryListScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});