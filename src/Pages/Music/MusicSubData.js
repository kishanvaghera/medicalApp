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

function MusicSubData({navigation,route}) {
    const [loading, setLoading] = useState(false);
    const {data}=route.params;

    const [MusicList,setMusicList]=useState([]);
    useEffect(()=>{
        console.log("data",data)
        const postData={action:"GetMainMusicDataCatWise",iMusicCategoryId:data.iMusicCategoryId,iSubMusicCatId:data.iSubMusicCatId};
        APIService.apiAction(postData, apiUrls.music).then(res => {
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
        navigation.navigate(RoutName.MUSIC_DETAIL,{data:ddNew})
    }

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={data?.vSubMusicCatName?data?.vSubMusicCatName:data?.vMusicCategoryName?data?.vMusicCategoryName:""} />
        </SafeAreaView>
        <Main>
            <View style={styles.container}>
                <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
                    <View style={styles.body2}>
                        {
                            MusicList.map((curEle,index)=>{
                                return <TouchableOpacity key={index} activeOpacity={.7} onPress={()=>RedirectPage(curEle)} style={styles.imageRows}>
                                            <Image source={{uri:curEle.tMusicImage}}  style={styles.imageBox} resizeMode={'stretch'}/>
                                            <View style={{width:moderateScale(200)}}>
                                                <Text style={styles.imageBoxHeading}>{curEle.vMusicName}</Text>
                                                {/* <Text style={styles.imageBoxHeading}>{curEle.vSubMusicCatName}</Text> */}
                                            </View>
                                        </TouchableOpacity>
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </Main>
    </View>
  )
}

export default MusicSubData

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
        backgroundColor:'white',
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:scale(15),
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:scale(10),
        paddingBottom:scale(5),
        paddingTop:scale(5),
        paddingLeft:scale(10)
    },
    imageBox:{
        height:verticalScale(30),
        width:moderateScale(30),
        borderRadius:scale(100)
    },
    imageBoxHeading:{
        width:moderateScale(250),
        fontSize:RFPercentage(2.3),
        fontFamily:'Lato_400Regular',
        marginBottom:scale(5),
        marginLeft:scale(10)
    },
})