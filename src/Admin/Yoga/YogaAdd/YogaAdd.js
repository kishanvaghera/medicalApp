import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './YogaAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';

const YogaAdd = ({navigation, route}) => {
  const {id,name}=route.params;

  const [YogaForm,setYogaForm]=useState({
    iYogaCatId:id?id:"",
    vYogaCategoryName:name?name:"",
  });

  const handleChange=(e,name="")=>{
    setYogaForm(prevState=>{
      return {
        ...prevState,
        [name]:e
      }
    });
  }

  const [isRequires,setisRequired]=useState({
    vYogaCategoryName:{status:false}
  });

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    setIsSubmit(true);
      if(YogaForm.vYogaCategoryName!=""){
        setisRequired({
          vYogaCategoryName:{status:true}
        });
        const postData={action:"addYogaCategory",iYogaCatId:YogaForm.iYogaCatId,vYogaCategoryName:YogaForm.vYogaCategoryName};
        APIService.apiAction(postData, apiUrls.yoga).then(res => {
          setIsSubmit(false);
          if (res.status == 200) {
              ToastMessage(1,res.message);
              navigation.navigate(RoutName.ADMIN_YOGA_LIST);
          }else{
            ToastMessage(0,res.message);
          }
        })
      }else{
        setisRequired({
          vYogaCategoryName:{status:false}
        });
      }
  }

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{id?'Edit':'Add'} Yoga</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Yoga Name<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Yoga Name'}
          onChangeText={(text) => handleChange(text, 'vYogaCategoryName')}
          value={YogaForm.vYogaCategoryName}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
        />
        {
          isSubmit && !isRequires.vYogaCategoryName?<Text style={{color:"red"}}>Yoga name field is required!</Text>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default YogaAdd