import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Button title="Sign Up" onPress={() => console.log('Sign Up pressed')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogIn')}>
        <Button title="Log In" onPress={() => console.log('Log In pressed')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    margin: 'auto',
  },
  button: {
    marginRight: 20,
  },
});

export default Signup;
