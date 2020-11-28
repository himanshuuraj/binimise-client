import React, {useState, useEffect, useReducer}  from 'react';
import { Dimensions, StatusBar, AsyncStorage, Picker } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setData } from "./../redux/action";
import { View, Text, Touch, TextInput } from "./../ui-kit";
import { Actions } from 'react-native-router-flux';
import Header from "./../components/header";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { updateUserData, getAllAreas, updateUserInArea, updateMapAreaCodeAndDriver } from "./../repo/repo";

let { height } = Dimensions.get('window');

const initialState = {
    name : "",
    phoneNumber : "",
    email : "",
    userType : "user",
    areaCode : "",
    municipality : ""
}
  
const reducer = (state, { field, value }) => {
    if(field == "userInfo"){
      return {
        ...state,
        ...value
      }
    }
    if(field.includes(".")){
      let field2 = field.split(".")[1];
      let field1 = field.split(".")[0];
      let obj = {};
      obj[field1] = state[field1];
      obj[field1] = { ...obj[field1], [field2]: value };
      obj[field1][field2] = value;
      return {
        ...state,
        ...obj
      }
    }
    return {
      ...state,
      [field]: value
    }
}

export default () => {

    const [state, dispatchStateAction] = useReducer(reducer, initialState);
    const [areas, setAreas] = useState({});

    const dispatch = useDispatch();
    const setDataAction = (arg) => dispatch(setData(arg));

    let userInfo = useSelector(state => state.testReducer.userInfo) || {};
    useEffect(() => {
        formOnChangeText("userInfo", userInfo);
    }, [userInfo.name])

    useEffect(() => {
        getAreas();
    }, [])

    getAreas = async () => {
        let areaList = await getAllAreas();
        setAreas(areaList.val());
    }
    
    formOnChangeText = (field, value) => {
        dispatchStateAction({ field, value });
    }

    showErrorModalMsg = (message, title = "Message") => {
        setDataAction({ 
            errorModalInfo : {
                showModal : true,
                title : title,
                message : message
            }
        })
    };

    validateUserInfo = () => {
        let message = "Please enter ";
        for(let key in initialState) {
            if(key == "email")
                continue;
            if(!state[key]){
                message += key;
                showErrorModalMsg(message);
                return true
            }
        }
        return false
    }

    updateUserInfo = async () => {
        try {

            setDataAction({ loading : { show : true }});
            let userInfo = JSON.parse(JSON.stringify(state));
            if(!userInfo.areaCode) {
                userInfo.areaCode = Object.entries(areas[state.municipality].wards)[0][0];
            }
            userInfo["firebaseToken"] = await AsyncStorage.getItem("firebaseToken");
            await updateUserData(userInfo);
            await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
            Actions.MapView();
            updateUserInArea(userInfo);
            setDataAction({ loading : { show : false }, userInfo });
        }catch(err) {
            showErrorModalMsg("Error while updating userData");
        }
    }

    driverLayout = () => {
        return <View>
            <Text t={'Truck Name'} />
            <TextInput ml nl={2} uc={"#bbb"} ph="Truck Name" pl={16}
                onChangeText={formOnChangeText} name={'truckName'}
                value={state.truckName}/>
            <Text t={'Truck Number'} />
            <TextInput ml nl={2} uc={"#bbb"} ph="Truck Number" pl={16}
                onChangeText={formOnChangeText} name={'truckId'}
                value={state.truckId}/>
        </View>;
    }

    return <KeyboardAwareScrollView>
        {
            userInfo?.name ? <View row ai c={"#fff"} ai w={"100%"} h={60} >
                <Header />
            </View> : null
        }
        <View jc ai h={height} pl={16} pr={16}>
            <Text b s={18} t={"DETAILS"} />
            <View pt={16} pb={8} ph={8} w={'100%'}>
                <Text t={'Name'} />
                <TextInput ml nl={2} uc={"#bbb"} ph="FirstName LastName" pl={16}
                onChangeText={formOnChangeText} name={'name'}
                value={state.name}/>
                <Text t={'PhoneNumber'} />
                <TextInput ml nl={2} uc={"#bbb"} ph="9954672326" pl={16}
                onChangeText={formOnChangeText} name={'phoneNumber'}
                k={"numeric"} maxLength={10}
                value={state.phoneNumber}/>
                <Text t={'Email'} />
                <TextInput ml nl={2} uc={"#bbb"} ph="abc@def.com" pl={16}
                onChangeText={formOnChangeText} name={'email'}
                value={state.email}/>
                <Text t={'Select your municipality'} />
                <Picker
                    selectedValue={state.municipality}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue, itemIndex) => formOnChangeText("municipality", itemValue)}
                >
                    {
                        Object.entries(areas).map((item, index) => {
                            return <Picker.Item key={index} label={item[0]} value={item[0]} />
                        })
                    }
                </Picker>
                <Text t={'Select your ward'} />
                {
                    (state.municipality && areas && areas[state.municipality]) ? <Picker
                        selectedValue={state.areaCode}
                        style={{ height: 50, width: "100%" }}
                        onValueChange={(itemValue, itemIndex) => formOnChangeText("areaCode", itemValue)}
                    >
                        {
                            Object.entries(areas[state.municipality].wards).
                                map(item => item[1].value).
                                sort((a,b) => parseInt(a.replace('ward', '')) > parseInt(b.replace('ward', ''))).
                                map((item, index) => <Picker.Item key={index} label={item} value={item} />)
                        }
                    </Picker> : null
                }
                <Touch g w={'100%'} mb={16} br={4}
                    onPress={() => {
                        if(!validateUserInfo()){
                            updateUserInfo();
                        }
                    }} s={16} c={"#fff"} t={'SUBMIT'}/>
                <View h={100} />
            </View>
        </View>
    </KeyboardAwareScrollView>
}