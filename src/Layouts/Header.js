import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation , useRoute } from '@react-navigation/native';
import { scale, verticalScale, moderateScale} from '../utils/scalling';
import Icon from '../utils/Icon'
import RoutName from '../Routes/RoutName';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Header = ({ title, iconName, customClick, setIconBG,isCalanderAdd,backScreenName}, props) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.headerContainer}>
      <StatusBar
       barStyle='default'
        animated={true}
        backgroundColor="#9f5fea"
      />
      {/* {
        route.name=="Home"?
        <TouchableOpacity style={styles.iconStyle} onPress={() => navigation.toggleDrawer()}>
          <Ionicons name={'menu'} size={22} color="white" />
        </TouchableOpacity>:""
      } */}

      {
        route.name=="Home"?
        <Text style={styles.LogoTitile}>GEETA GARBHASANSKAR</Text>
        :""
      }

      {
        route.name!="Home"?
        <TouchableOpacity style={styles.iconStyle} onPress={() => backScreenName?navigation.navigate(backScreenName):navigation.goBack()}>
          <Icon IconName='arrow-left' LibraryName='FontAwesome5' IconSize={22} IconColor={'#9f5fea'}/>
        </TouchableOpacity>:""
      }
      {/* <TouchableOpacity style={styles.iconStyle} onPress={() => navigation.goBack()}>
       {iconName == 'menu' ? <Ionicons name={'menu'} size={22} color="black" /> : 
       <AntDesign name={iconName} size={22} color="black" /> }
      </TouchableOpacity> */}
      {
        route.name!="Home"?
        <Text style={{...styles.textStyle,fontSize:new String(title).length>20?RFPercentage(2.5):RFPercentage(3)}}>{title}</Text>
        :""
      }

      {
        isCalanderAdd?
        <TouchableOpacity style={styles.RightIcon} onPress={() => navigation.navigate(RoutName.CALANDER_ADD)}>
          <Icon IconName='calendar-plus' LibraryName='FontAwesome5' IconSize={22} IconColor={'#9f5fea'}/>
        </TouchableOpacity>:""
      }
    </View>
  )
}
export default Header;
const styles = StyleSheet.create({
  headerContainer: {
    width: moderateScale(360),
    height: verticalScale(45),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'center',
    backgroundColor:"white",
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textStyle: {
    fontFamily:'Lato_700Bold',
    color:"#9f5fea",
    position:'absolute',
    left:scale(60),
    top:scale(12)
  }, 
  iconStyle: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    left: 15,
    position:'absolute',
  },
  RightIcon:{
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    position:'absolute',
  },
  LogoTitile:{
    fontFamily:'Lato_700Bold',
    fontSize:RFPercentage(2),
    color:'#9f5fea',
    left: scale(20),
    position:'absolute',
  }
});