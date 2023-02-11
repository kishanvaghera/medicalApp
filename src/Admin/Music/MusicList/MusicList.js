import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './MusicListStyle'
import Icon from '../../../utils/Icon'
import {Colors as theme}  from '../../adminTheme';
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Loader } from '../../../Components';
import RoutName from '../../../Routes/RoutName'
import { useFocusEffect } from '@react-navigation/native';
import { ToastMessage } from '../../../utils/ToastMessage';

const MusicList = ({navigation}) => {
  const [loading,setLoading]=useState(false);
  const [MusicListData,setMusicListData]=useState([]);

  const ApiCall=()=>{
    setLoading(true);
    const postData={action:"getMusicCategory"};
    APIService.apiAction(postData, apiUrls.music).then(res => {
      setLoading(false);
      if (res.status == 200) {
        setMusicListData([...res.data]);
      }else{
        setMusicListData([]);
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
        <Text style={styles.mainTitle}>Music List</Text>
        <TouchableOpacity onPress={()=>navigation.navigate(RoutName.ADMIN_MUSIC_ADD,{id:"",name:"",aSubCategoryList:[]})} style={styles.TopHeadBtn}>
          <Icon LibraryName='FontAwesome' IconName='plus-circle' IconSize={25} IconColor={theme.primaryDark}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:50}}>
        {
          MusicListData.map((curEle,index)=>{
            return <BoxRows key={index} data={curEle} number={index+1} navigation={navigation} ApiCall={ApiCall}/>
          })
        }
      </ScrollView>
    </View>
  )
}

export default MusicList

const BoxRows=(props)=>{
  const deleteRecord=(id)=>{
    const postData={action:"deleteCommon",tableName:"music_category",id:id,whrIdName:'iMusicCategoryId'}
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
                    <TouchableOpacity onPress={()=>{props.navigation.navigate(RoutName.ADMIN_MUSIC_ADD,{id:props.data.iMusicCategoryId,name:props.data.vMusicCategoryName,aSubCategoryList:props.data.aSubCategoryList})}}>
                      <Icon LibraryName='FontAwesome' IconName='pencil-square-o' IconSize={25} IconColor={theme.primaryDark}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>deleteRecord(props.data.iMusicCategoryId)}>
                      <Icon LibraryName='FontAwesome' IconName='trash' IconSize={25} IconColor={theme.primaryDark}/>
                    </TouchableOpacity>
                  </View>
                </Text>
                <View style={styles.boxInner}>
                  <View style={styles.boxHead}>
                    <Text style={styles.boxHeadTitle}>{props.number}. {props.data.vMusicCategoryName}</Text>
                  </View>
                </View>
            </View>
          </View>
}
