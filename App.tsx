import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SliderComponent from './components/Slider';
import PieChart from 'react-native-pie-chart';
import STOCK_DATA from './mock/stocks';

interface StockDataProps {
  alternative: number;
  nigerianStocks: number;
  commodities: number;
  emergingStocks: number;
  foreignBonds: number;
  foreignStocks: number;
  nigerianBonds: number;
  realEstate: number;
  tBills: number;
  techStocks: number;
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [sliderValue, setSliderValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState<number[]>([]);
  const [stockData, setStockData] = useState<StockDataProps>();

  const handleSlidingComplete = () => {
    getData();
  };

  const colors = {
    alternative: 'gray',
    commodities: 'blue',
    emerging: '#820000',
    foreignBond: '#B05A7A',
    foreignStock: 'black',
    nigerianBond: '#03C988',
    nigerianStock: 'yellow',
    realEstate: '#FC7300',
    tBills: '#FF0032',
    techStock: '#CF4DCE',
  };

  const sliceColor = [
    colors.nigerianStock, // nigerian stocks
    colors.foreignStock, // foreign stocks
    colors.techStock, // tech stocks
    colors.emerging, // emerging stocks
    colors.nigerianBond, // nigerian bonds
    colors.foreignBond, // foreign bonds
    colors.commodities, // commodities
    colors.realEstate, // real estate
    colors.tBills, // tBills
    colors.alternative, // alternative
  ];

  const getData = useCallback(async () => {
    setLoading(true);
    const _data = STOCK_DATA.find(data => data.score === sliderValue);
    setStockData(_data!.stocks);
    let newSeries: number[] = [];
    Object.values(_data!.stocks).map(stock => {
      newSeries.push(stock);
    });
    setSeries(newSeries);
    setLoading(false);
  }, [sliderValue]);

  useEffect(() => {
    getData();
  }, [getData]);

  function renderView() {
    if (loading) {
      return <ActivityIndicator size={'large'} color="white" />;
    } else if (loading === false && series.length !== 0) {
      return (
        <View style={[styles.chart]}>
          <PieChart
            widthAndHeight={280}
            series={series}
            sliceColor={sliceColor}
          />
        </View>
      );
    }
  }

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
        {renderView()}

        <View style={styles.columnView}>
          <View>
            <View style={styles.info}>
              <View
                style={[styles.box, {backgroundColor: colors.nigerianStock}]}
              />
              <Text style={styles.text}>
                Nigerian Stocks- {stockData?.nigerianStocks}%
              </Text>
            </View>
            <View style={styles.info}>
              <View
                style={[styles.box, {backgroundColor: colors.nigerianBond}]}
              />
              <Text style={styles.text}>
                Nigerian Bonds- {stockData?.nigerianBonds}%
              </Text>
            </View>
            <View style={styles.info}>
              <View
                style={[styles.box, {backgroundColor: colors.realEstate}]}
              />
              <Text style={styles.text}>
                Real Estate- {stockData?.realEstate}%
              </Text>
            </View>
            <View style={styles.info}>
              <View style={[styles.box, {backgroundColor: colors.techStock}]} />
              <Text style={styles.text}>
                Tech Stocks- {stockData?.techStocks}%
              </Text>
            </View>
            <View style={styles.info}>
              <View
                style={[styles.box, {backgroundColor: colors.alternative}]}
              />
              <Text style={styles.text}>
                Alternatives- {stockData?.alternative}%
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.info}>
              <View style={[styles.box, {backgroundColor: colors.emerging}]} />
              <Text style={styles.text}>
                Emerging Stocks- {stockData?.emergingStocks}%
              </Text>
            </View>
            <View style={styles.info}>
              <View
                style={[styles.box, {backgroundColor: colors.commodities}]}
              />
              <Text style={styles.text}>
                Commodities- {stockData?.commodities}%
              </Text>
            </View>
            <View style={styles.info}>
              <View
                style={[styles.box, {backgroundColor: colors.foreignStock}]}
              />
              <Text style={styles.text}>
                Foreign Stocks- {stockData?.foreignStocks}%
              </Text>
            </View>
            <View style={styles.info}>
              <View
                style={[styles.box, {backgroundColor: colors.foreignBond}]}
              />
              <Text style={styles.text}>
                Foreign Bonds- {stockData?.foreignBonds}%
              </Text>
            </View>
            <View style={styles.info}>
              <View style={[styles.box, {backgroundColor: colors.tBills}]} />
              <Text style={styles.text}>T-Bills- {stockData?.tBills}%</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#655BE0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  chart: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },
  columnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  box: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default App;
