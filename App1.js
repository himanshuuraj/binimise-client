import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

import firebaseSetup from "./repo/firebaseSetup";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';

export default function App() {

  const {auth} = firebaseSetup();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    let navigator = {
      geolocation : {
        getCurrentPosition : Geolocation.getCurrentPosition
      }
    };
    navigator.geolocation.getCurrentPosition(position => {
      alert(position.coords.latitude);
    }, 
    error => {
      alert(error.message);
    },
    {
      enableHighAccuracy: true, timeout: 20000, maximumAge: 2000
    })
  });

  const signInWithPhoeNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    alert(JSON.stringify(confirmation));
    setConfirm(confirmation);
  }

  const confirmCode = async () => {
    try {
        await confirm.confirm(code);
        alert("SignedIn successfully");
    }catch(err){
      alert(JSON.stringify(err));
    }
  }

  return <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="Notconfirm" />
      {/* <Button title="SignIn" onPress={() => {
        signInWithPhoeNumber('+917022623975');
        Alert.alert('Simple Button pressed')
      }} />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setCode(text)}
        value={code}
      />
      <Button title="Confirm" onPress={() => {
        confirmCode();
      }} /> */}
      <MapView provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
      }}>
      </MapView>

  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: 500,
    borderWidth: 1,
    borderColor: "#000",
    width: 800
  }
});
