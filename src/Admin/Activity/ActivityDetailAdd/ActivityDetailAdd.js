import { View, Text, TouchableOpacity,Modal,StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './ActivityDetailAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';
import { Picker } from '@react-native-picker/picker';
import Icon from '../../../utils/Icon';
import DropDownCommon from '../../../utils/DropDownCommon';
import * as ImagePicker from 'expo-image-picker';

const ActivityDetailAdd = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {data}=route.params;
  const [ActivityForm,setActivityForm]=useState({
    iDetailId:data?data.iActivityId:"",
    iActivityCatId:data?{label:data.vActivitCatName,value:data.iActivityCatId}:{label:"",value:""},
    tActivityFile:data?data.tActivityFile:null,
    tActivityDesc:data?data.tActivityDesc:"",
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
    iActivityCatId:{status:false},
    tActivityFile:{status:false},
    tActivityDesc:{status:false}
  });

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    // setIsSubmit(true);
    let file="";
    if(ActivityForm.tActivityFile!=""){
      if(ActivityForm.tActivityFile.base64){
        file='data:'+ActivityForm.tActivityFile.type+'/'+fileExt(ActivityForm.tActivityFile.FileName)+';base64,'+ActivityForm.tActivityFile.base64;
      }else{
        file=ActivityForm.tActivityFile;
      }
    }

    const postData={action:'addActivityDetail',iDetailId:ActivityForm.iDetailId,iActivityCatId:ActivityForm.iActivityCatId.value,tActivityFile:file,tActivityDesc:ActivityForm.tActivityDesc};
    APIService.apiAction(postData, apiUrls.activity).then(res => {
      setIsSubmit(false);
      if (res.status == 200) {
          ToastMessage(1,res.message);
          navigation.navigate(RoutName.ADMIN_ACTIVITY_DET_LIST);
      }else{
        ToastMessage(0,res.message);
      }
    })
  }

  const [CategoryListData,setCategoryListData]=useState([]);

  const handleCheck=(data,name)=>{
    setActivityForm(prevState=>{
      return{
        ...prevState,
        [name]:data
      }
    })
    setModalVisible(false);
  }

  useEffect(()=>{
    const postData={action:"getActivityCategory"};
    APIService.apiAction(postData, apiUrls.activity).then(res => {
      if (res.status == 200) {
        let NewDataArr=[];
        res.data.map((curEle,index)=>{
          NewDataArr.push({label:curEle.vActivitCatName,value:curEle.iActivityCatId});
        })

        setCategoryListData(NewDataArr);
      }else{
        setCategoryListData([]);
      }
    })
    return ()=>{}
  },[])

  const [imagePickSts,setActivityFilePickSts]=useState(false);

  const handlePickImage=(data)=>{
    const fileName=data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.length);
    let tempData=data;
    tempData['FileName']=fileName
    setActivityForm(prevState=>{
      return{
        ...prevState,
        tActivityFile:tempData
      }
    });
  }

  const fileExt=(uri)=>{
    return uri.split('.').pop();
  }

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{data.id?'Edit':'Add'} Activity Detail</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Activity Category Name<Text style={{color:"red"}}>*</Text></Text>
      <View>
        <Input
            placeholder={'Select Category'}
            value={ActivityForm.iActivityCatId.label}
            keyboardType={'text'}
            multiline={false}
            returnKeyType={'next'}
            inputContainerStyle={{
              width:wp(90),
              marginTop:wp(3)
            }}
            clickHandle={()=>{setModalVisible(!modalVisible)}}
        />
      </View>
      {
        isSubmit && !isRequires.iActivityCatId?<Text style={{color:"red"}}>Activity name field is required!</Text>:""
      }

      <Text style={{marginTop:wp(5),fontSize:18}}>Activity Detail Description<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Activity Description'}
          onChangeText={(text) => handleChange(text, 'tActivityDesc')}
          value={ActivityForm.tActivityDesc}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
      />
      {
        isSubmit && !isRequires.tActivityDesc?<Text style={{color:"red"}}>Activity Description field is required!</Text>:""
      }

      <Text style={{marginTop:wp(5),fontSize:18}}>Image<Text style={{color:"red"}}>*</Text></Text>

        <TouchableOpacity onPress={()=>{setActivityFilePickSts(!imagePickSts)}} style={styles.chooseFile}>
          <View style={{width:wp(15),paddingLeft:wp(4),paddingTop:wp(2)}}>
            <Icon IconName='upload' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'white'}/>
          </View>
          <View style={{width:wp(40)}}>
            <Text style={{alignSelf:'center',marginTop:wp(3),color:'white',fontSize:20}}>Choose Image</Text>
          </View>
        </TouchableOpacity>

      {
        ActivityForm.tActivityFile!=null && ActivityForm.tActivityFile!=""?
        <>
          {
            ActivityForm.tActivityFile.base64?
            <Image
              style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
              source={{
                uri: 'data:'+ActivityForm.tActivityFile.type+'/'+fileExt(ActivityForm.tActivityFile.FileName)+';base64,'+ActivityForm.tActivityFile.base64,
              }}
            />
            :<Image
            style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
            source={{
              uri: ActivityForm.tActivityFile,
            }}
          />
          }
        </>
        :""
      }

        {
          isSubmit && !isRequires.Image?<Text style={{color:"red"}}>Image field is required!</Text>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>

        <DropDownCommon  modalVisible={modalVisible} setModalVisible={setModalVisible} data={CategoryListData} selectedVal={ActivityForm.iActivityCatId.value} handleCheck={handleCheck} fieldName='iActivityCatId'/>

        <ImagePickerCommon  show={imagePickSts} close={setActivityFilePickSts} handlePickImage={handlePickImage} setActivityFile={setActivityForm} fieldName='tActivityFile'/>

    </View>
  )
}

export default ActivityDetailAdd

const ImagePickerCommon=(props)=>{
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [18, 18],
      quality: 0.5,
      base64:true,
      fileName:true
    });

    if (!result.canceled) {
      props.handlePickImage(result.assets[0])
      props.close(false)
    }
  };

  useEffect(()=>{
    if(props.show===true){
      pickImage();
    }
  },[props.show])

  return <></>;
}
