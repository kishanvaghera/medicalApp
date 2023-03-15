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

const Header = ({ title, iconName, customClick, setIconBG,isCalanderAdd,backScreenName}, props) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.headerContainer}>
      <StatusBar
        animated={true}
        backgroundColor="#FB2576"
      />
      {
        route.name=="Home"?
        <TouchableOpacity style={styles.iconStyle} onPress={() => navigation.toggleDrawer()}>
          <Ionicons name={'menu'} size={22} color="black" />
        </TouchableOpacity>:""
      }
      {
        route.name!="Home"?
        <TouchableOpacity style={styles.iconStyle} onPress={() => backScreenName?navigation.navigate(backScreenName):navigation.goBack()}>
          <Icon IconName='arrow-left' LibraryName='FontAwesome5' IconSize={22} IconColor={'black'}/>
        </TouchableOpacity>:""
      }
      {/* <TouchableOpacity style={styles.iconStyle} onPress={() => navigation.goBack()}>
       {iconName == 'menu' ? <Ionicons name={'menu'} size={22} color="black" /> : 
       <AntDesign name={iconName} size={22} color="black" /> }
      </TouchableOpacity> */}
      <Text style={{...styles.textStyle,fontSize:title.length>20?15:25}}>{title}</Text>

      {
        isCalanderAdd?
        <TouchableOpacity style={styles.RightIcon} onPress={() => navigation.navigate(RoutName.CALANDER_ADD)}>
          <Icon IconName='calendar-plus' LibraryName='FontAwesome5' IconSize={22} IconColor={'#FB2576'}/>
        </TouchableOpacity>:""
      }
    </View>
  )
}
export default Header;
const styles = StyleSheet.create({
  headerContainer: {
    width: moderateScale(320),
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'center',
    // marginTop:scale(5),
  },
  textStyle: {
    fontSize: 25,
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
  RightIcon:{
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    position:'absolute',
  }
});