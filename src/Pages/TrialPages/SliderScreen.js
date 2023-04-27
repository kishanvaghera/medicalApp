import { View,StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { moderateScale, scale, verticalScale } from '../../utils/scalling';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useEffect, useState } from 'react';
import images from '../../../assets';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const SliderScreen = ({navigation}) => {
    const [TodayCategoryList,setTodayCategoryList]=useState([]);

    const ApiCall=()=>{
        const postData={action:"getHomeTrialSlider"}
        APIService.apiAction(postData, apiUrls.home).then(res => {
            if (res.status == 200) {
                setTodayCategoryList([...res.data]);
            } else {
                setTodayCategoryList([]);
            }
        })
    }

    useEffect(() => {
        ApiCall();
      return () => {}
    }, [])

    useFocusEffect(
        useCallback(()=>{
          ApiCall();
        },[navigation])
    )

    const clickToRedirect=(tLink)=>{
        if(tLink!=""){
            Linking.openURL(tLink);
        }
    }
    
    return (
        <View style={{marginTop:scale(10)}}>
            <SwiperFlatList
                autoplay
                autoplayDelay={5}
                autoplayLoop
                index={0}
                data={TodayCategoryList ? TodayCategoryList : []}
                renderItem={(curEle, ind) => (
                    <View key={ind}>
                        {
                            curEle.item.tLink==""?
                            <View style={styles.imageRows}>
                                <Image source={{uri:curEle.item.tImags}} style={{ ...styles.boxImage}} resizeMode={'cover'} />
                            </View>:
                            <TouchableOpacity style={styles.imageRows} onPress={()=>clickToRedirect(curEle.item.tLink)}>
                                <Image source={{uri:curEle.item.tImags}} style={{ ...styles.boxImage}} resizeMode={'cover'} />
                            </TouchableOpacity>
                        }
                    </View>
                )}
            />
        </View>
    )
}

export default SliderScreen

const styles = StyleSheet.create({
    boxImage: {
        borderRadius: moderateScale(20),
        width: widthPercentageToDP('90%'),
        height: verticalScale(170),
        position: 'absolute'
    },
    categoryImageText: {
        color: "black",
        fontSize: RFPercentage(3),
        fontFamily: 'Lato_400Regular',
        alignSelf: 'center',
        width: moderateScale(200),
        textAlign: 'center',
    },
    imageRows: {
        width: moderateScale(320),
        height: verticalScale(170),
        marginHorizontal: scale(16),
        shadowColor: "#1A0000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});