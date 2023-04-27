import React, { useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView,Dimensions, TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RFPercentage } from 'react-native-responsive-fontsize';
import images from '../../../assets/index'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import YoutubePlayerCust from '../../Components/YoutubePlayerCust';

const ActivityDetail = ({navigation, route}) => {
    const [loading, setLoading] = useState(false);
    const {data}=route.params;

    // const video = React.useRef(null);
    // const [status, setStatus] = useState({});
    // function setOrientation() {
    //     if (Dimensions.get('window').height > Dimensions.get('window').width) {
    //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    //     }else{
    //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    //     }
    // }

    // const [isPlayButtonClicked,setisPlayButtonClicked]=useState(false);
    // const handlePlayPress = async () => {
    //     // Call the playAsync method to start playing the video
    //     await video.current.playAsync();
    //     setisPlayButtonClicked(true);
    // };

    const yogaDescArr = new String(data?.tActivityDesc).split("=>");

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={(data?.vActivityName==null || data?.vActivityName=="")?(data.vSubActivityName==null || data.vSubActivityName=="")?data.vActivitCatName:data.vSubActivityName:data?.vActivityName} />
        </SafeAreaView>
        <Main>
            <View style={styles.container}>
                <View style={styles.mainData}>
                    {
                        data?.tActivityFile?
                        <Image source={{ uri: data.tActivityFile }} style={styles.imageView} resizeMode={'contain'}/>
                        :""
                    }

                    {/* {
                        data?.tActivityFile=="" && data?.tVideoLink!=""?
                            <>
                            <Video
                                ref={video}
                                style={styles.imageView}
                                source={{
                                    uri: data.tVideoLink,
                                }}
                                useNativeControls={isPlayButtonClicked}
                                rate={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                isLooping   
                                onPlaybackStatusUpdate={status => setStatus(() => 'Play')}
                                onFullscreenUpdate={setOrientation}
                            />
                            {
                                isPlayButtonClicked?"":
                                <TouchableOpacity onPress={handlePlayPress} style={{position:'absolute',top:0}} >
                                    <Image source={images.videoThumb} style={styles.thumbnail}/>
                                </TouchableOpacity>
                            }
                            </>
                            :""
                    } */}

                    {
                        data?.tActivityFile=="" && data?.tYoutubeLink!=""?
                        <YoutubePlayerCust height={220} width={widthPercentageToDP('100%')} url={data?.tYoutubeLink}/>:""
                    }

                    {
                        data?.tActivityDesc!=""?
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(100)}} >
                                    <View style={styles.textView}>
                                        {/* <Text style={styles.textDesc}> */}
                                            {
                                                yogaDescArr.map((curEle,index)=>{
                                                    const isStringHeader=new String(curEle).includes("*");
                                                    let newString=curEle;
                                                    if(isStringHeader){
                                                        newString=curEle.replace('*','');
                                                    }

                                                    return <Text key={index} style={{...styles.textDesc,...isStringHeader?{textAlign:'center',fontSize:RFPercentage(2),fontFamily:'Lato_700Bold'}:{}}}>{newString}</Text>
                                                })
                                            }
                                        {/* </Text> */}
                                    </View>
                            </ScrollView>
                        :""
                    }
                </View>
            </View>
        </Main>
    </View>
  )
}

export default ActivityDetail

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        width:widthPercentageToDP('100%'),
    },
    mainData:{
    },
    imageView:{
        width:moderateScale(355),
        height:verticalScale(200),
        // backgroundColor:'red'
    },
    textDesc:{
        fontSize:RFPercentage(2),
        fontFamily:'Lato_400Regular',
        lineHeight:moderateScale(20),
    },
    textView:{
        marginTop:scale(20),
        width:widthPercentageToDP('90%'),
        alignSelf:'center',
        backgroundColor:'white',
        padding:scale(10),
        borderRadius:scale(10)
    },
    thumbnail: {
      width:moderateScale(355),
      height:verticalScale(200),
      resizeMode: 'stretch',
    },
})