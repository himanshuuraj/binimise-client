import { Platform, Dimensions, StyleSheet } from "react-native";
let { width, height } = Dimensions.get('window');

export const getCurrentDate = () => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth();
    mm += 1;
    if(mm < 10) mm = "0" + mm;
    let yy = date.getFullYear();
    yy = yy - 2000;
    date = mm + "-" + dd + "-" + yy;
    return date;
}

width = Math.round(width);
height = Math.round(height);

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const getFont =
    (size) => Math.ceil((size * scale));

export const getHeight = percent => {
    return Math.round((height * percent) / 100);
}

export const getWidth = percent => {
    return Math.round((width * percent) / 100);
}

export const Color = {
    gradientColor1 : "#00cc66",
    gradientColor2 : "#99ff33",
    themeColor : "#4C64FF",
    themeFontColor : "#fff",
    white : "#fff",
    gray : "gray",
    black : "#4a4a4a",
    green : "#3cb878",
    backgroundThemeColor : "#eee",
    backgroundModalColor : "rgba(52, 52, 52, 0.6)"
}

export const Font = {
    themeFont : "monospace"
}

export const viewObj = {
    marginTop : 20, 
    borderWidth: StyleSheet.hairlineWidth, 
    borderRadius : 4,
    marginBottom : 8
  }
  
export const textObj = {
    position : 'absolute',
    top : -8,
    left : 8,
    fontSize : 12,
    backgroundColor : Color.white,
    paddingHorizontal : 2,
    backgroundColor : Color.backgroundThemeColor
  }