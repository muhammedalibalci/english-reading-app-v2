import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from '../Favorites'
import Books from '../Books'
import { Reading } from '../Reading'
import Icon from 'react-native-vector-icons/FontAwesome';

console.disableYellowBox = true



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer  >
      <Tab.Navigator initialRouteName="Books"   screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Books') {
            iconName = focused
              ? 'book'
              : 'book';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'th-list' : 'th-list';
          }
          else if (route.name === 'Reading') {
            iconName = focused ? 'chevron-right' : 'chevron-right';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          style: {
            padding:10,
          },
          labelStyle :{
            fontSize:12,
            fontFamily:'Roboto-Black'
          }
        }}
        >
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Books" component={Books} />
        <Tab.Screen name="Reading" component={Reading} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}