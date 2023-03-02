import { View, Text, TouchableOpacity, ScrollView,StyleSheet, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as APIService from '../../Middleware/APIService';
import { Input } from '../../Layouts';
import {ToastMessage} from '../../utils/ToastMessage'
import RoutName from '../../Routes/RoutName';
import Icon from '../../utils/Icon'
import {Colors as theme}  from '../adminTheme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { moderateScale, scale, verticalScale } from '../../utils/scalling';
import * as ImagePicker from 'expo-image-picker';
import { Loader } from '../../Components';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';

const DietList = ({navigation}) => {
  const [loading,setLoading]=useState(false);

  const [TypeIds,setTypeIds]=useState({
    iFixedId:"",
    iMonthlyId:""
  });

  useEffect(()=>{
    const postData={action:"getTypeIds"};
    APIService.apiAction(postData, apiUrls.diet).then(res => {
      if(res.status==200){
        setTypeIds({
          iFixedId:res.data.iFixedId,
          iMonthlyId:res.data.iMonthlyId
        });
      }
    })
  },[])

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>Diet List</Text>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={{paddingBottom:50}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.mainBox}>

          <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_DIET_ADD,{data:{id:TypeIds.iFixedId,type:"Fixed"}})}}>
            <ImageBackground
              source={images.gradientBg}
              imageStyle={{borderRadius:scale(20)}}
              style={styles.imageBackgStyle}
            > 
              <View style={styles.subBox}>
                  <Text style={styles.textBox}>Fixed</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View style={{marginTop:scale(15)}}></View>

          <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_DIET_ADD,{data:{id:TypeIds.iMonthlyId,type:"Monthly"}})}}>
            <ImageBackground
              source={images.gradientBg}
              imageStyle={{borderRadius:scale(20)}}
              style={styles.imageBackgStyle}
            > 
              <View style={styles.subBox}>
                  <Text style={styles.textBox}>Monthly</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default DietList

const styles = StyleSheet.create({
  mainScreen:{
    marginTop: wp(10),
    padding:wp(5)
  },
  mainTitle:{
      fontSize:25,
      fontWeight:'800',
      color:theme.primaryDark,
  },
  mainBox:{
    marginTop:scale(10)
  },
  subBox:{
    width:moderateScale(320),
    height:verticalScale(150),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  textBox:{
    fontSize:scale(25),
    fontWeight:'800',
    color:'white'
  },
  imageBackgStyle:{
    width:moderateScale(320),
    height:verticalScale(150),
  }
})