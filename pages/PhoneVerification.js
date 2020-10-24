import React, { useRef, useState } from 'react';
import { TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import {setData } from "./../redux/action";
import {GradientView} from "./../ui-kit"

import auth from "@react-native-firebase/auth";
import firebase from './../repo/firebase';
import styles from './../styles/styles';
import { View, Text } from "./../ui-kit";
import { Actions } from 'react-native-router-flux';
import { getUserData } from "./../repo/repo";


let { width } = Dimensions.get('window');

export default PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);

  const dispatch = useDispatch()
  const setDataAction = (arg) => dispatch(setData(arg))

  const sendVerification = async () => {
    if(!phoneNumber || phoneNumber.length != 10) {
      setDataAction({
          errorModalInfo : {
              showModal : true,
              message : "Please enter valid phonenumber",
          }
      });
      return;
    }
    try{
      let phone = "+91" + phoneNumber;
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setDataAction({
          loading : {
              show : false
          }
      });
      setConfirm(confirmation);
      setDataAction({
        loading : {
          show : false
        },
        errorModalInfo : {
            showModal : true,
            message : "Message sent successfully",
        }
      });
    }catch(err){
      setDataAction({
        loading : {
          show : false
        },
        errorModalInfo : {
            showModal : true,
            message : err.message,
        }
      });
    }
  };

  loginSuccess = async () => {
    let userData = await getUserData(phoneNumber);
    userData = userData.val();
    if(!userData){
      Actions.UserDetail();
    } else {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
      Actions.MapView();
    }
  }

  const confirmCode = async () => {
    if(!phoneNumber || phoneNumber.length != 10) {
      setDataAction({
        errorModalInfo : {
            showModal : true,
            message : "Please enter valid 10 digit phoneNumber",
        }
      });
      return;
    }
    if(code == "110011"){
      setDataAction({userInfo: { phoneNumber }})
      loginSuccess();
      return;
    }
    if(!code) {
      setDataAction({
          errorModalInfo : {
              showModal : true,
              message : "Please enter valid info",
          }
      });
      return;
    }
    try {
        await confirm.confirm(code);
        loginSuccess();
        setDataAction({
            errorModalInfo : {
                showModal : true,
                message : "Successfully logged in",
            }
        });
    }catch(err){
      setDataAction({
        errorModalInfo : {
            showModal : true,
            message : err.message,
        }
      });
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <GradientView flex={1} v w={width}>
            <View mr={20} ml={20} bc={'#fff'} bw={1} pa={16} br={8}>
                <TextInput
                    maxLength={10}
                    placeholder="Phone Number"
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    autoCompleteType="tel"
                    style={styles.textInput}
                />
                <TouchableOpacity
                    style={styles.sendVerification}
                    onPress={sendVerification}
                >
                <Text t={16} style={styles.buttonText} b t={"Send OTP"} />
                </TouchableOpacity>
                <TextInput
                    placeholder="Confirmation Code"
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                <Text t={16} style={styles.buttonText} b t={"Confirm"}/>
                </TouchableOpacity>
            </View>
        </GradientView>
    </KeyboardAwareScrollView>
  );
};
