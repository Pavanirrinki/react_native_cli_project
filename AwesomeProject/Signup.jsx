import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { API } from './API';
import axios from 'axios';
const Signup = ({navigation}) => {
  const [name,SetName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber,setMobileNumber] = useState('');
  const [designation,setDesignation] = useState("")
  const [userType, setUserType] = useState('employee');

 const handleSignUp = () => {
axios.post(API+"User/Signup",{name,email,password,designation,mobile:mobileNumber,roll:userType}).
then((res)=>{
  console.log(res.data)
navigation.navigate("LogIn")
}).catch((error)=>console.log(error.message));
  };
  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  return (
    <View style={styles.container}>
       <Text style={styles.label}>Name:</Text>
       <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text)=>SetName(text)}
      />
         <Text style={styles.label}>Mobile No:</Text>
         <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={(text)=>setMobileNumber(text)}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(Text)=>setEmail(Text)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(Text)=>setPassword(Text)}
        placeholder="Enter your password"
        secureTextEntry
      />

<Text style={styles.label}>Designation:</Text>
       <TextInput
        style={styles.input}
        placeholder="Enter your designation"
         value={designation}
        onChangeText={(text)=>setDesignation(text)}
      />
 <Text>Select User Type:</Text>
 <RadioButton.Group onValueChange={handleUserTypeChange} value={userType}>
 <View style={{ flexDirection: 'row', alignItems: 'center' }}>

  <View style={styles.radioButtonContainer}>
    <Text>Admin</Text>
    <RadioButton value="admin" />
  </View>

  <View style={styles.radioButtonContainer}>
    <Text>Employee</Text>
    <RadioButton value="employee" />
  </View>
 
</View>
</RadioButton.Group>
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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, 
  },
});

export default Signup;
