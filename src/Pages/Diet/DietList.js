import React, { useCallback, useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRef } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';

const DietList = ({navigation}) => {
    const [loading,setLoading]=useState(false);
    const [IsActiveTab,setIsActiveTab]=useState("Fixed");
    const swiperRef = useRef(null);

    const handleChange=(text)=>{
        setIsActiveTab(text);
    }

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

    const [DataImagesArr,setDataImagesArr]=useState([]);

    const ApiData=()=>{
        setLoading(true);
        const postData={action:"getDietDetail",iDietId:IsActiveTab=='Fixed'?TypeIds.iFixedId:TypeIds.iMonthlyId}
            APIService.apiAction(postData, apiUrls.diet).then(res => {
                setLoading(false);
                if(res.status==200){
                    setDataImagesArr([...res.data.tImageArr]);
                }
            })
    }
    
    useEffect(()=>{
        if(TypeIds.iFixedId>0){
            ApiData();
        }
    },[IsActiveTab,TypeIds])

    useEffect(()=>{
        if(DataImagesArr.length>0){
            swiperRef.current.scrollToIndex({ index: 0 });
        }
    },[DataImagesArr])

    useFocusEffect(
        useCallback(()=>{
            ApiData();
        },[navigation])
    )
    
  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={'Diet'} />
        </SafeAreaView>
        <Main>
            <View style={styles.container}>
                <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >

                    <View style={styles.rows}>
                        <TouchableOpacity onPress={()=>handleChange('Fixed')} style={{...styles.rowsTab,borderBottomColor:IsActiveTab=='Fixed'?'#0B4E98':'#82a6cf'}}>
                            <Text style={{fontSize:RFPercentage(2.3),fontFamily:'Lato_700Bold',color:'#2B3467'}}>Fixed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleChange('Monthly')} style={{...styles.rowsTab,borderBottomColor:IsActiveTab=='Monthly'?'#0B4E98':'#82a6cf'}}>
                            <Text style={{fontSize:RFPercentage(2.3),fontFamily:'Lato_700Bold',color:'#2B3467'}}>Monthly</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:widthPercentageToDP('100%')}}>
                        <SwiperFlatList
                            ref={swiperRef}
                            data={DataImagesArr?DataImagesArr:[]} 
                            renderItem={(curEle) => (
                            <View style={styles.imageRows}>
                                <Image source={{uri:curEle.item.tImage}}  style={{...styles.boxImage,width:widthPercentageToDP('100%'),height:hp(100)}} resizeMode="contain"/>
                            </View>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        </Main>
    </View>
  )
}

export default DietList

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    body2: {
        marginHorizontal:scale(16),
        marginVertical:scale(4),
    },
    rows:{
        width:moderateScale(310),
        flexDirection:'row',
        justifyContent:'space-between',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    rowsTab:{
        width:moderateScale(150),
        borderBottomWidth:scale(5),
        alignItems:'center',
        paddingBottom:scale(5)
    },
    imageRows:{
        marginTop:scale(0),
        paddingTop:scale(0)
    },
    boxImage:{
        marginTop:scale(0),
    }
})