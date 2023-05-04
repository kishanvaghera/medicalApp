import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { scale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import images from '../../../assets';
import RoutName from '../../Routes/RoutName';
import { useEffect } from 'react';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';

const FreeData = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    const [freeDataList,setDreeDataList]=useState([]);

    const ApiCall=()=>{
        setLoading(true);
        const postData={action:"getFreeData"}
        APIService.apiAction(postData, apiUrls.freeDataApi).then(res => {
            setLoading(false);
            if(res.status==200){
                setDreeDataList(res.data);
            }else{
                setDreeDataList([]);
            }
        })
    }

    useEffect(()=>{
        ApiCall();
    },[])


  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header title={'Basic'} />
        </SafeAreaView>
        <Main>
            <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:scale(80),paddingTop:scale(10)}} >
                    <View style={styles.mainBox}>
                        {
                            freeDataList.map((curEle,index)=>{
                                return <TouchableOpacity key={index} style={styles.Rows} onPress={()=>navigation.navigate(RoutName.FreeDataDetail,{data:curEle})}>
                                            <Image source={{uri:curEle.tMainImage}} style={{height:50,width:50}}/>
                                            <Text style={styles.TextData}>{curEle.vTitle}</Text>
                                        </TouchableOpacity>
                            })
                        }
                    </View>
            </ScrollView>
        </Main>
    </View>
  )
}

export default FreeData

const styles = StyleSheet.create({
    mainBox:{
        marginTop:scale(10)
    },
    Rows:{
        width:wp('90%'),
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius:scale(10),
        paddingVertical:scale(10),
        paddingHorizontal:scale(10),
        marginBottom:scale(10),
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    TextData:{
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_400Regular',
        width:wp('70%'),
        marginLeft:scale(10)
    }
})