import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import RTNCalculator from 'rtn-calculator/js/NativeRTNCalculator';



const App: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const [x, setX] = useState<string>('');
  const [y, setY] = useState<string>('');

  const handleCompute = useCallback(async () => {
    const numX = parseInt(x, 10);
    const numY = parseInt(y, 10);

    if (!isNaN(numX) && !isNaN(numY)) {
      try {
        const value = await RTNCalculator?.add(numX, numY);
        setResult(value ?? null);
      } catch (error) {
        console.error('Error computing result:', error);
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [x, y]);

  // Clear the result when either input is cleared
  useEffect(() => {
    if (x === '' || y === '') {
      setResult(null);
    }
  }, [x, y]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter value for x"
          value={x}
          onChangeText={setX}
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter value for y"
          value={y}
          onChangeText={setY}
          returnKeyType="done"
        />
      </View>
      <Button title={`Compute ${x} + ${y}`} onPress={handleCompute} />
      {result !== null && (
        <Text style={styles.resultText}>
          {`Compute ${x} + ${y} = ${result}`}
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
});

export default App;
