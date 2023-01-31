import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './CategoryAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';

const CategoryAdd = ({navigation, route}) => {
  const {id,name}=route.params;

  const [CategoryForm,setCategoryForm]=useState({
    iCategoryId:id?id:"",
    iCategoryName:name?name:"",
  });

  const handleChange=(e,name="")=>{
    setCategoryForm(prevState=>{
      return {
        ...prevState,
        [name]:e
      }
    });
  }

  const [isRequires,setisRequired]=useState({
    iCategoryName:{status:false}
  });

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    setIsSubmit(true);
      if(CategoryForm.iCategoryName!=""){
        setisRequired({
          iCategoryName:{status:true}
        });
        const postData={action:"addCategory",iCategoryId:CategoryForm.iCategoryId,iCategoryName:CategoryForm.iCategoryName};
        APIService.apiAction(postData, apiUrls.category).then(res => {
          setIsSubmit(false);
          if (res.status == 200) {
              ToastMessage(1,res.message);
              navigation.navigate(RoutName.ADMIN_CATEGORY_LIST);
          }else{
            ToastMessage(0,res.message);
          }
        })
      }else{
        setisRequired({
          iCategoryName:{status:false}
        });
      }
  }
  
  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{id?'Edit':'Add'} Category</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Category Name<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Category Name'}
          onChangeText={(text) => handleChange(text, 'iCategoryName')}
          value={CategoryForm.iCategoryName}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
        />
        {
          isSubmit && !isRequires.iCategoryName?<Text style={{color:"red"}}>Category name field is required!</Text>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CategoryAdd