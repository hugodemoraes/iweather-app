import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import AppProvider from './hooks';
import Routes from './routes';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App: React.FC = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <SafeAreaView style={styles.safeAreaView}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </SafeAreaView>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
