import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';

interface SliderProps {
  value: number;
  onValueChange: (value: any) => void;
}

const SliderComponent: React.FC<SliderProps> = ({value, onValueChange}) => {
  return (
    <View>
      <Text style={styles.score}>Risk score: {value}</Text>
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={0}
        maximumValue={10}
        step={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  score: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default SliderComponent;
