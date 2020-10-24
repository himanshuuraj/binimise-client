import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StatusBar, AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { setData } from "./../redux/action";
import { useDispatch, useSelector } from 'react-redux';
import Header from "./../components/header";
import { View, Text, Touch } from "./../ui-kit";
import DriverMarker from "./driverMarker";
import UserMarker from "./userMarker";
import { Color } from '../global/util';
import { updateUserLocation, updateUserLocationInWard, updateDriverStatus, updateUserToken, updateUserData } from "./../repo/repo";

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
  let { isDriverOn } = useSelector(state => state.testReducer) || {};

  useEffect(() => {
    getUserInfo();
    _getLocationAsync();
  }, []);

  showLocationSyncInstruction = () => {
    if(isDriver && !isDriverOn)
      showModal("You can toggle location syncing clicking top right button");
  }

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
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    toggleLoading(false);
    showLocationSyncInstruction();
    syncUserLocation(location);
  };

  syncUserLocation = location => {
    if(!isDriver && location.coords.latitude){
      updateUserLocation(location.coords.latitude, location.coords.longitude, userInfo.phoneNumber);
      setDataAction(location);
      updateUserLocationInWard(userInfo, location.coords.latitude, location.coords.longitude);
    }
  }

  toggleDriverOnOff = () => {
    toggleLoading(true);
    updateDriverStatus(userInfo.areaCode, userInfo.phoneNumber, !isDriverOn);
    setDataAction({isDriverOn : !isDriverOn});
    let message = "Driver location sync is ";
    if(isDriverOn) {
      message += "off !!!";
    } else {
      message += "on !!!";
    }
    showModal(message);
    toggleLoading(false);
  }

  return (
    <View >
      <View row ai c={"#fff"} ai w={"100%"} h={60} >
        <Header />
        <Text s={18} t={"Welcome"} />
        {
          isDriver && <Touch g t={isDriverOn ? 'OFF' : 'ON'} c={Color.white} jc w={100} h={40} a ri={10} br={8} onPress={toggleDriverOnOff}/>
        }
      </View>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        // onRegionChange={this._handleMapRegionChange}
      >
        { 
          isDriver ? <DriverMarker {...markerProps} isDriverOn={isDriverOn} /> : <UserMarker {...markerProps} />
        }
      </MapView>
    </View>
  );
}