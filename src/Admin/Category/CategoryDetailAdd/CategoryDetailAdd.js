import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './CategoryDetailAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';

const CategoryDetailAdd = ({navigation, route}) => {
  const {data}=route.params;
  const [CategoryForm,setCategoryForm]=useState({
    iDetailId:data?data.id:"",
    iCategoryId:data?data.iCategoryId:"",
    tImage:"",
    tText:"",
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
    iCategoryId:{status:false},
    tImage:{status:false},
    tText:{status:false}
  });


  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{id?'Edit':'Add'} Category Detail</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Category Name<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Category Name'}
          onChangeText={(text) => handleChange(text, 'iCategoryId')}
          value={CategoryForm.iCategoryId}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
        />
        {
          isSubmit && !isRequires.iCategoryId?<Text style={{color:"red"}}>Category name field is required!</Text>:""
        }

      <Text style={{marginTop:wp(5),fontSize:18}}>Image<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Image'}
          onChangeText={(text) => handleChange(text, 'Image')}
          value={CategoryForm.Image}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
        />
        {
          isSubmit && !isRequires.Image?<Text style={{color:"red"}}>Image field is required!</Text>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CategoryDetailAdd