import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView,Dimensions,TouchableOpacity,} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { Video , Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import Icon from '../../utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import images from '../../../assets/'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import YoutubePlayerCust from '../../Components/YoutubePlayerCust';
import MusicPlayer from '../../Components/MusicPlayer';

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

    const ApiCall=()=>{
        const postData={action:"MusicData",iMusicCategoryId:data?.iMusicCategoryId,iSubMusicCatId:data?.iSubMusicCatId?data.iSubMusicCatId:0,iMusicId:data?.iMusicId};
        APIService.apiAction(postData, apiUrls.music).then(res => {
            // console.log("res",res)
            // setLoading(false);
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
    }

    useEffect(() => {
        ApiCall();
      return () => {}
    }, [])

    //Music Code Start Here
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [buffer, setBuffer] = useState(0);
    const [isStart,setIsStart]=useState(false);
    const [isLoop,setisLoop]=useState(false);

    const handleIsLoop=()=>{
        setisLoop(!isLoop);
    }

    const getMusicDuration=async()=>{
        const { sound } = await Audio.Sound.createAsync(
            { uri:MusicDetailData?.tMusicFile},
            { shouldPlay: false }
          );
        sound.setOnPlaybackStatusUpdate((status) => {
            setDuration(status.durationMillis);
        });
    }

    useEffect(()=>{
        if(MusicDetailData?.tMusicFile!=""){
            getMusicDuration();
        }
    },[MusicDetailData])
  
    useEffect(() => {
      return sound
        ? () => {
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
  
    async function playSound(isNewPosition="") {
        if(isStart){
            if(isNewPosition!=''){
                if(isNewPosition>0){
                    await sound.playFromPositionAsync(isNewPosition);
                }else{
                    await sound.playFromPositionAsync(0);
                }
                setIsPlaying(true);
            }else{
                resumeAudio(position);
                setIsPlaying(true);
            }
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

    useEffect(()=>{
        if(position==duration && isLoop && isPlaying){
            playSound();
        }
    },[position])
  
    async function pauseSound() {
      await sound.pauseAsync();
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

    const backForwordsMusic=()=>{
        playSound(position-5000);
    }

    const FastForwordsMusic=()=>{
        playSound(position+5000);
    }

    const [imageHeight, setImageHeight] = useState(0);

    const onImageLoad = event => {
        const screenWidth = Dimensions.get('window').width;
        const { width, height } = event.nativeEvent.source;
        const aspectRatio = width / height;
        const imageHeight = screenWidth / aspectRatio;
        setImageHeight(imageHeight);
    };

    const [isPlayButtonClicked,setisPlayButtonClicked]=useState(false);
    const handlePlayPress = async () => {
        await video.current.playAsync();
        setisPlayButtonClicked(true);
    };

    const musicDescArr = new String(MusicDetailData?.tMusicDesc).split("=>");

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={PageName} />
        </SafeAreaView>
        {
            MusicDetailData?.tMusicFile && MusicDetailData.tMusicFile!=""?
            <View style={styles.bottom}>
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
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity>
                                <Icon LibraryName="FontAwesome" IconName={'download'} IconSize={20} IconColor='#0B4E98'  />
                            </TouchableOpacity>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity style={{...styles.button,...{backgroundColor:'transparent'}}} onPress={backForwordsMusic}>
                                <Icon LibraryName="FontAwesome" IconName={'backward'} IconSize={20} IconColor='#0B4E98' />
                            </TouchableOpacity>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity style={{...styles.button,...{backgroundColor:'transparent'}}} onPress={() => isPlaying ? pauseSound() : playSound()}>
                                <Icon LibraryName="FontAwesome" IconName={isPlaying ? 'pause' : 'play'} IconSize={20} IconColor='#0B4E98' />
                            </TouchableOpacity>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity style={{...styles.button,...{backgroundColor:'transparent'}}} onPress={FastForwordsMusic}>
                                <Icon LibraryName="FontAwesome" IconName={'forward'} IconSize={20} IconColor='#0B4E98' />
                            </TouchableOpacity>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity onPress={handleIsLoop} style={{marginTop:scale(0)}}>
                                <Icon LibraryName="Feather" IconName={'repeat'} IconSize={20} IconColor={isLoop?'#7732e6':'#0B4E98'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>:""
        }
        <Main>
            <View style={styles.container}>
                <View style={styles.mainData}>
                {
                    MusicDetailData?.tYoutubeLink!=""?
                    <>
                    <View>
                        {/* <Video
                            ref={video}
                            style={styles.VideoView}
                            source={{
                                uri: MusicDetailData.tVideoLink,
                                preload: true,
                            }}
                            useNativeControls={isPlayButtonClicked}
                            rate={1.0}
                            isMuted={false}
                            resizeMode='stretch'
                            isLooping   
                            onPlaybackStatusUpdate={status => setStatus(() => 'Play')}
                            onFullscreenUpdate={setOrientation}
                        /> */}

                        <YoutubePlayerCust height={verticalScale(200)} width={widthPercentageToDP('100%')} url={MusicDetailData?.tYoutubeLink}/>

                        {/* {
                            isPlayButtonClicked?"":
                            <TouchableOpacity onPress={handlePlayPress} style={{position:'absolute',top:0}} >
                                <Image source={images.videoThumb} style={styles.thumbnail}/>
                            </TouchableOpacity>
                        } */}
                    </View> 
                    </>
                    :""
                }
                    
                
                {
                    MusicDetailData?.tMusicImage && MusicDetailData?.tVideoLink==""?
                    <View style={styles.musicProfileShadow}>
                        <Image source={{ uri: MusicDetailData.tMusicImage }} style={{ width: moderateScale(280), height: imageHeight }} resizeMode='stretch'  onLoad={onImageLoad}/>
                    </View>:""
                }

                <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:scale(80),paddingTop:scale(10)}} >
                        {
                            MusicDetailData?.tMusicDesc!=""?
                            <View style={styles.textView}>
                                {
                                    musicDescArr.map((curEle,index)=>{
                                        const isStringHeader=new String(curEle).includes("*");
                                        let newString=curEle;
                                        if(isStringHeader){
                                            newString=curEle.replace('*','');
                                        }
                                        return  curEle!=""?<View style={{...styles.paragraphBox,...isStringHeader?{alignSelf:'center'}:{}}}>
                                                    {
                                                        isStringHeader?"":
                                                        <View>
                                                            <Icon LibraryName="MaterialCommunityIcons" IconName="flower" IconSize={25} IconColor="#0B4E98" />
                                                        </View>
                                                    }
                                                    <Text style={{...styles.textDesc,...isStringHeader?{textAlign:'center',fontSize:RFPercentage(2),fontFamily:'Lato_700Bold'}:{}}} key={index}>
                                                        {newString}
                                                    </Text>
                                                </View>:""
                                    })
                                }
                                <View style={{marginTop:scale(20),alignSelf:'center'}}>
                                    <Icon LibraryName="Feather" IconName="smile" IconSize={45} IconColor="#f10078" />
                                </View>
                            </View>
                            :""
                        }
                </ScrollView>
                </View>
            </View>
        </Main>
    </View>
  )
}

export default MusicDetail

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#f1f8ff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    imageView2:{
        marginTop:scale(10),
        width:widthPercentageToDP('100%'),
        height:heightPercentageToDP('100%'),
    },
    mainData:{
        width:widthPercentageToDP('100%'),
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        paddingBottom:scale(400)
    },
    imageView:{
        width:moderateScale(280),
        height:'auto',
        // borderRadius:scale(110)
        // backgroundColor:'red'
    },
    VideoView:{
        width:moderateScale(350),
        height:verticalScale(200),
    },
    textDesc:{
        fontSize:RFPercentage(2),
        fontFamily:'Lato_400Regular',
        width:widthPercentageToDP('75%')
    },
    textView:{
        width:widthPercentageToDP('90%'),
        backgroundColor:'white',
        marginTop:scale(25),
        paddingHorizontal:scale(10),
        borderRadius:scale(15),
        paddingVertical:scale(20),
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    paragraphBox:{
        flexDirection:'row',
    },
    SubContainer: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
        fontSize:RFPercentage(2),
        fontFamily:'Lato_400Regular',
        color: 'white',
        marginBottom: 24,
    },
    button: {
        width:moderateScale(40),
        height:verticalScale(40),
        backgroundColor: '#0B4E98',
        borderRadius: scale(70),
        marginTop:scale(0),
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    time: {
        fontSize:RFPercentage(2),
        fontFamily:'Lato_400Regular',
        color: 'white',
        marginBottom: 8,
    },
    progressContainer: {
        // flexDirection: 'row',
        height: 8,
        width: moderateScale(310),
        backgroundColor: 'rgba(251, 37, 118, 0.2)',
        marginTop:scale(5),
        borderRadius:scale(10)
    },
    progressBar: {
        height: 8,
        backgroundColor: '#0B4E98',
        borderRadius:scale(10)
    },
    songName:{
        fontSize:RFPercentage(2),
        fontFamily:'Lato_400Regular',
        marginTop:scale(10),
        width:moderateScale(310),
        textAlign:'center'
    },
    MusicScreen:{
        width:moderateScale(310),
        marginTop:scale(1),
        paddingBottom:scale(0),
        // paddingTop:scale(5),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    durationText:{
        fontSize:RFPercentage(2),
        fontFamily:'Lato_400Regular',
        color:'#0B4E98',
    },
    musicProfileShadow:{
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding:scale(15),
        borderRadius:scale(10),
        marginTop:verticalScale(5)
    },
    bottom: {
        width:widthPercentageToDP('100%'),
        position: 'absolute',
        bottom: 2,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        // padding: 10,
        paddingLeft:'5%',
        paddingBottom:scale(5),
        zIndex:9999,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    thumbnail: {
        width:moderateScale(350),
        height:verticalScale(200),
        resizeMode: 'stretch',
      },
  })