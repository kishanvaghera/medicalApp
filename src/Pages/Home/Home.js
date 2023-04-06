import React, { useCallback, useState } from 'react';
import {View,StyleSheet,ScrollView,SafeAreaView} from 'react-native'
import { scale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts'
import CategorySection from './CategorySection';
import HeroSectionTime from './HeroSectionTime';
import MoniterScreen from './MoniterScreen';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { CustSidebarActive } from '../../Redux/reducer';
import { useEffect } from 'react';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';


const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  useFocusEffect(
      useCallback(()=>{
        dispatch(CustSidebarActive({page:''}));
      },[navigation])
  )
  
  const [BabyMontiterData,setBabyMontiterData]=useState({
      vWeight:"",
      vHeight:"",
      tHeadDesc:"",
      tTextDesc:"",
      tImage:"",
  });

  const handleChangeBabyData=(dd)=>{
    setBabyMontiterData({
        vWeight:dd.BabyWeight,
        vHeight:dd.BabyLength,
        tHeadDesc:dd.BabyHeadTiitle,
        tTextDesc:dd.BabyTitileDesc,
        tImage:dd.BabyMonitFile,
    });
  }


  const [PregStartDate,setPregStartDate]=useState("");
  const [UserData,setUserData]=useState({});
  useEffect(() => {
    const postData={action:"getHomePageComonData"}
    APIService.apiAction(postData, apiUrls.home).then(res => {
      console.log("res",res)
      if(res.status==200){
        const dd=res.data;
        setUserData(dd);
        setPregStartDate(dd.dFinalPregStartDate);
        setBabyMontiterData({
          vWeight:dd.BabyWeight,
          vHeight:dd.BabyLength,
          tHeadDesc:dd.BabyHeadTiitle,
          tTextDesc:dd.BabyTitileDesc,
          tImage:dd.BabyMonitFile,
      });
      }
    })
    return () => {}
  }, [])
  

  return (
    <View style={styles.body}>
      <Loader loading={loading} />
      <SafeAreaView>
        <Header iconName={'menu'} title={'Home'} />
      </SafeAreaView>
      <Main>
        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >

            <CategorySection setLoading={setLoading}/>
            <HeroSectionTime handleChangeBabyData={handleChangeBabyData} PregStartDate={PregStartDate} UserData={UserData}/>
            <MoniterScreen BabyMontiterData={BabyMontiterData} navigation={navigation}/>
            {/* 
            <DayWiseBox/>
            <ActivityCards setLoading={setLoading}/> */}
            {/* <CalanderComp setLoading={setLoading}/> */}
          </ScrollView>
        </View>
      </Main>
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