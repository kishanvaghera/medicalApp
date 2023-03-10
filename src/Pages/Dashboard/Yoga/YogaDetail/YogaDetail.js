import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Image
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Header } from '../../../../Layouts';

const YogaDetail = ({ route, navigation }) => {

    const { yogaData } = route.params;

    const [pageDatail, setPageDetail] = useState({
        yogaName: yogaData.vYogaCategoryName,
        yogaId: yogaData.iYogaId,
        imagePath: yogaData.tYogaFile,
        yogaDec: yogaData.tYogaDesc
    })

    const [pageTitle, setPageTitle] = useState('');
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});


    useEffect(() => {
        setPageTitle(route.params.pageTitle);
        return () => { }
    }, [pageTitle])

    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {

            //Device is in portrait mode, rotate to landscape mode.
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        }
        else {

            //Device is in landscape mode, rotate to portrait mode.
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

        }
    }

    return (
        <View style={styles.body}>
            <Header iconName={'left'} title={pageDatail.yogaName} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginTop: 5
                }} >
                <KeyboardAvoidingView enabled>
                    <SafeAreaView style={styles.container}>
                        {
                            pageDatail.imagePath != '' ?
                                <Image
                                    source={{ uri: pageDatail.imagePath }}
                                    style={styles.videoView} 
                                    resizeMode={'contain'}/>
                                : <Video
                                    ref={video}
                                    style={styles.videoView}
                                    source={{
                                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                                    }}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping
                                    onPlaybackStatusUpdate={status => setStatus(() => 'Play')}
                                    onFullscreenUpdate={setOrientation}
                                />
                        }

                        <Text style={styles.titleText}>Description</Text>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.textStyle}>{pageDatail.yogaDec}</Text>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
export default YogaDetail;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        width: wp(100),
        paddingHorizontal: wp(2.5)
    },
    videoView: {
        width: wp(95),
        height: hp(35)
    },
    titleText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 15,
        borderBottomWidth: 1.5,
        borderBottomColor: 'red'
    },
    textStyle: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'left',
        lineHeight: 18
    }
});