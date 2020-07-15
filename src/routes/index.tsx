import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {useGeneral} from '../hooks/general';
import CurrentLocation from '../pages/CurrentLocation';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Routes: React.FC = () => {
  const {loading} = useGeneral();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      // tabBarOptions={{
      //   activeTintColor: '#000',
      //   showLabel: false,
      // }}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CurrentLocation"
        component={CurrentLocation}
        // options={{
        //   tabBarLabel: 'Local',
        //   tabBarIcon: ({color}) => (
        //     <Icon name="map-marker" color={color} size={30} />
        //   ),
        // }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
