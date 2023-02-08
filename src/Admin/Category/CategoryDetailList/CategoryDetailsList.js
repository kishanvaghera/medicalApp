import { View, Text, ScrollView, TouchableOpacity,Image  } from 'react-native'
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

const CategoryDetailsList = ({navigation}) => {
  const [loading,setLoading]=useState(false);
  const [CategoryListData,setCategoryListData]=useState([]);

  const ApiCall=()=>{
    setLoading(true);
    const postData={action:"categoryViseData"};
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
        <TouchableOpacity onPress={()=>navigation.navigate(RoutName.ADMIN_CATEGORY_DET_ADD,{data:{id:"",name:""}})} style={styles.TopHeadBtn}>
          <Icon LibraryName='FontAwesome' IconName='plus-circle' IconSize={25} IconColor={theme.primaryDark}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:50,paddingLeft:1,paddingRight:5}}>
        {
          CategoryListData.map((curEle,index)=>{
            return <BoxRows data={curEle} navigation={navigation} key={index} />
          })
        }
      </ScrollView>
    </View>
  )
}

export default CategoryDetailsList

const BoxRows=(props)=>{
    const string=props.data.tText;
    return <View style={styles.boxRows}>
              <View style={styles.boxCard}>
                  <View style={styles.boxInner}>
                    <Image source = {{uri:props.data.tImage}}
                    style = {{...styles.boxImage}}
                    />
                    <View style={styles.boxHead}>
                      <Text style={styles.boxHeadTitle}>{props.data.iCategoryName}</Text>
                      <Text style={styles.boxHeadDesc}>{string.substring(0,70)}......</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.boxEditButton} onPress={()=>{props.navigation.navigate(RoutName.ADMIN_CATEGORY_DET_ADD,{data:props.data})}}>
                        <Icon LibraryName='FontAwesome' IconName='pencil-square-o' IconSize={25} IconColor={theme.primaryDark}/>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
  }