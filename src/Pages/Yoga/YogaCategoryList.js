import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import RoutName from '../../Routes/RoutName';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const YogaCategoryList = ({navigation}) => {

    const [loading, setLoading] = useState(false);

    const [YogaList,setYogaList]=useState([]);

    const ApiCall=()=>{
        setLoading(true);
        const postData={action:"getYogaCategory"};
        APIService.apiAction(postData, apiUrls.yoga).then(res => {
            setLoading(false);
            if(res.status==200){
                setYogaList([...res.data]);
            }else{
                setYogaList([]);
            }
        })
    }

    useEffect(()=>{
        ApiCall();
        return ()=>{}
    },[])

    useFocusEffect(
        useCallback(()=>{
            ApiCall();
        },[navigation])
    )

    const RedirectPage=(curEle)=>{
        if(curEle.aSubCategoryList.length>0){
            navigation.navigate(RoutName.YOGA_SUBCATEGORY_LIST,{data:{iYogaCatId:curEle.iYogaCatId,name:curEle.vYogaCategoryName}});
        }else{
            if(curEle.YogaCount>1){
                navigation.navigate(RoutName.YOGA_MAIN_CATEGORY_LIST,{data:{iYogaCatId:curEle.iYogaCatId,vSubActivityName:curEle.vYogaCategoryName}});
            }else{
                navigation.navigate(RoutName.YOGA_DETAIL,{data:curEle});
            }
        }
    }

  return (
    <View>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={'Meditation'} />
        </SafeAreaView>
        <Main>
            <View>
                <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:scale(80),paddingTop:scale(10)}} >
                    <View style={styles.boxRow}>
                        {
                            YogaList.map((curEle,index)=>{
                                return curEle.isExist>0?<TouchableOpacity style={styles.box} activeOpacity={.9} onPress={()=>{RedirectPage(curEle)}} key={index}>
                                            <View style={styles.imageBox}>
                                                <Image source={images.yumIcon} style={styles.imageView} resizeMode={'contain'}/>
                                                <Image source={images.om} style={styles.imageView2} resizeMode={'contain'}/>
                                            </View>
                                            <Text style={styles.boxText}>{curEle.vYogaCategoryName}</Text>
                                        </TouchableOpacity>:""
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </Main>
    </View>
  )
}

export default YogaCategoryList

const styles = StyleSheet.create({
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
    imageBox:{
        marginLeft:scale(10),
        marginTop:scale(5)
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