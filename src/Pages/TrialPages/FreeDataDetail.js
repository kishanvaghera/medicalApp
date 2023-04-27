import React, { useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, Dimensions } from 'react-native'
import { moderateScale, scale, verticalScale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts'
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import images from '../../../assets';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

const FreeDataDetail = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const swiperRef = useRef(null);
    const { data } = route.params;

    console.log("data",data)
    const [imageHeight, setImageHeight] = useState(100);

    const onImageLoad = event => {
        const screenWidth = Dimensions.get('window').width;
        const { width, height } = event.nativeEvent.source;
        const aspectRatio = width / height;
        const imageHeight = screenWidth / aspectRatio;
        setImageHeight(imageHeight);
    };

    const [DataImagesArr,setDataImagesArr]=useState([]);

    useEffect(()=>{
        if(data?.tImage){
            setDataImagesArr(data.tImage);
        }
    },[data])

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleIndexChanged = (index) => {
        setCurrentIndex(index);
    };

    const thumbnailSource = require('../../../assets/videoThumb.png');

    const videoRef = React.useRef(null);
    const [status, setStatus] = useState({});
    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    const [isPlayButtonClicked, setisPlayButtonClicked] = useState(false);
    const handlePlayPress = async () => {
        // Call the playAsync method to start playing the video
        await videoRef.current.playAsync();
        setisPlayButtonClicked(true);
    };


  return (
     <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header title={'Basic'} />
        </SafeAreaView>
        <Main>
            <SwiperFlatList
                loop={false}
                ref={swiperRef}
                data={DataImagesArr?DataImagesArr:[]} 
                renderItem={(curEle) => (
                <View style={styles.imageRows}>
                    {
                        data.eType=="Image"?
                        <>
                            <Image source={{uri:curEle.item}}  style={{width:wp('100%'),height:imageHeight}} onLoad={onImageLoad} resizeMode='stretch'/>
                        </>:<>
                        <Video
                            ref={videoRef}
                            posterSource={thumbnailSource}
                            style={styles.imageView}
                            source={{
                                uri: curEle.item,
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
                            isPlayButtonClicked ? "" :
                                <TouchableOpacity onPress={handlePlayPress} style={{ position: 'absolute'}} >
                                    <Image source={images.videoThumb} style={styles.thumbnail} />
                                </TouchableOpacity>
                        }
                        </>
                    }
                    
                </View>
                )}
                onChangeIndex={(index)=>{
                    handleIndexChanged(index.index);
                }}
            />
            <View style={styles.bottomIndec}>
                <Text style={styles.IndecText}>{currentIndex+1} / {DataImagesArr.length}</Text>
            </View>
        </Main>
    </View>
  )
}

export default FreeDataDetail

const styles = StyleSheet.create({
    bottomIndec:{
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        backgroundColor:'#0B4E98',
        paddingHorizontal:scale(20),
        paddingVertical:scale(10),
        borderRadius:scale(20)
    },
    imageRows:{
        justifyContent:'center',
        alignItems:'center',
        height:heightPercentageToDP('90%')
    },
    IndecText:{
        color:'white',
        fontSize: RFPercentage(2.3),
        fontFamily: 'Lato_700Bold',
    },
    imageView: {
        width: moderateScale(355),
        height: verticalScale(200),
        // backgroundColor:'red'
    },
    thumbnail: {
        width: moderateScale(355),
        height: verticalScale(200),
        resizeMode: 'stretch',
    },
})