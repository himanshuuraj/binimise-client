import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBH8G0QwPsgf2qEOV4m8H9AEq8sbkBGYkQ",
    authDomain: "binimise-e206e.firebaseapp.com",
    databaseURL: "https://binimise-e206e.firebaseio.com",
    projectId: "binimise-e206e",
    storageBucket: "binimise-e206e.appspot.com",
    messagingSenderId: "535852554124",
    appId: "1:535852554124:web:ffaaae2d908fef3f7128a9",
    measurementId: "G-YYS15ZTB39"
}

if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);

export default () => {
    return {firebase, auth, database};
}