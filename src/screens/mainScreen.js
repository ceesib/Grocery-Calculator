import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React, { useState, useCallback, useRef } from 'react';

const MAX_STACK_SIZE = 100;

export default function MainScreen() {
  const [text, setText] = useState('');
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Calculate total items and cost
  const calculateStats = useCallback((input) => {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const itemCount = lines.length;
    
    const total = lines
      .map(line => {
        // Match any number (integer or decimal) in the line
        const numbers = line.match(/\d+\.?\d*/g);
        // Take the last number in the line as the price
        return numbers ? parseFloat(numbers[numbers.length - 1]) : 0;
      })
      .reduce((sum, price) => sum + price, 0);

    return { itemCount, total };
  }, []);

  const { itemCount, total } = calculateStats(text);

  // Animation value for the stats container
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Animate stats when they change
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [total, itemCount]);

  // Handle text changes
  const handleTextChange = (newText) => {
    if (newText !== text) {
      setUndoStack(prevStack => 
        [...prevStack, text].slice(-MAX_STACK_SIZE)
      );
      setRedoStack([]);
      setText(newText);
    }
  };

  // Undo last change
  const undo = () => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack];
      const lastState = newUndoStack[newUndoStack.length - 1];
      setUndoStack(newUndoStack.slice(0, -1));
      setRedoStack(prevStack => [...prevStack, text]);
      setText(lastState);
    }
  };

  // Redo last undone change
  const redo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const nextState = newRedoStack[newRedoStack.length - 1];
      setRedoStack(newRedoStack.slice(0, -1));
      setUndoStack(prevStack => [...prevStack, text]);
      setText(nextState);
    }
  };

  // Clear the list with confirmation
  const clearList = () => {
    if (text.trim() === '') return;

    Alert.alert(
      "Clear List",
      "Are you sure you want to clear your grocery list?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear",
          onPress: () => {
            setUndoStack(prevStack => [...prevStack, text]);
            setRedoStack([]);
            setText('');
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Grocery Calculator</Text>
        <Animated.View 
          style={[
            styles.statsContainer,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Items</Text>
            <Text style={styles.statValue}>{itemCount}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{total.toFixed(2)}</Text>
          </View>
        </Animated.View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Enter items with prices (e.g. Milk 3.99)"
            placeholderTextColor="#999"
            value={text}
            onChangeText={handleTextChange}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.undoButton, undoStack.length === 0 && styles.buttonDisabled]} 
            onPress={undo} 
            disabled={undoStack.length === 0}
          >
            <Text style={[styles.buttonText, undoStack.length === 0 && styles.buttonTextDisabled]}>
              Undo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.redoButton, redoStack.length === 0 && styles.buttonDisabled]} 
            onPress={redo} 
            disabled={redoStack.length === 0}
          >
            <Text style={[styles.buttonText, redoStack.length === 0 && styles.buttonTextDisabled]}>
              Redo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.clearButton, !text && styles.buttonDisabled]} 
            onPress={clearList}
            disabled={!text}
          >
            <Text style={[styles.buttonText, !text && styles.buttonTextDisabled]}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 200,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    padding: 15,
    textAlignVertical: 'top',
    color: '#333',
    minHeight: 200,
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  undoButton: {
    backgroundColor: '#4a90e2',
  },
  redoButton: {
    backgroundColor: '#5a9ee2',
  },
  clearButton: {
    backgroundColor: '#e25a5a',
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#999',
  },
});