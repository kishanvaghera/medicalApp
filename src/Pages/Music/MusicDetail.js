import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView,Dimensions} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { Header } from '../../Layouts';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const MusicDetail = ({navigation,route}) => {

    const [loading, setLoading] = useState(false);
    const {data}=route.params;

    const video = React.useRef(null);
    const [status, setStatus] = useState({});
    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }else{
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }
    
    const PageName=data?.iSubMusicCatId?data.vSubMusicCatName:data?.iMusicCategoryId?data.vMusicCategoryName:""

    const [MusicDetailData,setMusicDetailData]=useState({
        tMusicImage:"",
        tVideoLink:"",
        tMusicDesc:"",
    });

    useEffect(() => {
        setLoading(true);
        const postData={action:"MusicData",iMusicCategoryId:data.iMusicCategoryId,iSubMusicCatId:data?.iSubMusicCatId?data.iSubMusicCatId:0};
        APIService.apiAction(postData, apiUrls.music).then(res => {
            setLoading(false);
            if(res.status==200){
                if(res.data[data.iMusicCategoryId] && res.data[data.iMusicCategoryId].length>0){
                    setMusicDetailData(res.data[data.iMusicCategoryId][0]);
                }else{
                    setMusicDetailData({
                        tMusicImage:"",
                        tVideoLink:"",
                        tMusicDesc:"",
                    });
                }
            }else{
                setMusicDetailData({
                    tMusicImage:"",
                    tVideoLink:"",
                    tMusicDesc:"",
                });
            }
        })
      return () => {}
    }, [])
    

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={PageName} />
        </SafeAreaView>
        <View style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(100)}} >
                <View style={styles.mainData}>
                    {
                        MusicDetailData?.tMusicImage?
                        <Image source={{ uri: MusicDetailData.tMusicImage }} style={styles.imageView} resizeMode={'contain'}/>
                        :""
                    }

                    {
                        MusicDetailData?.tMusicImage=="" && MusicDetailData?.tVideoLink!=""?
                            <Video
                            ref={video}
                            style={styles.imageView}
                            source={{
                                uri: MusicDetailData.tVideoLink,
                            }}
                            useNativeControls
                            rate={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            isLooping   
                            onPlaybackStatusUpdate={status => setStatus(() => 'Play')}
                            onFullscreenUpdate={setOrientation}
                        />:""
                    }
                    <View style={styles.textView}>
                        <Text style={styles.textDesc}>
                            {MusicDetailData?.tMusicDesc}
                        </Text>
                    </View>
                    
                    {
                        MusicDetailData?.tMusicImage!="" && MusicDetailData?.tVideoLink!=""?
                        <View style={{marginTop:scale(20)}}>
                            <Video
                            ref={video}
                            style={styles.imageView}
                            source={{
                                uri: MusicDetailData.tVideoLink,
                            }}
                            useNativeControls
                            rate={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            isLooping   
                            onPlaybackStatusUpdate={status => setStatus(() => 'Play')}
                            onFullscreenUpdate={setOrientation}
                        />
                        </View>:""
                    }
                </View>
            </ScrollView>
        </View>
    </View>
  )
}

export default MusicDetail

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
    mainData:{
  
    },
    imageView:{
        width:moderateScale(355),
        height:verticalScale(200),
        // backgroundColor:'red'
    },
    textDesc:{
        marginTop:scale(20),
        fontSize:moderateScale(18),
        lineHeight:moderateScale(30),
        textAlign:'justify',
    },
    textView:{
        width:moderateScale(320),
        marginLeft:scale(20)
    }
  })