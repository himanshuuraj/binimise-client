import React, {Component}  from 'react';
import { View, Text, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { Color } from "../global/util";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setData } from "../redux/action";
import GradientView from './gradientView';

let { width, height } = Dimensions.get('window');
width = width;


class ConfirmModal extends Component{
    render(){
        let confirmModalInfo = this.props.confirmModalInfo || {};
        if(!confirmModalInfo.showModal)
            return null;
        confirmModalInfo.title = confirmModalInfo.title || "Please Confirm";
        confirmModalInfo.message = confirmModalInfo.message;
        confirmModalInfo.primaryText = confirmModalInfo.primaryText || "CONFIRM";
        confirmModalInfo.primaryAction = confirmModalInfo.primaryAction ? confirmModalInfo.primaryAction : () => this.props.setData({ confirmModalInfo: { showModal : false }});
        confirmModalInfo.secondaryText = confirmModalInfo.secondaryText || "CANCEL";
        confirmModalInfo.secondaryAction = confirmModalInfo.secondaryAction ? confirmModalInfo.secondaryAction : () => this.props.setData({ confirmModalInfo: { showModal : false }});
        return (
            <View style={{ 
                position : 'absolute', 
                backgroundColor : "rgba(52, 52, 52, 0.6)",
                justifyContent : 'center',
                alignItems : 'center',
                zIndex : 999,
                top : 0,
                left : 0,
                height,
                width
            }}>
                <View style={{ width: width - 48, borderRadius: 8, backgroundColor : 'white', 
                                justifyContent : 'center',  padding: 16,
                                borderWidth : 1, borderColor : Color.themeColor
                    }}>
                    <Text style={{ fontSize : 18, fontWeight : 'bold', textAlign : 'center' }}>
                        { confirmModalInfo.title }
                    </Text>
                    {
                        confirmModalInfo.message ? (
                            <Text style={{ fontSize : 16, textAlign : 'center', marginTop : 10  }}>
                                { confirmModalInfo.message }
                            </Text>
                        ) : null
                    }
                    <View style={{ flexDirection : 'row'}}>
                        
                        <TouchableOpacity
                            style={{
                                flex : 1,
                                justifyContent : 'center',
                                marginTop : 20,
                                marginBottom : 5,
                                height : 36,
                                width : '100%',
                                borderRadius : 4,
                                marginRight : 8
                            }}
                            onPress={e => {
                                confirmModalInfo.primaryAction();
                            }}
                        >
                        <GradientView h={'100%'}>
                            <Text style={{ fontSize : 14, color : Color.themeFontColor, fontWeight : 'bold', textAlign : 'center' }}>
                                { confirmModalInfo.primaryText }
                            </Text>
                        </GradientView>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex : 1,
                                justifyContent : 'center',
                                marginTop : 20,
                                marginBottom : 5,
                                height : 36,
                                width : '100%',
                                backgroundColor : Color.white,
                                borderWidth : 1,
                                justifyContent : 'center',
                                alignItems : 'center'
                            }}
                            onPress={e => {
                                confirmModalInfo.secondaryAction();
                            }}
                        >
                            <Text style={{ fontSize : 14, color : Color.black }}>
                                { confirmModalInfo.secondaryText }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        confirmModalInfo : state.testReducer.confirmModalInfo
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setData
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);