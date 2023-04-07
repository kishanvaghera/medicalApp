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

const MusicCategoryList = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [MusicList,setMusicList]=useState([]);
  useEffect(()=>{
      setLoading(true);
      const postData={action:"getMusicCategory"};
      APIService.apiAction(postData, apiUrls.music).then(res => {
            console.log("res",res)
          setLoading(false);
          if(res.status==200){
             setMusicList([...res.data]);
          }else{
              setMusicList([]);
          }
      })
      
      return ()=>{}
  },[])

  const RedirectPage=(ddNew)=>{
    if(ddNew.eIsSubCat=="y"){
        navigation.navigate(RoutName.SUB_MUSIC_LIST,{data:{iMusicCategoryId:ddNew.iMusicCategoryId,name:ddNew.vMusicCategoryName}})
    }else{
        if(ddNew.MusicCount>1){
            navigation.navigate(RoutName.MUSIC_SUB_DATA,{data:{iMusicCategoryId:ddNew.iMusicCategoryId,vSubMusicCatName:ddNew.vMusicCategoryName}})
        }else{
            navigation.navigate(RoutName.MUSIC_DETAIL,{data:{iMusicCategoryId:ddNew.iMusicCategoryId,vSubMusicCatName:ddNew.vMusicCategoryName}})
        }
    }
  }

  return (
    <View>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={'Music'} />
        </SafeAreaView>
        <Main>
            <View >
                <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
                    <View style={styles.boxRow}>
                        {
                            MusicList.map((curEle,index)=>{
                                return curEle.isExist>0?<TouchableOpacity style={styles.box} activeOpacity={.9} onPress={()=>{RedirectPage(curEle)}} key={index}>
                                            <View style={styles.imageBox}>
                                                <Image source={images.yumIcon} style={styles.imageView} resizeMode={'contain'}/>
                                                <Image source={images.om} style={styles.imageView2} resizeMode={'contain'}/>
                                            </View>
                                            <Text style={styles.boxText}>{curEle.vMusicCategoryName}</Text>
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

export default MusicCategoryList

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
        tintColor:'#9f5fea'
    },  
    boxText:{
        fontFamily:'Lato_400Regular',
        fontSize:RFPercentage(3),
        width:moderateScale(250),
        marginLeft:scale(8)
    }
})