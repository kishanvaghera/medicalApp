import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import images from '../../../assets';
import { Loader } from '../../Components';
import { Header } from '../../Layouts';
import RoutName from '../../Routes/RoutName';

const MainActivityList = ({navigation, route}) => {
    const [loading, setLoading] = useState(false);

    const {data}=route.params;

    const [ActivityPostList,setActivityPostList]=useState([]);
    useEffect(()=>{
        setLoading(true);
        const postData={action:"ActivityData",iActivityCatId:data.iActivityCatId,iSubActivityId:data?.iSubActivityId?data.iSubActivityId:0};
        APIService.apiAction(postData, apiUrls.activity).then(res => {
            setLoading(false);
            if(res.status==200){
                setActivityPostList([...res.data[data.iActivityCatId]]);
            }else{
                setActivityPostList([]);
            }
        })
        return ()=>{}
    },[])   

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={data.vSubActivityName} />
        </SafeAreaView>
        <View style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
            
            <View style={styles.body2}>
                {
                    ActivityPostList.map((curEle,index)=>{
                        return <TouchableOpacity activeOpacity={.9} onPress={()=>{navigation.navigate(RoutName.ACTIVITY_DETAIL,{data:curEle})}} style={styles.row} key={index}>
                                    <View style={styles.column}>
                                        <View style={{flexDirection:'row'}}>
                                            <Image source={{uri:curEle.tActivityFile}}  style={{...styles.boxImage}} resizeMode={'contain'}/>
                                            <Text style={styles.textBox}>{curEle.vActivitCatName} {curEle.vSubActivityName && curEle.vSubActivityName!=""?"-"+curEle.vSubActivityName:""}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                    })
                }
            </View>

            </ScrollView>
        </View>
    </View>
  )
}

export default MainActivityList

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
    },
    body2: {
        marginHorizontal:scale(16),
        marginVertical:scale(4),
    },
    row:{
        width:moderateScale(320),
        flexDirection:'column',
        flexWrap:'wrap',
    },
    column:{
        width:moderateScale(320),
        height:'auto',
        backgroundColor:'white',
        borderRadius:moderateScale(15),
        paddingBottom:scale(10),
        paddingTop:scale(10),
        marginBottom:scale(20),
        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    boxImage:{
        width:moderateScale(50),
        height:verticalScale(50),
        // marginTop:scale(5),
        marginLeft:scale(10),
        borderRadius:moderateScale(100)
    },
    textBox:{
        fontSize:moderateScale(20),
        fontWeight:'800',
        width:moderateScale(210),
        marginLeft:scale(15),
        // marginTop:scale(13)
    }
});