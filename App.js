import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import Loading from "./components/loading";
import ConfirmModal from "./components/confirmModal";
import ErrorModal from "./components/ErrorModal";
import { Provider } from "react-redux";
import store from "./store";
import PhoneVerification from "./pages/PhoneVerification";
import MapPage from "./pages/MapView";
import UserDetail from "./pages/userDetails";
import HowItWorks from "./pages/howItWorks";
import AboutUs from "./pages/aboutUs";
import Complaint from "./pages/complaint";
import ContactUs from "./pages/contactUs";
import History from "./pages/history";
import Share from "./pages/share";
import Sidebar from "./components/sidebar";
import { Scene, Router, Stack } from "react-native-router-flux";
import OneSignal from 'react-native-onesignal';

export default function App() {

  const [screenType, setScreenType] = useState("");

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.init("930d0241-ea95-4276-bca9-abeff2c58260", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    getUserInfo(); 
  }, []);

  onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds = async (device) => {
    // console.log('Device info: ', device);
    AsyncStorage.setItem("token", device.userId);
  }

  getUserInfo = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    if(userInfo){
      setScreenType("mapView")
    }
  }

  return (
    <Provider store={store}>
      <Router>
        <Stack key="root">
        <Scene
          type="reset"
          hideNavBar={true}
          key="loginPage"
          component={PhoneVerification}
          title="LoginPage"
          initial={screenType != 'mapView'}
        />
        <Scene
          type="reset"
          hideNavBar={true}
          key="MapView"
          component={MapPage}
          title="MapView"
          initial={screenType == 'mapView'}
        />
        <Scene
          type="reset"
          hideNavBar={true}
          key="UserDetail"
          component={UserDetail}
          title="UserDetail"
        />
        <Scene
          type="reset"
          hideNavBar={true}
          key="complaint"
          component={Complaint}
          title="Complaint"
        />
        <Scene
          type="reset"
          hideNavBar={true}
          key="howItWorks"
          component={HowItWorks}
          title="HowItWorks"
        />
        <Scene
          type="reset"
          hideNavBar={true}
          key="aboutUs"
          component={AboutUs}
          title="aboutUs"
        />
        <Scene
          type="reset"
          hideNavBar={true}
          key="contactUs"
          component={ContactUs}
          title="contactUs"
        />
        <Scene
          type="reset"
          hideNavBar={true}
          key="history"
          component={History}
          title="history"
        />
        <Scene
          type="reset"
          hideNavBar={true}
          key="share"
          component={Share}
          title="Share"
        />
        </Stack>
      </Router>
      <Loading />
      <ConfirmModal />
      <ErrorModal />
      <Sidebar />
    </Provider>
  );
}
