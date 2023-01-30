import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';

import { Home, Meditation, Music, Live, Profile, ProductList, ProductDetail, MusicList, MusicPlayer } from '../Pages/Dashboard';
import RoutName from './RoutName';
import CustomSidebarMenu from './CustomSidebarMenu';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const homeScreenStack = ({ navigation, props }) => {
  return (
    <Stack.Navigator initialRouteName={'BottomTabStack'}>
      <Stack.Screen name={'BottomTabStack'} component={BottomTabStack} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.PRODUCT_LIST} component={ProductList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.PRODUCT_DETAIL} component={ProductDetail} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.MUSIC_LIST} component={MusicList} options={{ headerShown: false }} />
      <Stack.Screen name={RoutName.MUSIC_PLAYER} component={MusicPlayer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={RoutName.HOME}
      screenOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#e0e0e0',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 16,
        }
      }}>
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
        component={Meditation}
        options={{
          headerShown: false,
          tabBarLabel: RoutName.MEDITATION,
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
        component={Music}
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
        name={RoutName.LIVE}
        component={Live}
        options={{
          headerShown: false,
          tabBarLabel: RoutName.LIVE,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="live-tv"
              color={color}
              size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={RoutName.PROFILE}
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: RoutName.PROFILE,
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="user"
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
        options={{ headerShown: false }}
        component={homeScreenStack}
      />
    </Drawer.Navigator>

    // <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown : false }}>
    //     <Stack.Screen name="Home" component={Home} />
    // </Stack.Navigator>
  )
}
export default PrivateRoutes;