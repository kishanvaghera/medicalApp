import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Button } from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import YoutubePlayer from "react-native-youtube-iframe";
import { useCallback } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RoutName from '../../Routes/RoutName';

const LiveSubData = ({navigation,route}) => {
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
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:scale(80),paddingTop:scale(10)}} >
                        {
                            data?.subData.map((curEle,index)=>{
                                return <TouchableOpacity onPress={()=>navigation.navigate(RoutName.LiveMainData,curEle)} style={styles.boxRow} key={index}>
                                            <View style={{paddingVertical:scale(10),paddingLeft:scale(10)}}>
                                                <Image source={{uri:curEle.tImage}} style={{ ...styles.img}} resizeMode={'cover'} />
                                            </View>
                                            <View style={{paddingVertical:scale(10),justifyContent:'center'}}>
                                                <Text style={styles.text}>{curEle.tWorkShopTItle}</Text>
                                            </View>
                                        </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </Main>
    </View>
  )
}

export default LiveSubData

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center',
    },
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width:wp('100%')
    },
    mainData: {
        marginTop: scale(0),
    },
    boxRow:{
        width:wp('95%'),
        backgroundColor:'white',
        flexDirection:'row',
        marginBottom:scale(10),
        borderRadius:scale(10)
    },
    img:{
        width:wp('35%'),
        height:hp('10%')
    },
    text:{
        marginLeft:scale(10),
        width:wp('50%'),
    }
})