import React from 'react';
import { setData } from "./../redux/action";
import { useDispatch } from 'react-redux';
import { Touch, View } from "./../ui-kit";
import { Color } from '../global/util';

export default props => {

 const dispatch = useDispatch()
 const setDataAction = (arg) => dispatch(setData(arg));

 let color = props.c || Color.black;

  return (
        <Touch col ai ml={16} pt={2} pb={2} mt={8} boc={color} h={40} bw={1} w={40} br={5} mr={16} style={{justifyContent: 'space-around'}}
            onPress={()=> {
                setDataAction({sidebar : { show : true }});
            }}>
            <View w={32} h={2} c={color}/>
            <View w={32} h={2} c={color}/>
            <View w={32} h={2} c={color}/>
        </Touch>
    );
}