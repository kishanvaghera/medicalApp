import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './ActivityAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';

const ActivityAdd = ({navigation, route}) => {
  const {id,name}=route.params;

  const [ActivityForm,setActivityForm]=useState({
    iActivityCatId:id?id:"",
    vActivitCatName:name?name:"",
  });

  const handleChange=(e,name="")=>{
    setActivityForm(prevState=>{
      return {
        ...prevState,
        [name]:e
      }
    });
  }

  const [isRequires,setisRequired]=useState({
    vActivitCatName:{status:false}
  });

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    setIsSubmit(true);
      if(ActivityForm.vActivitCatName!=""){
        setisRequired({
          vActivitCatName:{status:true}
        });
        const postData={action:"addActivityCategory",iActivityCatId:ActivityForm.iActivityCatId,vActivitCatName:ActivityForm.vActivitCatName};
        APIService.apiAction(postData, apiUrls.activity).then(res => {
          setIsSubmit(false);
          if (res.status == 200) {
              ToastMessage(1,res.message);
              navigation.navigate(RoutName.ADMIN_ACTIVITY_LIST);
          }else{
            ToastMessage(0,res.message);
          }
        })
      }else{
        setisRequired({
          vActivitCatName:{status:false}
        });
      }
  }

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{id?'Edit':'Add'} Activity</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Activity Name<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Activity Name'}
          onChangeText={(text) => handleChange(text, 'vActivitCatName')}
          value={ActivityForm.vActivitCatName}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
        />
        {
          isSubmit && !isRequires.vActivitCatName?<Text style={{color:"red"}}>Activity name field is required!</Text>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ActivityAdd