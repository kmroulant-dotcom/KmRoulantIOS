import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Bienvenue sur mon app !</Text>
      <Button 
        mode="contained" 
        onPress={() => alert('Helloddd')} 
        style={styles.button}
      >
        Ordinaire
      </Button>
            <Button 
        mode="contained" 
        onPress={() => alert('Helloddd')} 
        style={styles.button}
      >
        Gravier
      </Button>
            <Button 
        mode="contained" 
        onPress={() => alert('Helloddd')} 
        style={styles.button}
      >
        Route
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    marginTop: 20,
  },
});

