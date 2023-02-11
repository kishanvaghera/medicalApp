import { View, Text, ScrollView, TouchableOpacity,Image  } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './MusicDetailListStyle'
import Icon from '../../../utils/Icon'
import {Colors as theme}  from '../../adminTheme';
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Loader } from '../../../Components';
import RoutName from '../../../Routes/RoutName'
import { useFocusEffect } from '@react-navigation/native';
import { ToastMessage } from '../../../utils/ToastMessage';

const MusicDetailList = ({navigation}) => {
  const [loading,setLoading]=useState(false);
  const [MusicListData,setMusicListData]=useState([]);

  const ApiCall=()=>{
    setLoading(true);
    const postData={action:"MusicData"};
    APIService.apiAction(postData, apiUrls.music).then(res => {
      setLoading(false);
      if (res.status == 200) {
        let newDataArr=[];
        Object.keys(res.data).map((key,ind)=>{
          res.data[key].map((curEle,index)=>{
            newDataArr.push(curEle);
          })
        })
        setMusicListData([...newDataArr]);
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
        <Text style={styles.mainTitle}>Music Detail List</Text>
        <TouchableOpacity style={styles.TopHeadBtn} onPress={()=>navigation.navigate(RoutName.ADMIN_MUSIC_DET_ADD,{data:{}})}>
          <Icon LibraryName='FontAwesome' IconName='plus-circle' IconSize={25} IconColor={theme.primaryDark}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:50,paddingLeft:1,paddingRight:5}}>
        {
          MusicListData.map((curEle,index)=>{
            return <BoxRows data={curEle} navigation={navigation} key={index} ApiCall={ApiCall}/>
          })
        }
      </ScrollView>
    </View>
  )
}

export default MusicDetailList

const BoxRows=(props)=>{
    const deleteRecord=(id)=>{
      const postData={action:"deleteCommon",tableName:"music",id:id,whrIdName:'iMusicId'}
      APIService.apiAction(postData, apiUrls.general).then(res => {
        if (res.status == 200) {
          ToastMessage(1,res.message);
          props.ApiCall();
        }
      })
    }

    const string=props.data.tMusicDesc;
    return <View style={styles.boxRows}>
              <View style={styles.boxCard}>
                  <View style={styles.boxInner}>
                    <Image source = {{uri:props.data.tMusicImage}}
                    style = {{...styles.boxImage}}
                    />
                    <View style={styles.boxHead}>
                      <Text style={styles.boxHeadTitle}>{props.data.vMusicName}</Text>
                      <Text style={styles.tMusicDesc}>{string.substring(0,70)}......</Text>
                    </View>
                  </View>
                  <View style={styles.boxEditButton}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate(RoutName.ADMIN_MUSIC_DET_ADD,{data:props.data})}}>
                        <Icon LibraryName='FontAwesome' IconName='pencil-square-o' IconSize={25} IconColor={theme.primaryDark}/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.boxDelButton}>
                    <TouchableOpacity onPress={()=>{deleteRecord(props.data.iMusicId)}}>
                        <Icon LibraryName='FontAwesome' IconName='trash' IconSize={25} IconColor={theme.primaryDark}/>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
  }