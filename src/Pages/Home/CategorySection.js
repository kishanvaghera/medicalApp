import React, { useCallback, useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image} from 'react-native'
import {scale,verticalScale,moderateScale} from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

function CategorySection(props) {
    const navigation = useNavigation();
    const imagesArray = {
      1:images.theme1,
      2:images.theme2,
      3:images.theme3,
      4:images.theme4,
    };
    const [TodayCategoryList,setTodayCategoryList]=useState([]);

    const ApiCall=()=>{
      props.setLoading(true);
        const postData={action:"getHomePageData",day:1};
        APIService.apiAction(postData, apiUrls.home).then(res => {
          props.setLoading(false);
          if(res.status==200){
              setTodayCategoryList([...res.data]);
          }else{
              setTodayCategoryList([]);
          }
        })
    }

    useEffect(()=>{
        ApiCall();
        return ()=>{}
    },[])
    
  return (
    <View>
        <SwiperFlatList
            autoplay
            autoplayDelay={5}
            autoplayLoop
            index={0}
            data={TodayCategoryList?TodayCategoryList:[]} 
            renderItem={(curEle,ind) => (
            <View style={styles.imageRows}>
                <Image source={imagesArray[curEle.item.iThemeId]} style={{...styles.boxImage}} resizeMode={'stretch'}/>
                <Text style={{...styles.categoryImageText}}>{curEle.item?.tText}</Text>
            </View>
            )}
        />
    </View>
  )
}

export default CategorySection

const styles = StyleSheet.create({
    boxImage:{
      borderRadius:moderateScale(20),
      width:moderateScale(320),
      height: verticalScale(170),
      position:'absolute'
    },
    categoryImageText:{
      color:"black",
      fontSize:RFPercentage(3),
      fontFamily:'Lato_400Regular',
      alignSelf:'center',
      width:moderateScale(200),
      textAlign:'center',
    },
    imageRows:{
        width:moderateScale(320),
        height: verticalScale(170),
        marginHorizontal:scale(16),
        shadowColor: "#1A0000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent:'center',
        alignItems:'center'
    }
  });