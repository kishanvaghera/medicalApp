import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';
import { Loader } from '../../Components';
import { Header } from '../../Layouts';
import RoutName from '../../Routes/RoutName';

const YogaCategoryList = ({navigation}) => {

    const [loading, setLoading] = useState(false);

    const [YogaList,setYogaList]=useState([]);
    useEffect(()=>{
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
        return ()=>{}
    },[])


  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={'Meditation'} />
        </SafeAreaView>
        <View style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >

                <View style={styles.body2}>
                    <View style={styles.imageRows}>
                        {
                            YogaList.map((curEle,index)=>{
                                return <TouchableOpacity activeOpacity={.9} onPress={()=>{navigation.navigate(curEle
                                .eIsSubCat=='y'?RoutName.YOGA_SUBCATEGORY_LIST:RoutName.YOGA_MAIN_CATEGORY_LIST,{data:curEle
                                    .eIsSubCat=='y'?{iYogaCatId:curEle.iYogaCatId,name:curEle.vYogaCategoryName}:{iYogaCatId:curEle.iYogaCatId,vSubActivityName:curEle.vYogaCategoryName,}})}} style={styles.column1} key={index}>
                                            <Text style={curEle.tImage==""?styles.boxText:styles.boxText2}>{curEle.vYogaCategoryName}</Text>
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

            </ScrollView>
        </View>
    </View>
  )
}

export default YogaCategoryList


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
      fontSize:moderateScale(20),
      fontWeight:'800',
      color:"white"
  },
  boxText2:{
      width:moderateScale(143),
      textAlign:'left',
      fontSize:moderateScale(25),
      fontWeight:'800',
      color:"white",
      marginBottom:scale(100),
      marginLeft:scale(15)
  },
  headTitle:{
      fontSize:moderateScale(20),
      fontWeight:'800',
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