import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import { scale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import YoutubePlayerCust from '../../Components/YoutubePlayerCust';

const LiveMainData = ({navigation,route}) => {
    const [loading, setLoading] = useState(false);
    const data=route.params;

  return ( 
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={data.tWorkShopTItle} />
        </SafeAreaView>
        <Main topMargin={1}>
            <View style={styles.container}>
                <View style={{alignSelf:'center'}}>
                    <YoutubePlayerCust height={220} width={wp('100%')} url={data?.tVideo}/>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: scale(100),paddingTop:scale(10)}} >
                    <View style={styles.textView}>
                        <Text style={styles.textDesc}>
                            {data.tTextDesc}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </Main>
    </View>
  )
}

export default LiveMainData

const styles = StyleSheet.create({
    textView: {
        alignSelf:'center',
        width: wp('90%'),
        backgroundColor:'white',
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
    textDesc: {
        fontSize:RFPercentage(2),
        fontFamily:'Lato_400Regular',
        width:wp('80%')
    },
})