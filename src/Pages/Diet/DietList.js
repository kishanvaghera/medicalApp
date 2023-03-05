import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';
import { Loader } from '../../Components';
import { Header } from '../../Layouts';
import RoutName from '../../Routes/RoutName';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const DietList = () => {
    const [loading,setLoading]=useState(false);
    
    const [IsActiveTab,setIsActiveTab]=useState("Fixed");

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

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={'Diet'} />
        </SafeAreaView>
        <View style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
                <View style={styles.rows}>
                    <TouchableOpacity onPress={()=>handleChange('Fixed')} style={{...styles.rowsTab,borderBottomColor:IsActiveTab=='Fixed'?'#FB2576':'#ebc3d2'}}>
                        <Text style={{fontSize:scale(18),fontWeight:'800',color:'#2B3467'}}>Fixed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleChange('Monthly')} style={{...styles.rowsTab,borderBottomColor:IsActiveTab=='Monthly'?'#FB2576':'#ebc3d2'}}>
                        <Text style={{fontSize:scale(18),fontWeight:'800',color:'#2B3467'}}>Monthly</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:moderateScale(310)}}>
                    <SwiperFlatList
                        index={0}
                        data={DataImagesArr?DataImagesArr:[]} 
                        renderItem={(curEle) => (
                        <View style={styles.imageRows}>
                            <Image source={{uri:curEle.item.tImage}}  style={{...styles.boxImage,width:320,height:heightPercentageToDP(100)}} resizeMode="contain"/>
                        </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
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
        marginTop:scale(15),
        flexDirection:'row',
        justifyContent:'space-between'
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