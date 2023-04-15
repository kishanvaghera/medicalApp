import { View,StyleSheet, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { moderateScale, scale, verticalScale } from '../../utils/scalling';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useState } from 'react';
import images from '../../../assets';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const SliderScreen = () => {
    const [TodayCategoryList,setTodayCategoryList]=useState([1,2]);
    return (
        <View style={{marginTop:scale(10)}}>
            <SwiperFlatList
                autoplay
                autoplayDelay={5}
                autoplayLoop
                index={0}
                data={TodayCategoryList ? TodayCategoryList : []}
                renderItem={(curEle, ind) => (
                    <View style={styles.imageRows}>
                        <Image source={images.pregnancyMom} style={{ ...styles.boxImage}} resizeMode={'cover'} />
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