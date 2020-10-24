import React from 'react';
import { TextInput } from 'react-native';

export default (props) => {
    let { ml, nl, uc, pl, ph, h, mt, pb, style, name, value, k, onChangeText, ...rest} = props

    let st = { 
      ...{
        paddingLeft : pl ? pl : undefined,
        height : h ? h : undefined,
        marginTop : mt ? mt : undefined,
        paddingBottom : pb ? pb : undefined
      }, ...style};

    return (
      <TextInput  
        multiline = {ml ? ml : undefined}
        numberOfLines={nl ? nl : undefined}
        underlineColorAndroid={uc ? uc : undefined}
        style={st}
        keyboardType={k ? k : undefined}
        placeholder={ph ? ph : undefined}
        onChangeText={text => onChangeText ? onChangeText(name, text) : null}
        value={value}  {...rest} />
    );
}