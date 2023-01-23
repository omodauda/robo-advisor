import React, {useCallback, useEffect, useState} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SliderComponent from './components/Slider';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [sliderValue, setSliderValue] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [isSliding, setIsSliding] = useState(false);

  const handleSlidingComplete = () => {
    // setIsSliding(false);
    getData();
  };

  const getData = useCallback(async () => {
    console.log('i was called');
    setLoading(true);
    const data = await fetch(`http://localhost:3000?riskScore=${sliderValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await data.json();
    console.log(response);
    setLoading(false);
  }, [sliderValue]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.content}>
        <SliderComponent
          value={sliderValue}
          onValueChange={value => setSliderValue(value[0])}
          completeSliding={handleSlidingComplete}
        />
        {loading && <ActivityIndicator />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
});

export default App;
