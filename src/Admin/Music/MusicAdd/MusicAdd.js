import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './MusicAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';

const MusicAdd = ({navigation, route}) => {
  const {id,name}=route.params;

  const [MusicForm,setMusicForm]=useState({
    iMusicCategoryId:id?id:"",
    vMusicCategoryName:name?name:"",
  });

  const handleChange=(e,name="")=>{
    setMusicForm(prevState=>{
      return {
        ...prevState,
        [name]:e
      }
    });
  }

  const [isRequires,setisRequired]=useState({
    vMusicCategoryName:{status:false}
  });

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    setIsSubmit(true);
      if(MusicForm.vMusicCategoryName!=""){
        setisRequired({
          vMusicCategoryName:{status:true}
        });
        const postData={action:"addMusicCategory",iMusicCategoryId:MusicForm.iMusicCategoryId,vMusicCategoryName:MusicForm.vMusicCategoryName};
        APIService.apiAction(postData, apiUrls.music).then(res => {
          setIsSubmit(false);
          if (res.status == 200) {
              ToastMessage(1,res.message);
              navigation.navigate(RoutName.ADMIN_MUSIC_LIST);
          }else{
            ToastMessage(0,res.message);
          }
        })
      }else{
        setisRequired({
          vMusicCategoryName:{status:false}
        });
      }
  }
  
  
  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{id?'Edit':'Add'} Music</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Music Name<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Music Name'}
          onChangeText={(text) => handleChange(text, 'vMusicCategoryName')}
          value={MusicForm.vMusicCategoryName}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
        />
        {
          isSubmit && !isRequires.vMusicCategoryName?<Text style={{color:"red"}}>Music name field is required!</Text>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MusicAdd