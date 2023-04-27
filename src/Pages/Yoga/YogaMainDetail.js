import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets/index'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from '../../utils/Icon';
import YoutubePlayerCust from '../../Components/YoutubePlayerCust';

const YogaMainDetail = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const { data } = route.params;

    // const thumbnailSource = require('../../../assets/videoThumb.png');

    // const video = React.useRef(null);
    // const [status, setStatus] = useState({});
    // function setOrientation() {
    //     if (Dimensions.get('window').height > Dimensions.get('window').width) {
    //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    //     } else {
    //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    //     }
    // }


    const [PageName, setPageName] = useState("");

    const [dataMain, setDataMain] = useState({
        tYogaFile: "",
        tVideoLink: "",
        tYogaDesc: "",
    });

    useEffect(() => {
        setLoading(true);
        const postData = { action: "YogaData", iYogaCatId: data?.iYogaCatId, iSubYogaCatId: data?.iSubYogaCatId ? data?.iSubYogaCatId : 0, iSubSubYogaCatId: data?.iSubSubYogaCatId ? data?.iSubSubYogaCatId : 0, iYogaId: data?.iYogaId };
        APIService.apiAction(postData, apiUrls.yoga).then(res => {
            setLoading(false);
            if (res.status == 200) {
                if (res.data[data?.iYogaCatId] && res.data[data?.iYogaCatId].length > 0) {
                    setDataMain({ ...res.data[data?.iYogaCatId][0] });
                }
            } else {
                setDataMain({
                    tYogaFile: "",
                    tVideoLink: "",
                    tYogaDesc: "",
                });
            }
        })

        if (data?.iSubSubYogaCatId && data?.vSubSubYogaName) {
            setPageName(data?.vSubSubYogaName)
        } else if (data?.iSubYogaCatId && data?.vSubYogaName) {
            setPageName(data?.vSubYogaName)
        } else if (data?.iYogaCatId && data?.vYogaCategoryName) {
            setPageName(data?.vYogaCategoryName)
        } else {
            setPageName("")
        }
        return () => { }
    }, [data])

    // const [isPlayButtonClicked, setisPlayButtonClicked] = useState(false);
    // const handlePlayPress = async () => {
    //     // Call the playAsync method to start playing the video
    //     await video.current.playAsync();
    //     setisPlayButtonClicked(true);
    // };

    const yogaDescArr = new String(dataMain?.tYogaDesc).split("=>");

    const [imageHeight, setImageHeight] = useState(0);

    const onImageLoad = event => {
        const screenWidth = Dimensions.get('window').width;
        const { width, height } = event.nativeEvent.source;
        const aspectRatio = width / height;
        const imageHeight = screenWidth / aspectRatio;
        setImageHeight(imageHeight);
    };

    return (
        <View style={styles.body}>
            <Loader loading={loading} />
            <SafeAreaView>
                <Header iconName={'menu'} title={PageName} />
            </SafeAreaView>
            <Main topMargin={1}>
                <View style={styles.container}>

                    <View style={styles.mainData}>
                        {
                            dataMain?.tYogaFile && dataMain?.tVideoLink==""?
                                <Image source={{ uri: dataMain.tYogaFile }} style={{...styles.imageView2,height: imageHeight }} onLoad={onImageLoad} resizeMode='stretch' />
                                : ""
                        }

                        {/* {
                            dataMain?.tYogaFile != "" && dataMain?.tVideoLink != "" ?
                                <>
                                    <View style={{ marginTop: scale(15) }}>
                                        <Video
                                            ref={video}
                                            posterSource={thumbnailSource}
                                            style={styles.imageView}
                                            source={{
                                                uri: dataMain.tVideoLink,
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
                                                <TouchableOpacity onPress={handlePlayPress} style={{ position: 'absolute', top: 0 }} >
                                                    <Image source={images.videoThumb} style={styles.thumbnail} />
                                                </TouchableOpacity>
                                        }
                                    </View>
                                </>
                                : ""
                        } */}

                        {
                            dataMain?.tYogaFile != "" && dataMain?.tYoutubeLink != ""?
                            <YoutubePlayerCust height={verticalScale(200)} width={widthPercentageToDP('100%')} url={dataMain?.tYoutubeLink}/>
                            :""
                        }
                        
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: scale(100),paddingTop:scale(10)}} >
                                {
                                    dataMain?.tYogaDesc != "" ?
                                        <View style={styles.textView}>
                                            {
                                                yogaDescArr.map((curEle, index) => {
                                                    const isStringHeader=new String(curEle).includes("*");
                                                    let newString=curEle;
                                                    if(isStringHeader){
                                                        newString=curEle.replace('*','');
                                                    }
                                                    return curEle != "" ? <View style={{...styles.paragraphBox,...isStringHeader?{alignSelf:'center'}:{}}}>
                                                        <View>
                                                            {/* <Icon LibraryName="MaterialCommunityIcons" IconName="flower" IconSize={25} IconColor="#0B4E98" /> */}
                                                        </View>
                                                        <Text style={{...styles.textDesc,...isStringHeader?{textAlign:'center',fontSize:RFPercentage(2),fontFamily:'Lato_700Bold'}:{}}} key={index}>
                                                            {newString}
                                                        </Text>
                                                    </View> : ""
                                                })
                                            }
                                            {/* <View style={{ marginTop: scale(20), alignSelf: 'center' }}>
                                                <Icon LibraryName="Feather" IconName="smile" IconSize={45} IconColor="#f10078" />
                                            </View> */}
                                        </View>
                                        : ""
                                }
                        </ScrollView>
                    </View>
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
    mainData: {
        marginTop: scale(0),
    },
    imageView: {
        width: moderateScale(355),
        height: verticalScale(200),
        // backgroundColor:'red'
    },
    textDesc: {
        fontSize:RFPercentage(2.3),
        fontFamily:'Lato_400Regular',
        width:widthPercentageToDP('80%')
    },
    imageView2: {
        marginTop: scale(10),
        width: moderateScale(355),
        height: heightPercentageToDP('100%'),
    },
    textView: {
        alignSelf:'center',
        width: widthPercentageToDP('90%'),
        backgroundColor:'white',
        marginTop: scale(25),
        paddingHorizontal: scale(10),
        borderRadius: scale(15),
        paddingVertical: scale(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    paragraphBox: {
        flexDirection: 'row',
    },
    thumbnail: {
        width: moderateScale(355),
        height: verticalScale(200),
        resizeMode: 'stretch',
    },
})