import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView,Dimensions,TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { Header } from '../../Layouts';
import { Video , Audio} from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import Icon from '../../utils/Icon';

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
    
    const PageName=data?.iSubMusicCatId?data?.vSubMusicCatName:data?.iMusicCategoryId?data?.vMusicCategoryName:""

    const [MusicDetailData,setMusicDetailData]=useState({
        tMusicImage:"",
        tVideoLink:"",
        tMusicDesc:"",
    });

    useEffect(() => {
        setLoading(true);
        const postData={action:"MusicData",iMusicCategoryId:data?.iMusicCategoryId,iSubMusicCatId:data?.iSubMusicCatId?data.iSubMusicCatId:0};
        APIService.apiAction(postData, apiUrls.music).then(res => {
            setLoading(false);
            if(res.status==200){
                if(res.data[data?.iMusicCategoryId] && res.data[data?.iMusicCategoryId].length>0){
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


    //Music Code Start Here
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [buffer, setBuffer] = useState(0);
    const [isStart,setIsStart]=useState(false);
  
    useEffect(() => {
      return sound
        ? () => {
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
  
    async function playSound() {
        if(isStart){
            resumeAudio(position);
            setIsPlaying(true);
        }else{
            const { sound } = await Audio.Sound.createAsync(
              { uri:MusicDetailData?.tMusicFile},
              { shouldPlay: true }
            );
            setSound(sound);
            setIsPlaying(true);
            setIsStart(true);
            sound.setOnPlaybackStatusUpdate((status) => {
              setDuration(status.durationMillis);
              setPosition(status.positionMillis);
              setBuffer(status.playableDurationMillis - status.positionMillis);
            });
        }
    }
  
    async function pauseSound() {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  
    async function stopSound() {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  
    function formatTime(time) {
      const minutes = Math.floor(time / 60000);
      const seconds = ((time % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    async function resumeAudio(positionMillis) {
        try {
          await sound.playFromPositionAsync(positionMillis);
        } catch (error) {
          console.log(error);
        }
    }
  
 
    const isPlayying=isPlaying?{paddingLeft:0}:{paddingLeft:scale(5)}
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
                    
                    <Text style={styles.songName}>Baby Song</Text>
                    <View style={styles.MusicScreen}>
                        <View>
                            <Text style={styles.durationText}>{formatTime(position)}</Text>
                        </View>
                        <View>
                            <Text  style={styles.durationText}>{formatTime(duration)}</Text>
                        </View>
                    </View>
                    <View style={{width:moderateScale(310)}}>
                        <View style={styles.progressContainer}>
                            <View style={[styles.progressBar, { width: (position / duration) * 100 + '%' }]}></View>
                            <View style={[styles.progressBar, { width: (buffer / duration) * 100 + '%', backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}></View>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity style={{...styles.button,...isPlayying}} onPress={() => isPlaying ? pauseSound() : playSound()}>
                                <Icon LibraryName="FontAwesome" IconName={isPlaying ? 'pause' : 'play'} IconSize={32} IconColor='white' />
                            </TouchableOpacity>
                        </View>
                    </View>


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
                    {/* <View style={styles.textView}>
                        <Text style={styles.textDesc}>
                            {MusicDetailData?.tMusicDesc}
                        </Text>
                    </View> */}
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
        width:moderateScale(320),
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    imageView:{
        width:moderateScale(200),
        height:verticalScale(200),
        borderRadius:scale(110)
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
    },
    SubContainer: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 24,
    },
    button: {
        width:moderateScale(70),
        height:verticalScale(70),
        backgroundColor: '#FB2576',
        borderRadius: scale(70),
        marginTop:scale(20),
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    time: {
        fontSize: 16,
        color: 'white',
        marginBottom: 8,
    },
    progressContainer: {
        // flexDirection: 'row',
        height: 8,
        width: moderateScale(310),
        backgroundColor: 'rgba(251, 37, 118, 0.2)',
        marginTop:scale(15),
        borderRadius:scale(10)
    },
    progressBar: {
        height: 8,
        backgroundColor: '#FB2576',
        borderRadius:scale(10)
    },
    songName:{
        fontSize:scale(25),
        marginTop:scale(10),
        width:moderateScale(310),
        textAlign:'center'
    },
    MusicScreen:{
        width:moderateScale(310),
        marginTop:scale(40),
        paddingBottom:scale(5),
        paddingTop:scale(5),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    durationText:{
        fontSize:scale(18),
        color:'#FB2576',
        fontWeight:'600'
    }
  })