import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';

interface SliderProps {
  value: number;
  onValueChange: (value: any) => void;
  completeSliding: () => void;
  onSlidingStart?: () => void;
}

const SliderComponent: React.FC<SliderProps> = ({
  value,
  onValueChange,
  completeSliding,
  onSlidingStart,
}) => {
  return (
    <View>
      <Text style={styles.score}>Risk score: {value}</Text>
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={0}
        maximumValue={10}
        step={1}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={completeSliding}
        minimumTrackTintColor="white"
        maximumTrackTintColor="black"
        thumbTintColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  score: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
});

export default SliderComponent;
