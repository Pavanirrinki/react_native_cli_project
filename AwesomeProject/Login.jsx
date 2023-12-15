import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { API } from './API';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userdata,setUserdata] = useState('')
  useEffect(()=>{
    const user_detail =async ()=>{
      
const data = await AsyncStorage.getItem("user_details");
setUserdata(JSON.parse(data));
    }
    user_detail();
  },[])



  const handleSignUp = () => {
    axios.post(API+"User/Login",{email,password}).
    then(async (res)=>{
      await AsyncStorage.setItem("user_details",JSON.stringify(res.data));
    navigation.navigate("Details")}).catch((error)=>console.log(error.message));
    console.log(userdata,'userdata');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text)=>setEmail(text)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text)=>setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry
      />

     

      <Button title="Sign Up" onPress={handleSignUp} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Login;
