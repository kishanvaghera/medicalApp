import React from 'react';
import { View, Image, TouchableOpacity,StyleSheet } from 'react-native';
import { DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import images from '../../assets';
import { Text } from '@ui-kitten/components';
import { moderateScale, scale, verticalScale } from '../utils/scalling';
import { useSelector,useDispatch } from 'react-redux';
import { CustSidebarActive, LogOut } from '../Redux/reducer';
import { useNavigation } from '@react-navigation/native';
import RoutName from './RoutName';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomSidebarMenu(props) {
  const loggedData = useSelector((state) => state.userLoggedData);
  const dispatch=useDispatch();
  const navigation=useNavigation();

  const handleActivePage=(page)=>{
    if(page=='Logout'){
      dispatch(LogOut({}));
      AsyncStorage.clear()
      .then(() => console.log('AsyncStorage cleared successfully'))
      .catch((err) => console.error(err));
    }else{
      dispatch(CustSidebarActive({page}));
      if(page=='MyPlanner'){
        navigation.navigate(RoutName.CALANDER_VIEW);
      }else if(page=='MyProfile'){
        navigation.navigate(RoutName.PROFILE);
      }
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={loggedData?.isUserData?.tProfilePic==""?images.profile:{uri:loggedData?.isUserData?.tProfilePic}}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
          {loggedData?.isUserData?.vFirstName} {loggedData?.isUserData?.vLastName}
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>handleActivePage('MyProfile')} style={styles.pageView}>
          <Image source={loggedData?.isCurrentSidebarPage=='MyProfile'?images.sdiProfile:images.sdiProfile1} style={styles.iconStyle} />
          <Text style={loggedData?.isCurrentSidebarPage=='MyProfile'?styles.customItemActive:styles.customItem} category='h6'>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleActivePage('MyVideo')} style={styles.pageView}>
          <Image source={loggedData?.isCurrentSidebarPage=='MyVideo'?images.sdiVideo:images.sdiVideo1} style={styles.iconStyle} />
          <Text style={loggedData?.isCurrentSidebarPage=='MyVideo'?styles.customItemActive:styles.customItem} category='h6'>My Video</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleActivePage('MyMusic')} style={styles.pageView}>
          <Image source={loggedData?.isCurrentSidebarPage=='MyMusic'?images.sdiMusic:images.sdiMusic1} style={styles.iconStyle} />
          <Text style={loggedData?.isCurrentSidebarPage=='MyMusic'?styles.customItemActive:styles.customItem} category='h6'>My Music</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleActivePage('MyActivity')} style={styles.pageView}>
          <Image source={loggedData?.isCurrentSidebarPage=='MyActivity'?images.sdiActivity:images.sdiActivity1} style={styles.iconStyle} />
          <Text style={loggedData?.isCurrentSidebarPage=='MyActivity'?styles.customItemActive:styles.customItem} category='h6'>My Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleActivePage('MyPlanner')} style={styles.pageView}>
          <Image source={loggedData?.isCurrentSidebarPage=='MyPlanner'?images.sdiCalander:images.sdiCalander1} style={styles.iconStyle} />
          <Text style={loggedData?.isCurrentSidebarPage=='MyPlanner'?styles.customItemActive:styles.customItem} category='h6'>My Planner</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleActivePage('Logout')} style={styles.pageView}>
          <Image source={loggedData?.isCurrentSidebarPage=='Logout'?images.sdiLogout:images.sdiLogout1} style={styles.iconStyle} />
          <Text style={loggedData?.isCurrentSidebarPage=='Logout'?styles.customItemActive:styles.customItem} category='h6'>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginTop:scale(13)
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customItemActive: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    color:'#e30078'
  },
  pageView:{
    flexDirection:'row',
    width:moderateScale(200),
  }
});

export default CustomSidebarMenu;