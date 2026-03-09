import { StatusBar } from 'expo-status-bar';
import {useEffect} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { getLaunches } from './services/api';

export default function App() {
  useEffect(() => {
    console.log("useEffekt funkar!");
    getLaunches();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>RocketPocket</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e17', // mörk rymd-bakgrund
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});