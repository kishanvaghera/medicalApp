import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './YogaListStyle'
import Icon from '../../../utils/Icon'
import {Colors as theme}  from '../../adminTheme';
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Loader } from '../../../Components';
import RoutName from '../../../Routes/RoutName'
import { useFocusEffect } from '@react-navigation/native';
import { ToastMessage } from '../../../utils/ToastMessage';

const YogaList = ({navigation}) => {
  const [loading,setLoading]=useState(false);
  const [YogaCategoryListData,setYogaCategoryListData]=useState([]);

  const ApiCall=()=>{
    setLoading(true);
    const postData={action:"getYogaCategory"};
    APIService.apiAction(postData, apiUrls.yoga).then(res => {
      setLoading(false);
      if (res.status == 200) {
        setYogaCategoryListData([...res.data]);
      }else{
        setYogaCategoryListData([]);
      }
    })
  }

  useEffect(()=>{
    ApiCall();
  },[])

  useFocusEffect(
    useCallback(()=>{
      ApiCall();
    },[navigation])
  )


  return (
    <View style={styles.mainScreen}>
      <Loader loading={loading} />
      <View style={styles.tophead}>
        <Text style={styles.mainTitle}>Yoga List</Text>
        <TouchableOpacity onPress={()=>navigation.navigate(RoutName.ADMIN_YOGA_ADD,{id:"",name:""})} style={styles.TopHeadBtn}>
          <Icon LibraryName='FontAwesome' IconName='plus-circle' IconSize={25} IconColor={theme.primaryDark}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:50}}>
        {
          YogaCategoryListData.map((curEle,index)=>{
            return <BoxRows key={index} data={curEle} number={index+1} navigation={navigation} ApiCall={ApiCall}/>
          })
        }
      </ScrollView>
    </View>
  )
}

export default YogaList


const BoxRows=(props)=>{
  const deleteRecord=(id)=>{
    const postData={action:"deleteCommon",tableName:"yoga_category",id:id,whrIdName:'iYogaCatId'}
    APIService.apiAction(postData, apiUrls.general).then(res => {
      if (res.status == 200) {
        ToastMessage(1,res.message);
        props.ApiCall();
      }
    })
  }
  
  return <View style={styles.boxRows}>
            <View style={styles.boxCard}>
                <Text style={styles.boxEditButton}>
                  <View style={styles.boxButtonRow}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate(RoutName.ADMIN_YOGA_ADD,{id:props.data.iYogaCatId,name:props.data.vYogaCategoryName})}}>
                      <Icon LibraryName='FontAwesome' IconName='pencil-square-o' IconSize={25} IconColor={theme.primaryDark}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>deleteRecord(props.data.iYogaCatId)}>
                      <Icon LibraryName='FontAwesome' IconName='trash' IconSize={25} IconColor={theme.primaryDark}/>
                    </TouchableOpacity>
                  </View>
                </Text>
                <View style={styles.boxInner}>
                  <View style={styles.boxHead}>
                    <Text style={styles.boxHeadTitle}>{props.number}. {props.data.vYogaCategoryName}</Text>
                  </View>
                </View>
            </View>
          </View>
}