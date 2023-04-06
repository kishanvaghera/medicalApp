import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';

import { Home, Meditation, MusicCategoryList, Live, Profile, CategoryList, CategoryDetail, SubCategoryList, MusicList, MusicPlayer, SubYogaList, YogaDetail,MusicSubCategoryList,MusicDetail} from '../Pages/Dashboard';
import MainActivityList from '../Pages/Activity/MainActivityList';
import ActvitySubCategoryList from '../Pages/Activity/ActvitySubCategoryList';
import ActivityCategoryList from '../Pages/Activity/ActivityCategoryList';
import ActivityDetail from '../Pages/Activity/ActivityDetail';
import YogaCategoryList from '../Pages/Yoga/YogaCategoryList';
import YogaSubCategoryList from '../Pages/Yoga/YogaSubCategoryList';
import YogaMainList from '../Pages/Yoga/YogaMainList';
import YogaMainDetail from '../Pages/Yoga/YogaMainDetail';
import DispCalanderData from '../Pages/Calander/DispCalanderData'

import {AdminDashboard,AdminYogaAdd,AdminMusicAdd,AdminActivityAdd,AdminCategoryAdd,AdminYogaList,AdminMusicList,AdminActivityList,AdminCategoryList,AdminCategoryDetailsList,AdminCategoryDetailAdd,AdminMusicDetailList,AdminYogaDetailList,AdminActivityDetailList,AdminActivityDetailAdd, AdminMusicDetailAdd, AdminYogaDetailAdd, AdminAddDiet, AdminDietList} from '../Admin/'

import RoutName from './RoutName';
import CustomSidebarMenu from './CustomSidebarMenu';
import { useSelector, useDispatch } from 'react-redux'
import YogaSubSubCateList from '../Pages/Yoga/YogaSubSubCateList';
import DietList from '../Pages/Diet/DietList';
import { LogOut } from '../Redux/reducer';
import SetCalanderData from '../Pages/Calander/SetCalanderData';
import { scale, verticalScale } from '../utils/scalling';
import MusicSubData from '../Pages/Music/MusicSubData';
import { RFPercentage } from 'react-native-responsive-fontsize';
import MomScreen from '../Pages/Home/MomScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const HomeScreenStack = ({ navigation, props }) => {
  const loggedData = useSelector((state) => state.userLoggedData );
  return (
    <Stack.Navigator initialRouteName={loggedData.isRole?RoutName.ADMIN_DASHBOARD:'BottomTabStack'}>
      <Stack.Screen name={'BottomTabStack'} component={BottomTabStack} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.PROFILE} component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.USER_CATEGORY_LIST} component={CategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.SUB_CATAGORY_LIST} component={SubCategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.USER_CATEGORY_DETAIL} component={CategoryDetail} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.MUSIC_LIST} component={MusicCategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.MUSIC_PLAYER} component={MusicPlayer} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.SUB_YOGA_LIST} component={SubYogaList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.YOGA_DETAIL} component={YogaMainDetail} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ACTIVITY_LIST} component={ActivityCategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.SUB_ACTIVITY_LIST} component={ActvitySubCategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.MAIN_ACTIVITY_LIST} component={MainActivityList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ACTIVITY_DETAIL} component={ActivityDetail} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.YOGA_CATEGORY_LIST} component={YogaCategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.YOGA_SUBCATEGORY_LIST} component={YogaSubCategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.YOGA_MAIN_CATEGORY_LIST} component={YogaMainList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.YOGA_MAIN_DETAIL} component={YogaMainDetail} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.YOGA_SUB_SUB_CAT_LIST} component={YogaSubSubCateList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.DIET_LIST} component={DietList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.SUB_MUSIC_LIST} component={MusicSubCategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.MUSIC_DETAIL} component={MusicDetail} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.CALANDER_VIEW} component={DispCalanderData} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.CALANDER_ADD} component={SetCalanderData} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.MUSIC_SUB_DATA} component={MusicSubData} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.MomScreen} component={MomScreen} options={{ headerShown: false }} />


      <Stack.Screen name={RoutName.ADMIN_DASHBOARD} component={AdminDashboard} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_YOGA_ADD} component={AdminYogaAdd} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_YOGA_LIST} component={AdminYogaList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_MUSIC_ADD} component={AdminMusicAdd} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_MUSIC_LIST} component={AdminMusicList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_ACTIVITY_ADD} component={AdminActivityAdd} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_ACTIVITY_LIST} component={AdminActivityList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_CATEGORY_ADD} component={AdminCategoryAdd} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_CATEGORY_LIST} component={AdminCategoryList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_CATEGORY_DET_LIST} component={AdminCategoryDetailsList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_CATEGORY_DET_ADD} component={AdminCategoryDetailAdd} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_MUSIC_DET_LIST} component={AdminMusicDetailList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_YOGA_DET_LIST} component={AdminYogaDetailList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_ACTIVITY_DET_LIST} component={AdminActivityDetailList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_ACTIVITY_DETAIL_ADD} component={AdminActivityDetailAdd} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_MUSIC_DET_ADD} component={AdminMusicDetailAdd} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_YOGA_DET_ADD} component={AdminYogaDetailAdd} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_DIET_ADD} component={AdminAddDiet} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.ADMIN_DIET_LIST} component={AdminDietList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={RoutName.HOME}
      screenOptions={{
        activeTintColor: '#FB2576',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#e0e0e0',
        },
        tabBarIconStyle: {
          marginTop: scale(5), // Add margin to the top of the icon
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: RFPercentage(1.8),
          paddingBottom:scale(4)
        },
        tabBarStyle:{
          height:verticalScale(48),
        },
        tabBarActiveTintColor: '#FB2576',
      }}
      >
      <Tab.Screen
        name={RoutName.HOME}
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: RoutName.HOME,
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="home"
              color={color}
              size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={RoutName.MEDITATION}
        component={YogaCategoryList}
        options={{
          headerShown: false,
          tabBarLabel: 'Meditation',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="meditation"
              color={color}
              size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={RoutName.MUSIC}
        component={MusicCategoryList}
        options={{
          headerShown: false,
          tabBarLabel: RoutName.MUSIC,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="music-circle"
              color={color}
              size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={RoutName.DIET_LIST}
        component={DietList}
        options={{
          headerShown: false,
          tabBarLabel: 'Diet',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="emoji-food-beverage"
              color={color}
              size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={RoutName.ACTIVITY_LIST}
        component={ActivityCategoryList}
        options={{
          headerShown: false,
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="timetable"
              color={color}
              size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function PrivateRoutes() {
  return (

    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={CustomSidebarMenu}>

      <Drawer.Screen
        name={'homeScreenStack'}
        options={{ headerShown: false,drawerItemStyle: { display: 'none' }}}
        component={HomeScreenStack}
      />

      <Drawer.Screen
        name={'Activity'}
        options={{ headerShown: false }}
        component={ActivityCategoryList}
      />

      <Drawer.Screen
        name={'Meditation'}
        options={{ headerShown: false }}
        component={YogaCategoryList}
      />

      <Drawer.Screen
        name={'Calander'}
        options={{ headerShown: false }}
        component={DispCalanderData}
      />
      
    </Drawer.Navigator>

    // <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown : false }}>
    //     <Stack.Screen name="Home" component={Home} />
    // </Stack.Navigator>
  )
}
export default PrivateRoutes;