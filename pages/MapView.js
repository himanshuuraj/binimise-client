import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { setData } from "./../redux/action";
import { useDispatch, useSelector } from 'react-redux';
import Header from "./../components/header";
import MapView from 'react-native-maps';
import { View, Text } from "./../ui-kit";
import UserMarker from "./userMarker";
import { updateUserLocation, updateUserLocationInWard, updateUserToken } from "./../repo/repo";

export default () => {

  const [location, setLocation] = useState({coords: { latitude: 20.9517, longitude: 85.0985}});
  const [isDriver, setIsDriver] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  let markerProps = {
    isDriver : isDriver,
    userInfo : userInfo
  }

  const dispatch = useDispatch();
  const setDataAction = (arg) => dispatch(setData(arg));

  useEffect(() => {
    getUserInfo();
    _getLocationAsync();
  }, []);

  getUserInfo = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    if(!userInfo) return;
    userInfo = JSON.parse(userInfo);
    setUserInfo(userInfo);
    setDataAction({ userInfo });
    setIsDriver(userInfo?.userType === "driver");
    if(userInfo?.userType !== "driver") {
      setTimeout(async () => {
        let token = await AsyncStorage.getItem("token");
        updateUserToken(userInfo, token);
      }, 3000);
    }
  }

  toggleLoading = show => {
    dispatch(setData({"loading": {show}}));
  }

  showModal = message => {
    setDataAction({
      errorModalInfo : {
        showModal : true,
        message,
      }
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== "granted"){
      showModal("PLEASE GRANT LOCATION PERMISSION");
      return;
    }
    toggleLoading(true);
    try{
      var location = await Location.getCurrentPositionAsync({});
    }catch(err){
      showModal("There is some problem in fetching location details. Please restart the app or manually give permissions");
      return;
    }
    setLocation(location);
    toggleLoading(false);
    syncUserLocation(location);
  };

  syncUserLocation = location => {
    if(location.coords.latitude){
      updateUserLocation(location.coords.latitude, location.coords.longitude, userInfo.phoneNumber);
      setDataAction(location);
      updateUserLocationInWard(userInfo, location.coords.latitude, location.coords.longitude);
    }
  }

  return (
    <View >
      <View row ai c={"#fff"} ai w={"100%"} h={60} >
        <Header />
        <Text s={18} t={"Welcome"} />
      </View>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        // onRegionChange={this._handleMapRegionChange}
      >
        <UserMarker {...markerProps} />
        <MapView.Marker
          coordinate={{
              latitude: location.coords?.latitude,
              longitude: location.coords?.longitude
          }} />
      </MapView>
    </View>
  );
}