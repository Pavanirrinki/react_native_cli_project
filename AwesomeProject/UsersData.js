import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from './API';

const UsersData = ({navigation}) => {
  const [all_users, setAll_users] = useState(null);
  const [particular_user, setParticular_user] = useState('');
  const [userdata, setUserdata] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('user_details');
        setUserdata(JSON.parse(data));

        if (JSON.parse(data)?.user?.roll.toString() === 'admin') {
          const adminRes = await axios.get(API + 'All_users',{
            headers:{
              'Content-Type': 'application/json',
              'x-token': JSON.parse(data)?.token,
            }
          });
          setAll_users(adminRes.data);
        } else if (JSON.parse(data)?.user?.roll.toString() === 'Employee') {
          const employeeRes = await axios.get(
            API + `LoggedIn_user/${JSON.parse(data)?.user?._id}`,{
              headers:{
                'Content-Type': 'application/json',
                'x-token': JSON.parse(data)?.token,
              }}
          );
          setParticular_user(employeeRes.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []); 
console.log(userdata)
console.log(particular_user,"particular")
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{JSON.stringify(item?.name)}</Text>
      <Text>{JSON.stringify(item?.mobile)}</Text>
      <Text>{JSON.stringify(item?.email)}</Text>
      <Text>{JSON.stringify(item?.designation)}</Text>
      <Text>{JSON.stringify(item?.roll)}</Text>
    </View>
  );

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogIn')}>
        <Button title="Log out" onPress={() => {
          AsyncStorage.removeItem("user_details");
          navigation.navigate("Home");
        }} />
      </TouchableOpacity>
      {userdata?.user?.roll.toString() === 'admin' && (
        <FlatList
          data={all_users?.all_users}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
      {userdata?.user?.roll.toString() === 'Employee'&&
      <View style={styles.box}>
      <Text>name:               {particular_user?.particular_user?.name}</Text>
      <Text>email:                  {particular_user?.particular_user?.email}</Text>
      <Text>mobile:             {particular_user?.particular_user?.mobile}</Text>
      <Text>designation:        {particular_user?.particular_user?.designation}</Text>
      <Text>role:               {particular_user?.particular_user?.roll}</Text>

      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  box: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UsersData;
