import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ScrollView,SafeAreaView,Image} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { Header } from '../../Layouts'
import CategorySection from './CategorySection';
import DayWiseBox from './DayWiseBox';
import ActivityCards from './ActivityCards';
import CalanderComp from './Calander';


const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.body}>
      <Loader loading={loading} />
      <SafeAreaView>
        <Header iconName={'menu'} title={'Home'} />
      </SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
          
          <CategorySection setLoading={setLoading}/>
          <DayWiseBox/>
          <ActivityCards setLoading={setLoading}/>
          {/* <CalanderComp setLoading={setLoading}/> */}
        </ScrollView>
      </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});