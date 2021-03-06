import firebase from "./../repo/firebase";
import { getCurrentDate } from "./../global/util";
import { Alert } from "react-native";

// alert(firebase().database);
let dbRef = firebase().database().ref('/');

const updateUserLocation = (lat, long, phoneNumber) => {
    
    let locationRef = dbRef.child('users/'+ phoneNumber + "/location");
    let latLong = {
        lat : lat,
        long : long
    }
    locationRef.update(latLong).then(() => {}).catch(e => {})
}

const updateTruckLocationInAreaCode = (lat, long, areaCode, phoneNumber) => {
    let locationRef = dbRef.child('areaCode/'+ areaCode + "/" + getCurrentDate() + "/drivers/" + "/" + phoneNumber + "/location/real_time");
    let latLong = {
        lat : lat,
        long : long
    }
    locationRef.update(latLong).then(() => {}).catch(e => {})
}

const updateUserData = state => {
    let usersRef = dbRef.child('users/'+ state.phoneNumber + "/profile");
    return usersRef.update(state).then(() => {}).catch(e => {})
}

const updateTruckLocations = (lat, long, truckId) => {
    let latLong = {
        lat : lat,
        long : long
    }
    let usersRef = dbRef.child('trucks/real_time/'+ getCurrentDate() + "/" + truckId);
    return usersRef.update(latLong).then(() => { }).catch(e => { })
}

const updateTruckHistory = (lat, long, truckId) => {
    let latLong = {
        lat : lat,
        long : long
    }
    let usersRef = dbRef.child('trucks/history/'+ getCurrentDate() + "/" + truckId + "/" + new Date().getTime());
    return usersRef.update(latLong).then(() => {}).catch(() => {})
}

const getDriverLocations = userInfo => {
    return dbRef.child('mun/' + userInfo.municipality + "/wards/" +userInfo.areaCode + "/" + getCurrentDate());    
}

const getUserData = phoneNumber => {
    let usersRef = dbRef.child('users/'+ phoneNumber + "/profile");
    return usersRef.once('value', data => data);
}

const getAllAreas = () => {
    let usersRef = dbRef.child('munVsWards/');
    return usersRef.once('value', data => data);
} 

const updateUserInArea = userInfo => {
    if(!userInfo.municipality) return;
    let usersRef = dbRef.child('mun/' + userInfo.municipality + "/wards/" +userInfo.areaCode + "/users/" + userInfo.phoneNumber);    
    return usersRef.update(userInfo).then(() => {}).catch(() => {})
}

const updateUserToken = (userInfo, token) => {
    let usersRef = dbRef.child("users/" + userInfo.phoneNumber + "/profile");
    return usersRef.update({token}).then(() => {}).catch(() => {})
}

const updateUserLocationInWard = async (userInfo, lat, long) => {
    let usersRef = dbRef.child("users/" + userInfo.phoneNumber + "/location");
    let data = await usersRef.once('value', data => data);
    data = data.val();
    if(!data?.lat){
        return usersRef.update({lat, long}).then(() => {}).catch(() => {})
    }
}

const updateDriverStatus = (areaCode, phoneNumber, status) => {
    let usersRef = dbRef.child('areaCode/'+ areaCode + "/" + getCurrentDate() + "/drivers" + "/" + phoneNumber + "/status")
    return usersRef.update({status}).then(() => {}).catch(() => {})
}

const updateMapAreaCodeAndDriver = (userInfo) => {
    let usersRef = dbRef.child('areaCodeVsDriver/'+ userInfo.areaCode + "/" + userInfo.phoneNumber)
    return usersRef.update(userInfo).then(() => {}).catch(() => {})
}

export { updateUserLocation, updateUserData, getUserData, 
         getAllAreas, updateTruckLocations, updateTruckHistory, 
         getDriverLocations, updateTruckLocationInAreaCode, updateUserInArea,
         updateDriverStatus, updateMapAreaCodeAndDriver, updateUserToken,
         updateUserLocationInWard
    }