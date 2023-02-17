import { View, Text, ScrollView, TouchableOpacity,Image, TouchableWithoutFeedback  } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './CategoryDetailsListStyle'
import Icon from '../../../utils/Icon'
import {Colors as theme}  from '../../adminTheme';
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Loader } from '../../../Components';
import RoutName from '../../../Routes/RoutName'
import { useFocusEffect } from '@react-navigation/native';
import { ToastMessage } from '../../../utils/ToastMessage';

const CategoryDetailsList = ({navigation, route}) => {
  const [loading,setLoading]=useState(false);
  const [CategoryListData,setCategoryListData]=useState([]);
  const {id}=route.params;
  const ApiCall=()=>{
    setLoading(true);
    const postData={action:"categoryViseData",iCategoryId:id};
    APIService.apiAction(postData, apiUrls.category).then(res => {
      setLoading(false);
      if (res.status == 200) {
        let newDataArr=[];
        Object.keys(res.data).map((key,ind)=>{
          res.data[key].map((curEle,index)=>{
            newDataArr.push(curEle);
          })
        })
        setCategoryListData([...newDataArr]);
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
        <Text style={styles.mainTitle}>Category Detail List</Text>
        <TouchableOpacity onPress={()=>navigation.navigate(RoutName.ADMIN_CATEGORY_DET_ADD,{data:{id:"",name:"",iCategoryId:id}})} style={styles.TopHeadBtn}>
          <Icon LibraryName='FontAwesome' IconName='plus-circle' IconSize={25} IconColor={theme.primaryDark}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:50,paddingLeft:1,paddingRight:5}}>
        {
          CategoryListData.map((curEle,index)=>{
            return <BoxRows data={curEle} navigation={navigation} key={index} ApiCall={ApiCall}/>
          })
        }
      </ScrollView>
    </View>
  )
}

export default CategoryDetailsList

const BoxRows=(props)=>{
  const deleteRecord=(id)=>{
    const postData={action:"deleteCommon",tableName:"category_detail",id:id,whrIdName:'iDetailId'}
    APIService.apiAction(postData, apiUrls.general).then(res => {
      if (res.status == 200) {
        ToastMessage(1,res.message);
        props.ApiCall();
      }
    })
  }
  
    const string=props.data.tText;
    return <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate(RoutName.ADMIN_CATEGORY_DET_ADD,{data:props.data})}}>
              <View style={styles.boxRows}>
                  <View style={styles.boxCard}>
                      <View style={styles.boxInner}>
                        <Image source = {{uri:props.data.tImage}}
                        style = {{...styles.boxImage}}
                        />
                        <View style={styles.boxHead}>
                          <Text style={styles.boxHeadTitle}>{props.data.vSubjectName}</Text>
                          <Text style={styles.boxHeadTitle}>{props.data.iCategoryName} - {props.data.vSubCategoryName}</Text>
                        </View>
                      </View>
                      <View style={styles.boxEditButton}>
                        <TouchableOpacity  onPress={()=>{props.navigation.navigate(RoutName.ADMIN_CATEGORY_DET_ADD,{data:props.data})}}>
                            <Icon LibraryName='FontAwesome' IconName='pencil-square-o' IconSize={25} IconColor={theme.primaryDark}/>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.boxDelButton}>
                        <TouchableOpacity onPress={()=>{deleteRecord(props.data.iDetailId)}}>
                            <Icon LibraryName='FontAwesome' IconName='trash' IconSize={25} IconColor={theme.primaryDark}/>
                        </TouchableOpacity>
                      </View>
                  </View>
              </View>
            </TouchableWithoutFeedback>
  }