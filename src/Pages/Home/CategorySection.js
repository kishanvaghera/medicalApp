import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image} from 'react-native'
import {scale,verticalScale,moderateScale} from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

function CategorySection(props) {
    const [TodayCategoryList,setTodayCategoryList]=useState([]);
    useEffect(()=>{
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
        return ()=>{}
    },[])
    
  return (
    <SwiperFlatList
        autoplay
        autoplayDelay={5}
        autoplayLoop
        index={0}
        data={TodayCategoryList?TodayCategoryList:[]} 
        renderItem={(curEle) => (
        <View style={styles.imageRows}>
            <Image source={images.theme1}  style={{...styles.boxImage}} resizeMode={'stretch'}/>
            <Text style={{...styles.categoryImageText}}>{curEle.item?.tText}</Text>
        </View>
        )}
    />
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
      color:"white",
      fontSize:moderateScale(26, 0.4),
      alignSelf:'center',
      marginTop:scale(40),
      width:moderateScale(200),
      textAlign:'center'
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
    }
  });