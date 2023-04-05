import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView,Dimensions} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets/index'
import { heightPercentageToDP } from 'react-native-responsive-screen';

const YogaMainDetail = ({navigation,route}) => {
    const [loading, setLoading] = useState(false);
    const {data}=route.params;

    const thumbnailSource = require('../../../assets/videoThumb.png');

    const video = React.useRef(null);
    const [status, setStatus] = useState({});
    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }else{
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }
    

    const [PageName,setPageName]=useState("");

    const [dataMain,setDataMain]=useState({
        tYogaFile:"",
        tVideoLink:"",
        tYogaDesc:"",
    });
    
    useEffect(() => {
        setLoading(true);
        const postData={action:"YogaData",iYogaCatId:data?.iYogaCatId,iSubYogaCatId:data?.iSubYogaCatId?data?.iSubYogaCatId:0,iSubSubYogaCatId:data?.iSubSubYogaCatId?data?.iSubSubYogaCatId:0};
        APIService.apiAction(postData, apiUrls.yoga).then(res => {
            setLoading(false);
            if(res.status==200){
                if(res.data[data?.iYogaCatId] && res.data[data?.iYogaCatId].length>0){
                    setDataMain({...res.data[data?.iYogaCatId][0]});
                }
            }else{
                setDataMain({
                    tYogaFile:"",
                    tVideoLink:"",
                    tYogaDesc:"",
                });
            }
        })

      if(data?.iSubSubYogaCatId && data?.vSubSubYogaName){
        setPageName(data?.vSubSubYogaName)
      }else if(data?.iSubYogaCatId && data?.vSubYogaName){
        setPageName(data?.vSubYogaName)
      }else if(data?.iYogaCatId && data?.vYogaCategoryName){
        setPageName(data?.vYogaCategoryName)
      }else{
        setPageName("")
      }
      return () => {}
    }, [data])

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={PageName} />
        </SafeAreaView>
        <Main topMargin={1}>
            <View style={styles.container}>
                <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(100)}} >
                    <View style={styles.mainData}>
                        {
                            dataMain?.tYogaFile?
                            <Image source={{ uri: dataMain.tYogaFile }} style={styles.imageView2} resizeMode='stretch' />
                            :""
                        }

                        {
                            dataMain?.tYogaFile!="" && dataMain?.tVideoLink!=""?
                            <View>
                                <Video
                                ref={video}
                                posterSource={thumbnailSource}
                                style={styles.imageView}
                                source={{
                                    uri: dataMain.tVideoLink,
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

                        <View style={styles.textView}>
                            <Text style={styles.textDesc}>
                                {dataMain?.tYogaDesc}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Main>
    </View>
  )
}

export default YogaMainDetail

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
    marginTop:scale(0)
  },
  imageView:{
      width:moderateScale(355),
      height:verticalScale(200),
      // backgroundColor:'red'
  },
  textDesc:{
      marginTop:scale(20),
      fontSize:RFPercentage(3),
      fontFamily:'Lato_400Regular',
      lineHeight:moderateScale(30),
      textAlign:'justify',
  },
  imageView2:{
    marginTop:scale(10),
    width:moderateScale(355),
    height:heightPercentageToDP('100%'),
  },
  textView:{
      width:moderateScale(320),
      marginLeft:scale(20)
  }
})