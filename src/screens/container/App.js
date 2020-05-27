import * as React from 'react';
import { Text, View, Button } from 'react-native';
import Favorites from '../Favorites'
import Books from '../Books'
import { Reading } from '../Reading'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Translate } from '../Translate';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

console.disableYellowBox = true




const BooksStack = createStackNavigator();

function BooksStackScreen({route}) {
  console.log("asdad",route);
  
  return (
    <BooksStack.Navigator>
      <BooksStack.Screen options={{headerShown:false}} name="Books" component={Books} />
      <FavoritesStack.Screen options={{headerShown:false}} name="Reading" component={Reading} />
      <FavoritesStack.Screen options={{title:"Google Translate",headerTitleStyle:{fontSize:wp('5%')}}} name="Translate" component={Translate} />
    </BooksStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator  >
      <FavoritesStack.Screen options={{headerShown:false}} name="Favorites" component={Favorites} />
      <FavoritesStack.Screen options={{headerShown:false}}  name="Reading" component={Reading} />
      <FavoritesStack.Screen options={{title:"Google Translate",headerTitleStyle:{fontSize:wp('5%')}}}  name="Translate" component={Translate} />
    </FavoritesStack.Navigator>
  );
}



const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer  >
      <Tab.Navigator initialRouteName="Books" screenOptions={({ route }) => ({
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
          activeTintColor: '#4285f4',
          inactiveTintColor: 'gray',
          style: {
            padding: 10,
          },
          labelStyle: {
            fontSize: 12,
            fontFamily: 'Roboto-Medium'
          },
        }}
      >
        <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
        <Tab.Screen name="Books" component={BooksStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}