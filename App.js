import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const colorCodes = {
  Black: '#000000',
  Brown: '#A52A2A',
  Red: '#FF0000',
  Orange: '#FFA500',
  Yellow: '#FFFF00',
  Green: '#008000',
  Blue: '#0000FF',
  Purple: '#800080',
  Grey: '#808080',
  White: '#FFFFFF',
  Gold: '#FFD700',
  Silver: '#C0C0C0'
};

const App = () => {
  const [bands, setBands] = useState(['Black', 'Black', 'Black', 'Black']);
  const [resistance, setResistance] = useState('0 Ohm');

  const changeBandColor = (index) => {
    const colors = Object.keys(colorCodes);
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newBands = [...bands];
    newBands[index] = newColor;
    setBands(newBands);
    calculateResistance(newBands);
  };

  const calculateResistance = (bands) => {
    const values = bands.map((band, index) => {
      const colorIndex = Object.keys(colorCodes).indexOf(band);
      return index < 2 ? colorIndex : index === 2 ? Math.pow(10, colorIndex) : null;
    });

    const resistanceValue = (values[0] * 10 + values[1]) * values[2];
    setResistance(`${resistanceValue} Ohm`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resistor Color Code</Text>
      <View style={styles.resistor}>
        {bands.map((band, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.band, { backgroundColor: colorCodes[band] }]}
            onPress={() => changeBandColor(index)}
          />
        ))}
      </View>
      <Text style={styles.resistance}>{resistance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  resistor: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  band: {
    width: 30,
    height: 100,
    marginHorizontal: 5,
  },
  resistance: {
    fontSize: 20,
  },
});

export default App;