import React, { useCallback, useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { heightPercentageToDP, heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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

    const [imageHeight, setImageHeight] = useState(100);

    const onImageLoad = event => {
        const screenWidth = Dimensions.get('window').width;
        const { width, height } = event.nativeEvent.source;
        const aspectRatio = width / height;
        const imageHeight = screenWidth / aspectRatio;
        setImageHeight(imageHeight);
    };
    
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
                contentContainerStyle={{paddingBottom:scale(80),paddingTop:scale(10)}} >

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
                                <Image source={{uri:curEle.item.tImage}}  style={{width:widthPercentageToDP('100%'),height:imageHeight}} onLoad={onImageLoad} resizeMode='stretch'/>
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
        alignItems: 'center',
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
        width:widthPercentageToDP('90%'),
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center'
    },
    rowsTab:{
        width:widthPercentageToDP('42%'),
        borderBottomWidth:scale(5),
        alignItems:'center',
        paddingBottom:scale(5)
    },
})