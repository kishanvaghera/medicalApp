import React, { useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView,Dimensions} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ActivityDetail = ({navigation, route}) => {
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

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={data?.vSubActivityName} />
        </SafeAreaView>
        <Main>
            <View style={styles.container}>
                <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(100)}} >
                    <View style={styles.mainData}>
                        {
                            data?.tActivityFile?
                            <Image source={{ uri: data.tActivityFile }} style={styles.imageView} resizeMode={'contain'}/>
                            :""
                        }

                        {
                            data?.tActivityFile=="" && data?.tVideoLink!=""?
                                <Video
                                ref={video}
                                style={styles.imageView}
                                source={{
                                    uri: data.tVideoLink,
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
                                {data?.tActivityDesc}
                            </Text>
                        </View>

                        {
                            data?.tActivityFile!="" && data?.tVideoLink!=""?
                            <View style={{marginTop:scale(20)}}>
                                <Video
                                ref={video}
                                style={styles.imageView}
                                source={{
                                    uri: data.tVideoLink,
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
        fontSize:RFPercentage(3),
        fontFamily:'Lato_400Regular',
        lineHeight:moderateScale(30),
        textAlign:'justify',
    },
    textView:{
        width:moderateScale(320),
        marginLeft:scale(20)
    }
})