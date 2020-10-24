import React  from 'react';
import { Dimensions, StatusBar } from "react-native";
import { Color } from "./../global/util";
import { setData } from "./../redux/action";
import { View, Text, Touch } from "./../ui-kit";
import { useSelector, useDispatch } from "react-redux";

const { width, height } = Dimensions.get('window');

export default () => {

        const dispatch = useDispatch();
        const setDataAction = (arg) => dispatch(setData(arg));

        let errorModalInfo = useSelector(state => state.testReducer.errorModalInfo) || {};
        if(!errorModalInfo.showModal)
            return null;
        errorModalInfo.title = errorModalInfo.title || "ALERT";
        errorModalInfo.message = errorModalInfo.message || "This is a message";
        errorModalInfo.buttonText = errorModalInfo.buttonText || "OK";
        errorModalInfo.onClose = errorModalInfo.onClose ? errorModalInfo.onClose : () => setDataAction({ errorModalInfo: { showModal : false }});
        return (
            <View a c={Color.backgroundModalColor} jc ai zi={999} to={0} le={0} h={height} w={width}
                mt={StatusBar.currentHeight}>
                <View w={width - 48} br={8} c={Color.white} jc ai pa={16}>
                    <Text s={18} b t={errorModalInfo.title} />
                    <Text s={16} mt={10} t={ errorModalInfo.message } />
                    <Touch g jc mt={20} mb={5} h={36} w={'100%'} br={4}
                        onPress={errorModalInfo.onClose}
                        s={14} c={Color.white} b t={ errorModalInfo.buttonText } />
                </View>
            </View>
        );
}