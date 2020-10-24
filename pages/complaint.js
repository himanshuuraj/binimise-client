import React from "react";
import { StatusBar, Dimensions } from "react-native";
import { View, Text, TextInput, Touch } from "../ui-kit";
import Header from "../components/header";
import { Color } from "../global/util";
import { useDispatch } from 'react-redux';
import { setData } from "./../redux/action";

let { width } = Dimensions.get("window");

export default () => {

  const dispatch = useDispatch()
  const setDataAction = (arg) => dispatch(setData(arg))

  showComplaintMessage = () => {
    setDataAction({errorModalInfo : { showModal : true, message : "We shall contact you soon." }});
  }

  return (
    <View>
      <Header />
      <View jc h={'90%'}>
        <View bw={1} br={8} mt={32} ml={16} ph={16} w={width - 32} bc={"#bbb"}>
          <View mv={8} mt={16}>
            <Text t={"Phone Number"} />
            <TextInput nl={2} uc={"#bbb"} ph="Phone Number" name={"truckName"} to={10} pb={4} />
          </View>
          <View mv={8} mt={16}>
            <Text t={"Message"} />
            <TextInput nl={2} uc={"#bbb"} ph="Message" nl={4} name={"truckName"} to={10} pb={4} />
          </View>
          <Touch g jc mt={20} mb={5} h={36} w={'100%'} br={4} onPress={showComplaintMessage}
                s={14} c={Color.white} b t={"SEND"} mb={16} />
        </View>
      </View>
    </View>
  );
};
