/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import HeaderLogo from './src/images/headerLogo.png';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/pages/Home';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import {Alert, Image, Text, TouchableOpacity} from 'react-native';
function App() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const LogOut = () => {
    Alert.alert('log out successfully');
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Ai Speech',
            headerStyle: {
              backgroundColor: '#20319D',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity onPress={() => LogOut()}>
                <Text style={{color: '#fff'}}>Log out</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <Image
                source={HeaderLogo}
                style={{width: 40, height: 40}}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
