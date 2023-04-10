import React, { useEffect, useRef, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import RoutName from '../../Routes/RoutName';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const ActivityCategoryList = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [IsActiveTab,setIsActiveTab]=useState("Daily");
    const swiperRef = useRef(null);

    const handleChange=(text)=>{
        setIsActiveTab(text);
    }

    const [DataImagesArr,setDataImagesArr]=useState([]);

    const [ActivityList,setActivityList]=useState([]);

    const ApiCall=()=>{
        setLoading(true);
        if(IsActiveTab=="Daily"){
            const postData={action:"getActivityCategory"};
            APIService.apiAction(postData, apiUrls.activity).then(res => {
                setLoading(false);
                if(res.status==200){
                    setActivityList([...res.data]);
                }else{
                    setActivityList([]);
                }
            })

            setDataImagesArr([]);
        }else{
            // swiperRef.current.scrollToIndex({ index: 0 });
            setActivityList([]);

            const postData={action:"FixedActivityList"};
            APIService.apiAction(postData, apiUrls.activity).then(res => {
                setLoading(false);
                if(res.status==200){
                    setDataImagesArr([...res.data]);
                }else{
                    setDataImagesArr([]);
                }
            })
        }
    }

    useEffect(()=>{
        ApiCall();
        return ()=>{}
    },[IsActiveTab])

    useFocusEffect(
        useCallback(()=>{
            ApiCall();
        },[navigation])
    )



  return (
    <View>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={'Activity'} />
        </SafeAreaView>
        <Main>
            <View style={{paddingBottom:scale(40)}}>
                <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >

                    <View style={styles.mainRows}>
                        <View style={styles.rows}>
                            <TouchableOpacity onPress={()=>handleChange('Daily')} style={{...styles.rowsTab,borderBottomColor:IsActiveTab=='Daily'?'#0B4E98':'#82a6cf'}}>
                                <Text style={{fontSize:RFPercentage(2.3),fontFamily:'Lato_700Bold',color:'#2B3467'}}>Daily</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>handleChange('Fixed')} style={{...styles.rowsTab,borderBottomColor:IsActiveTab=='Fixed'?'#0B4E98':'#82a6cf'}}>
                                <Text style={{fontSize:RFPercentage(2.3),fontFamily:'Lato_700Bold',color:'#2B3467'}}>Fixed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        IsActiveTab=='Daily'?
                        <View style={styles.boxRow}>
                            {
                                ActivityList.map((curEle,index)=>{
                                    return curEle.isExist>0?<TouchableOpacity style={styles.box} activeOpacity={.9} onPress={()=>{navigation.navigate(curEle
                                    .eIsSubCat=='y'?RoutName.SUB_ACTIVITY_LIST:RoutName.MAIN_ACTIVITY_LIST,{data:curEle
                                        .eIsSubCat=='y'?{id:curEle.iActivityCatId,name:curEle.vActivitCatName}:{iActivityCatId:curEle.iActivityCatId,vSubActivityName:curEle.vActivitCatName,}})}} key={index}>
                                                <View style={styles.imageBox}>
                                                    <Image source={images.yumIcon} style={styles.imageView} resizeMode={'contain'}/>
                                                    <Image source={images.om} style={styles.imageView2} resizeMode={'contain'}/>
                                                </View>
                                                <Text style={styles.boxText}>{curEle.vActivitCatName}</Text>
                                            </TouchableOpacity>:""
                                })
                            }
                        </View>
                        :
                        <View style={{width:moderateScale(310),alignSelf:'center'}}>
                            <SwiperFlatList
                                ref={swiperRef}
                                data={DataImagesArr?DataImagesArr:[]} 
                                renderItem={(curEle) => (
                                <View style={styles.imageRows2}>
                                    <Image source={{uri:curEle.item.tActivityFile}}  style={{...styles.boxImage3,width:315,height:hp(100)}} resizeMode="contain"/>
                                </View>
                                )}
                            />
                        </View>
                    }

                </ScrollView>
            </View>
        </Main>
    </View>
  )
}

export default ActivityCategoryList

const styles = StyleSheet.create({
    mainRows:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:scale(10)
    },
    rows:{
        width:moderateScale(310),
        flexDirection:'row',
        justifyContent:'space-between',
    },
    imageBox:{
        marginLeft:scale(10),
        marginTop:scale(5)
    },
    rowsTab:{
        width:moderateScale(150),
        borderBottomWidth:scale(5),
        alignItems:'center',
        paddingBottom:scale(5)
    },
    imageRows2:{
        marginTop:scale(0),
        paddingTop:scale(0)
    },
    boxImage3:{
        marginTop:scale(0),
    },
    boxRow:{
        alignSelf:'center',
    },  
    box:{
        flexDirection:'row',
        width:moderateScale(310),
        paddingBottom:scale(5),
        // paddingTop:scale(5),
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius:scale(10),
        marginBottom:scale(10),
        alignItems:'center'
    },
    imageView:{
        width:moderateScale(30),
        height:verticalScale(30),
        alignSelf:'center'
    },
    imageView2:{
        position:'absolute',
        width:moderateScale(40),
        height:verticalScale(40),
        zIndex:-1,
        top:-10,
        right:-5,
        tintColor:'#0B4E98'
    },  
    boxText:{
        fontFamily:'Lato_400Regular',
        fontSize:RFPercentage(2.3),
        width:moderateScale(250),
        marginLeft:scale(8)
    }
});