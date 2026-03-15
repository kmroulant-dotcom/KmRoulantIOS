import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MapScreen from './src/screens/MapScreen';

export default function App() {
  return (
    <PaperProvider>
      <MapScreen />
    </PaperProvider>
  );
}
