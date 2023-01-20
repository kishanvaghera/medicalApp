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
    width: wp(95),
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'center',
    marginTop:wp(6),
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
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    position:'absolute',
  },
});