import React, { useCallback, useState } from 'react';
import {View,StyleSheet,ScrollView,SafeAreaView, Image, TouchableOpacity, Linking, Share} from 'react-native'
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
import images from '../../../assets';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from '../../utils/Icon';


const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  const message = `Welcome to India's Most Trusted Online Garbhsanskar Community!!

  Dream Child Garbhsanskar App is the World's First Mobile App that provides daily activity-based online Garbhsanskar Guidance to attain a Divine and Dynamic Child. Pregnant Lady can Enjoy Daily 25+ Activities, Vedic and Scientific Workshops and Unique Weekly Classes for 9 Months.
  
  Loved by 1,25,000+ Mothers From 33+ Countries !!!
  
  Download Dreamchild GarbhSanskar App:
  (Basic Version is 100% FREE)
  Android: https://bit.ly/dreamchildapp
  iOS: https://bit.ly/dreamchildapp_ios
  
  Youtube (100+ FREE Video) : https://bit.ly/2yCNeTg
  Helpline : https://wa.me/916356563262
  
  www.dreamchild.in`;

  const youtubeUrl = 'https://www.youtube.com/';
  const instagramUrl = 'https://www.instagram.com/';
  const facebookUrl = 'https://www.facebook.com/';
  const googleUrl = 'https://www.google.com/';
  const whatsappUrl=`whatsapp://send?text=${message}`;
  const openLink = (platForm) => {
    if(platForm=='y'){
      Linking.openURL(youtubeUrl);
    }else if(platForm=='i'){
      Linking.openURL(instagramUrl);
    }else if(platForm=='f'){
      Linking.openURL(facebookUrl);
    }else if(platForm=='we'){
      Linking.openURL(googleUrl);
    }else if(platForm=='wa'){
      Linking.openURL(whatsappUrl);
    }
  }

  const onShareApp = async () => {
    try {
      const result = await Share.share({
        message:message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  const [BabyMontiterData,setBabyMontiterData]=useState({
      vWeight:"",
      vHeight:"",
      tHeadDesc:"",
      tTextDesc:"",
      tImage:"",
      vHead:"",
  });

  const [CurrentMonth,setCurrentMonth]=useState(0);

  const handleChangeBabyData=(dd)=>{
    setBabyMontiterData({
        vWeight:dd.BabyWeight,
        vHeight:dd.BabyLength,
        tHeadDesc:dd.BabyHeadTiitle,
        tTextDesc:dd.BabyTitileDesc,
        tImage:dd.BabyMonitFile,
        vHead:dd.vHead,
    });
  }

  const [PregStartDate,setPregStartDate]=useState("");
  const [UserData,setUserData]=useState({});

  const ApiCall=()=>{
    const postData={action:"getHomePageComonData"}
    APIService.apiAction(postData, apiUrls.home).then(res => {
      if(res.status==200){
        const dd=res.data;
        setCurrentMonth(res.vCurrPregMonth);
        setUserData(dd);
        setPregStartDate(dd.dFinalPregStartDate);
        setBabyMontiterData({
          vWeight:dd.BabyWeight,
          vHeight:dd.BabyLength,
          tHeadDesc:dd.BabyHeadTiitle,
          tTextDesc:dd.BabyTitileDesc,
          tImage:dd.BabyMonitFile,
          vHead:dd.vHead,
      });
      }
    })
  }

  useEffect(() => {
    dispatch(CustSidebarActive({page:''}));
    ApiCall();
    return () => {}
  }, [])

  useFocusEffect(
      useCallback(()=>{
        ApiCall();
      },[navigation])
  )

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
            <HeroSectionTime handleChangeBabyData={handleChangeBabyData} PregStartDate={PregStartDate} UserData={UserData} setCurrentMonth={setCurrentMonth}/>
            <MoniterScreen BabyMontiterData={BabyMontiterData} navigation={navigation} currentMonth={CurrentMonth}/>
            {/* 
            <DayWiseBox/>
            <ActivityCards setLoading={setLoading}/> */}
            {/* <CalanderComp setLoading={setLoading}/> */}
            
            <TouchableOpacity onPress={onShareApp}>
              <Image source={images.shareApp} style={{width:wp('90%'),height:hp('20%'),alignSelf:'center',marginTop:scale(20),borderRadius:scale(10)}} resizeMode={'stretch'}/>
            </TouchableOpacity>

            <View style={{width:wp('90%'),flexDirection:'row',justifyContent:'space-around',alignSelf:'center',marginTop:scale(20)}}>
                <TouchableOpacity onPress={()=>openLink('we')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                    <Image source={images.website} style={{width:25,height:25}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openLink('y')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                  <Image source={images.youtube} style={{width:25,height:25}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openLink('f')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                  <Image source={images.facebook} style={{width:25,height:25}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openLink('i')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                  <Image source={images.instagram} style={{width:25,height:25}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openLink('wa')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                  <Image source={images.whatsapp} style={{width:25,height:25}}/>
                </TouchableOpacity>
            </View>
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