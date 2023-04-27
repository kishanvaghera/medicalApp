import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation , useRoute } from '@react-navigation/native';
import { scale, verticalScale, moderateScale} from '../utils/scalling';
import Icon from '../utils/Icon'
import RoutName from '../Routes/RoutName';
import { RFPercentage } from 'react-native-responsive-fontsize';
import images from '../../assets/'

const Header = ({ title, iconName, customClick, setIconBG,isCalanderAdd,backScreenName}, props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.headerContainer}>
      <StatusBar
       barStyle='default'
        animated={true}
        backgroundColor="#0B4E98"
      />
      {/* {
        route.name=="Home"?
        <TouchableOpacity style={styles.iconStyle} onPress={() => navigation.toggleDrawer()}>
          <Ionicons name={'menu'} size={22} color="white" />
          </TouchableOpacity>:""
        } */}
      {
        (route.name=="Home" || route.name=="TrialScreen")?
        <View style={{position:'absolute',flexDirection:'row',left:scale(20)}}>
        <Image source={images.logo} style={{width:widthPercentageToDP('6%'),height:heightPercentageToDP('6%')}} resizeMode='contain' />
          <Text style={styles.LogoTitile}>
            <Text style={{color:'#0B4E98'}}>Geeta</Text><Text style={{color:'#f10078'}}> Garbhasanskar</Text>
          </Text>
          </View>
        :""
      }

      {
        (route.name!="Home" && route.name!="TrialScreen")?
        <TouchableOpacity style={styles.iconStyle} onPress={() => backScreenName?navigation.navigate(backScreenName):navigation.goBack()}>
          <Icon IconName='arrow-left' LibraryName='FontAwesome5' IconSize={22} IconColor={'#0B4E98'}/>
        </TouchableOpacity>:""
      }
      {/* <TouchableOpacity style={styles.iconStyle} onPress={() => navigation.goBack()}>
       {iconName == 'menu' ? <Ionicons name={'menu'} size={22} color="black" /> : 
       <AntDesign name={iconName} size={22} color="black" /> }
      </TouchableOpacity> */}
      {
        (route.name!="Home" && route.name!="TrialScreen")?
        <Text style={{...styles.textStyle,fontSize:RFPercentage(2),lineHeight:scale(15)}}>{title}</Text>
        :""
      }

      {
        isCalanderAdd?
        <TouchableOpacity style={styles.RightIcon} onPress={() => navigation.navigate(RoutName.CALANDER_ADD)}>
          <Icon IconName='calendar-plus' LibraryName='FontAwesome5' IconSize={22} IconColor={'#0B4E98'}/>
        </TouchableOpacity>:""
      }

      {
        (route.name=="Home" || route.name=="TrialScreen")?
        <TouchableOpacity style={styles.RightIcon} onPress={() => navigation.navigate(RoutName.LIVE)}>
          <Icon IconName='youtube-tv' LibraryName='MaterialCommunityIcons' IconSize={22} IconColor={'#DF2E38'}/>
        </TouchableOpacity>
        :""
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
    color:"#0B4E98",
    position:'absolute',
    left:scale(60),
    paddingVertical:scale(3),
    width:wp('80%')
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
    right: 20,
    position:'absolute',
  },
  LogoTitile:{
    fontFamily:'Lato_900Black',
    fontSize:RFPercentage(2.3),
    color:'black',
    left: scale(10),
    paddingVertical:scale(10)
  }
});