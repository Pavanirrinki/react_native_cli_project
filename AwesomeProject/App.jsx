import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Signup from './Signup';
import Login from './Login';
import UsersData from './UsersData';
import Home from './Home';
import { API } from './API';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

const Stack = createStackNavigator();

function App() {
  const [userdata,setUserdata] = useState(null)
  useEffect(()=>{
    const user_detail =async ()=>{
      
  const data = await AsyncStorage.getItem("user_details");
  setUserdata(JSON.parse(data));
    }
    user_detail();
  },[])
  console.log(userdata,'nulll');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userdata?.token ? "Home" : "Details"}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="Details" component={UsersData} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
     </NavigationContainer>

    // <Login />
    // <Signup />
  );
}

export default App;