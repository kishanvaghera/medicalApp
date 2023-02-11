import { View, Text, TouchableOpacity,Modal,StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './MusicDetailAddStyle'
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

const MusicDetailAdd = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {data}=route.params;
  const [MusicForm,setMusicForm]=useState({
    iDetailId:data?data.iMusicId:"",
    iMusicCategoryId:data?{label:data.vMusicCategoryName,value:data.iMusicCategoryId}:{label:"",value:""},
    tMusicImage:data?data.tMusicImage:null,
    tMusicDesc:data?data.tMusicDesc:"",
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
    iMusicCategoryId:{status:false},
    tMusicImage:{status:false},
    tMusicDesc:{status:false}
  });

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    // setIsSubmit(true);
    let file="";
    if(MusicForm.tMusicImage!=""){
      if(MusicForm.tMusicImage.base64){
        file='data:'+MusicForm.tMusicImage.type+'/'+fileExt(MusicForm.tMusicImage.FileName)+';base64,'+MusicForm.tMusicImage.base64;
      }else{
        file=MusicForm.tMusicImage;
      }
    }

    const postData={action:'addmusicDetail',iDetailId:MusicForm.iDetailId,iMusicCategoryId:MusicForm.iMusicCategoryId.value,tMusicImage:file,tMusicDesc:MusicForm.tMusicDesc};
    APIService.apiAction(postData, apiUrls.music).then(res => {
      setIsSubmit(false);
      if (res.status == 200) {
          ToastMessage(1,res.message);
          navigation.navigate(RoutName.ADMIN_MUSIC_DET_LIST);
      }else{
        ToastMessage(0,res.message);
      }
    })
  }

  const [CategoryListData,setCategoryListData]=useState([]);

  const handleCheck=(data,name)=>{
    setMusicForm(prevState=>{
      return{
        ...prevState,
        [name]:data
      }
    })
    setModalVisible(false);
  }

  useEffect(()=>{
    const postData={action:"getMusicCategory"};
    APIService.apiAction(postData, apiUrls.music).then(res => {
      if (res.status == 200) {
        let NewDataArr=[];
        res.data.map((curEle,index)=>{
          NewDataArr.push({label:curEle.vMusicCategoryName,value:curEle.iMusicCategoryId});
        })

        setCategoryListData(NewDataArr);
      }else{
        setCategoryListData([]);
      }
    })
    return ()=>{}
  },[])

  const [imagePickSts,setMusicImagePickSts]=useState(false);

  const handlePickImage=(data)=>{
    const fileName=data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.length);
    let tempData=data;
    tempData['FileName']=fileName
    setMusicForm(prevState=>{
      return{
        ...prevState,
        tMusicImage:tempData
      }
    });
  }

  const fileExt=(uri)=>{
    return uri.split('.').pop();
  }

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{data.id?'Edit':'Add'} Music Detail</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Music Category Name<Text style={{color:"red"}}>*</Text></Text>
      <View>
        <Input
            placeholder={'Select Category'}
            value={MusicForm.iMusicCategoryId.label}
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
        isSubmit && !isRequires.iMusicCategoryId?<Text style={{color:"red"}}>Music name field is required!</Text>:""
      }

      <Text style={{marginTop:wp(5),fontSize:18}}>Music Detail Description<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Music Description'}
          onChangeText={(text) => handleChange(text, 'tMusicDesc')}
          value={MusicForm.tMusicDesc}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
      />
      {
        isSubmit && !isRequires.tMusicDesc?<Text style={{color:"red"}}>Music Description field is required!</Text>:""
      }

      <Text style={{marginTop:wp(5),fontSize:18}}>Image<Text style={{color:"red"}}>*</Text></Text>

        <TouchableOpacity onPress={()=>{setMusicImagePickSts(!imagePickSts)}} style={styles.chooseFile}>
          <View style={{width:wp(15),paddingLeft:wp(4),paddingTop:wp(2)}}>
            <Icon IconName='upload' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'white'}/>
          </View>
          <View style={{width:wp(40)}}>
            <Text style={{alignSelf:'center',marginTop:wp(3),color:'white',fontSize:20}}>Choose Image</Text>
          </View>
        </TouchableOpacity>

      {
        MusicForm.tMusicImage!=null && MusicForm.tMusicImage!=""?
        <>
          {
            MusicForm.tMusicImage.base64?
            <Image
              style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
              source={{
                uri: 'data:'+MusicForm.tMusicImage.type+'/'+fileExt(MusicForm.tMusicImage.FileName)+';base64,'+MusicForm.tMusicImage.base64,
              }}
            />
            :<Image
            style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
            source={{
              uri: MusicForm.tMusicImage,
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

        <DropDownCommon  modalVisible={modalVisible} setModalVisible={setModalVisible} data={CategoryListData} selectedVal={MusicForm.iMusicCategoryId.value} handleCheck={handleCheck} fieldName='iMusicCategoryId'/>

        <ImagePickerCommon  show={imagePickSts} close={setMusicImagePickSts} handlePickImage={handlePickImage} setMusicImage={setMusicForm} fieldName='tMusicImage'/>

    </View>
  )
}

export default MusicDetailAdd

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
