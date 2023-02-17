import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './CategoryListStyle'
import Icon from '../../../utils/Icon'
import {Colors as theme}  from '../../adminTheme';
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Loader } from '../../../Components';
import RoutName from '../../../Routes/RoutName'
import { useFocusEffect } from '@react-navigation/native';
import { ToastMessage } from '../../../utils/ToastMessage';

const CategoryList = ({navigation}) => {
  const [loading,setLoading]=useState(false);
  const [CategoryListData,setCategoryListData]=useState([]);

  const ApiCall=()=>{
    setLoading(true);
    const postData={action:"getCategoryList"};
    APIService.apiAction(postData, apiUrls.category).then(res => {
      setLoading(false);
      if (res.status == 200) {
        setCategoryListData([...res.data]);
      }else{
        setCategoryListData([]);
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
        <Text style={styles.mainTitle}>Category List</Text>
        <TouchableOpacity onPress={()=>navigation.navigate(RoutName.ADMIN_CATEGORY_ADD,{id:"",name:"",aSubCategoryList:[]})} style={styles.TopHeadBtn}>
          <Icon LibraryName='FontAwesome' IconName='plus-circle' IconSize={25} IconColor={theme.primaryDark}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:50}}>
        {
          CategoryListData.map((curEle,index)=>{
            return <BoxRows key={index} data={curEle} number={index+1} navigation={navigation} ApiCall={ApiCall}/>
          })
        }
      </ScrollView>
    </View>
  )
}

export default CategoryList

const BoxRows=(props)=>{
  const deleteRecord=(id)=>{
    const postData={action:"deleteCommon",tableName:"category",id:id,whrIdName:'iCategoryId'}
    APIService.apiAction(postData, apiUrls.general).then(res => {
      if (res.status == 200) {
        ToastMessage(1,res.message);
        props.ApiCall();
      }
    })
  }
  

  const onPress=()=>{
    props.navigation.navigate(RoutName.ADMIN_CATEGORY_DET_LIST,{id:props.data.iCategoryId});
  }
  return  <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.boxRows}>
              <View style={styles.boxCard}>
                  <Text style={styles.boxEditButton}>
                    <View style={styles.boxButtonRow}>
                      <TouchableOpacity onPress={()=>{props.navigation.navigate(RoutName.ADMIN_CATEGORY_ADD,{id:props.data.iCategoryId,name:props.data.iCategoryName,aSubCategoryList:props.data.aSubCategoryList})}}>
                        <Icon LibraryName='FontAwesome' IconName='pencil-square-o' IconSize={25} IconColor={theme.primaryDark}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>deleteRecord(props.data.iCategoryId)}>
                        <Icon LibraryName='FontAwesome' IconName='trash' IconSize={25} IconColor={theme.primaryDark}/>
                      </TouchableOpacity>
                    </View>
                  </Text>
                  <View style={styles.boxInner}>
                    <View style={styles.boxHead}>
                      <Text style={styles.boxHeadTitle}>{props.number}. {props.data.iCategoryName}</Text>
                    </View>
                  </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
}

