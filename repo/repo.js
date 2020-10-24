import firebase from "./../repo/firebase";
import { getCurrentDate } from "./../global/util";

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

const getDriverLocations = (areaCode) => {
    return dbRef.child('areaCode/'+ areaCode + "/" + getCurrentDate());
}

const getUserData = phoneNumber => {
    let usersRef = dbRef.child('users/'+ phoneNumber + "/profile");
    return usersRef.once('value', data => data);
}

const getAllAreas = () => {
    let usersRef = dbRef.child('areas/');
    return usersRef.once('value', data => data);
} 

const updateUserInArea = userInfo => {
    let usersRef = dbRef.child('areaCode/' + userInfo.areaCode + "/" + getCurrentDate() + "/users/" + userInfo.phoneNumber);
    return usersRef.update(userInfo).then(() => {}).catch(() => {})
}

const updateUserToken = (userInfo, token) => {
    let usersRef = dbRef.child('areaCode/' + userInfo.areaCode + "/" + getCurrentDate() + "/users/" + userInfo.phoneNumber);
    return usersRef.update({token}).then(() => {}).catch(() => {})
}

const updateUserLocationInWard = (userInfo, lat, long) => {
    let usersRef = dbRef.child('areaCode/' + userInfo.areaCode + "/" + getCurrentDate() + "/users/" + userInfo.phoneNumber + "/latLong");
    let latLong = {
        lat : lat,
        long : long
    }
    return usersRef.update(latLong).then(() => {}).catch(() => {})
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