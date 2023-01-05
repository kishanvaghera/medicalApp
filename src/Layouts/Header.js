import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Header = ({ title, iconName, customClick, setIconBG }, props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconStyle} onPress={customClick}>
       {iconName == 'menu' ? <Ionicons name={iconName} size={22} color="black" /> : 
       <AntDesign name={iconName} size={22} color="black" /> }
      </TouchableOpacity>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  )
}
export default Header;
const styles = StyleSheet.create({
  headerContainer: {
    width: wp(100),
    height: 65,
    backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'center',
    paddingHorizontal: wp(0.5),
    paddingTop: hp(2)
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
  }, 
  iconStyle: {
    width: 35,
    height: 35,
    //borderRadius: 25/2,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    position:'absolute',
    paddingTop: hp(2)
   // backgroundColor: '#D3D3D3'
  },
});