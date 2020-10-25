import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import {Image} from "react-native";
import { View } from "./../ui-kit";
import { getDriverLocations } from "./../repo/repo";

export default props => {

    const [driverLocations, setDriverLocations] = useState({});

    useEffect(() => {
        getLocations();
    }, [props.isDriver, props.userInfo.areaCode]);
    
    getLocations = async () => {
        if(!props.userInfo.areaCode)
            return;
        let driverRef = getDriverLocations(props.userInfo.areaCode);
        driverRef.on('value', (response) => {
            var data = response.val();
            if(!data)
                return;
            setDriverLocations(data?.drivers);
        });
    }

    if(driverLocations == null || Object.keys(driverLocations).length === 0)
        return null;

    return ( <View> 
        {
            Object.entries(driverLocations).filter(item => {
                console.log(item[1]?.status?.status);
                    return item[1]?.status?.status == true;
            }).map((item, index) => (
                <View key={index}>
                    <MapView.Marker
                        coordinate={{
                            latitude: item[1].location?.real_time?.lat,
                            longitude: item[1].location?.real_time?.long
                        }}>
                        <Image source={require('./../assets/car.png')} style={{ width: 30, height: 30 }} />
                    </MapView.Marker>
                </View>)
            )
        }
    </View>
    );
}