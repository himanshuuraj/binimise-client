import React, {useRef, useEffect}  from 'react';
import { Dimensions, StatusBar, Animated, AsyncStorage } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setData } from "./../redux/action";
import {View, Text, Touch} from "./../ui-kit";
import { Actions } from 'react-native-router-flux';
import { Color } from '../global/util';
const { width, height } = Dimensions.get('window');  

let arrayOfItems = [
    {id : "MapView", name : "MapView"},
    {id : "howItWorks", name : "How it Works"},
    {id : "history", name : "History"},
    {id : "aboutUs", name : "About Us"},
    {id : "share", name : "Share"},
    {id : "contactUs", name : "Contact Us"},
    {id : "UserDetail", name : "Edit Details"},
    {id : "complaint", name : "Complaint"},
    {id : "logout", name : "Logout"}
]

export default () => {

      const dispatch = useDispatch();
      const setDataAction = (arg) => dispatch(setData(arg));

    let { sidebar, userInfo } = useSelector(state => state.testReducer) || {};

    if(!sidebar.show)
      return null;

    return <View a le={0} to={0} w={width} h={height} c={Color.backgroundModalColor}>
        <View style={{
                height: '100%',
                backgroundColor : "#bbb",
                width: width * 0.8, 
            }}>
                <View jc h={'100%'}>
                    {
                        arrayOfItems.map((item, index) => {
                            if(userInfo.userType == "driver" && item.id == "UserDetail")
                                return null;
                            return ( 
                                <Touch g key={index} jc boc={Color.black} bw={1} bw={0.5} onPress={() => {
                                    if(item.id == "logout") {
                                        AsyncStorage.clear();
                                        Actions.loginPage();
                                        return;
                                    }
                                    Actions[item.id]();
                                    setDataAction({sidebar : { show : false}});
                                }} c={Color.white} t={item.name}/>
                            );
                        })
                    }
                </View>
                <Touch a to={10} w={24} h={24} ri={10} jc ai t={"X"} s={24} b
                    onPress={() => setDataAction({sidebar : { show : false}})}/>
        </View>
    </View>
}