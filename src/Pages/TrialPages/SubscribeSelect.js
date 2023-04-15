import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native'
import { scale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../../assets';
import { RFPercentage } from 'react-native-responsive-fontsize';
import RoutName from '../../Routes/RoutName';

const SubscribeSelect = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.body}>
            <Loader loading={loading} />
            <SafeAreaView>
                <Header title={'Subscribe'} />
            </SafeAreaView>
            <Main>
                <View style={styles.mainHeadBox}>
                    <Text style={styles.mainText}>Select Plan</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate(RoutName.PlanDetail)}>
                            <Image source={images.PrePlan} style={styles.imageStyle} resizeMode='contain' />
                            <View style={styles.boxPlan}>
                                <Text style={styles.PlanText}>Planning</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.button}>
                            <Image source={images.PregnantPlan} style={styles.imageStyle} resizeMode='contain' />
                            <View style={styles.boxPlan}>
                                <Text style={styles.PlanText}>Pregnant</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Main>
        </View>
    )
}

export default SubscribeSelect

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0B4E98',
        marginTop: scale(20),
    },
    mainHeadBox: {
        width: wp('90%'),
        backgroundColor: '#0B4E98',
        alignSelf: 'center',
        marginTop: scale(20),
        paddingVertical: scale(10),
        borderRadius: scale(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    mainText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: RFPercentage(2.5),
        fontFamily: 'Lato_700Bold',
    },
    box: {
        width: wp('90%'),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: scale(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        borderRadius: scale(10)
    },
    PlanText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'Lato_700Bold',
        color: 'white',
        alignSelf: 'center',
        height:20
    },
    boxPlan: {
        backgroundColor: '#0B4E98',
        paddingVertical: scale(10),
        borderBottomLeftRadius: scale(10),
        borderBottomRightRadius: scale(10),
    },
    button: {
        elevation: 0,
        shadowColor: 'transparent',
        backgroundColor: 'white'
    },
    imageStyle: {
        width: wp('90%'),
        height: hp('30%'),
        alignSelf: 'center'
    }
})