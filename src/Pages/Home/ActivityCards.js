import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import RoutName from '../../Routes/RoutName';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ActivityCards = (props) => {
    const navigation = useNavigation();
    const [ActivityList,setActivityList]=useState([]);
    useEffect(()=>{
        props.setLoading(true);
        const postData={action:"getActivityCategory"};
        APIService.apiAction(postData, apiUrls.activity).then(res => {
            props.setLoading(false);
            if(res.status==200){
                setActivityList([...res.data]);
            }else{
                setActivityList([]);
            }
        })
        return ()=>{}
    },[])

  return (
    <View style={styles.body}>
        <View style={styles.imageRows}>
            {
                ActivityList.map((curEle,index)=>{
                    return <TouchableOpacity activeOpacity={.9} onPress={()=>{navigation.navigate(RoutName.SUB_ACTIVITY_LIST,{data:{id:curEle.iActivityCatId,name:curEle.vActivitCatName}})}} style={styles.column1} key={index}>
                                <Text style={curEle.tImage==""?styles.boxText:styles.boxText2}>{curEle.vActivitCatName}</Text>
                                {
                                    curEle.tImage!=""?
                                    <Image source={{uri:curEle.tImage}}  style={{...styles.boxImage}} resizeMode={'stretch'}/>
                                    :<Image source={images.gradientBg}  style={{...styles.boxImage2}} resizeMode={'stretch'}/>
                                }
                            </TouchableOpacity>
                })
            }
        </View>
    </View>
  )
}

export default ActivityCards

const styles = StyleSheet.create({
    body: {
        marginHorizontal:scale(16),
        marginVertical:scale(4),
    },
    imageRows:{
        width:moderateScale(320),
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    column1:{
        width:moderateScale(150),
        height:verticalScale(140),
        marginBottom:scale(20),
        backgroundColor:'#544482',
        borderRadius:moderateScale(15),
        justifyContent:'center',
        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    boxText:{
        width:moderateScale(143),
        textAlign:'center',
        fontSize:RFPercentage(3),
        fontFamily:'Lato_400Regular',
        color:"white"
    },
    boxText2:{
        width:moderateScale(143),
        textAlign:'left',
        fontSize:RFPercentage(3),
        fontFamily:'Lato_400Regular',
        color:"white",
        marginBottom:scale(100),
        marginLeft:scale(15)
    },
    headTitle:{
        fontSize:RFPercentage(3),
        fontFamily:'Lato_400Regular',
        marginBottom:scale(15),
        color:"#3A1078"
    },
    boxImage:{
        height:verticalScale(100),
        width:moderateScale(100),
        position:'absolute',
        bottom:scale(10),
        right:0,
    },
    boxImage2:{
        width:moderateScale(150),
        height:verticalScale(140),
        position:'absolute',
        top:0,
        zIndex:-1,
        borderRadius:moderateScale(15),
    }
});