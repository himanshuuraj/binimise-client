import testReducer from "./redux/testReducer";

import { combineReducers } from "redux";
import { AsyncStorage } from "react-native";

getUserInfo = async () => {
    let uInfo = await AsyncStorage.getItem("userInfo");
    if(uInfo)
        uInfo = JSON.parse(uInfo);
    return uInfo || {}
}

let reducer = testReducer

x = getUserInfo();
reducer.userInfo = x

const rootReducer = combineReducers({
    testReducer
});

export default rootReducer;
