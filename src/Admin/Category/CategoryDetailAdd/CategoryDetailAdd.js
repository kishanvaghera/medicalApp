import { View, Text, TouchableOpacity,Modal,StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './CategoryDetailAddStyle'
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

const CategoryDetailAdd = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {data}=route.params;
  const [CategoryForm,setCategoryForm]=useState({
    iDetailId:data?data.id:"",
    iCategoryId:{label:"",value:""},
    tImage:null,
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

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    // setIsSubmit(true);
    const file='data:'+CategoryForm.tImage.base64+'/'+fileExt(CategoryForm.tImage.FileName)+';base64,'+CategoryForm.tImage.base64;
    const postData={action:'addCategoryDetail',iDetailId:0,iCategoryId:CategoryForm.iCategoryId.value,tImage:file,tText:CategoryForm.tText};
    APIService.apiAction(postData, apiUrls.category).then(res => {
      setIsSubmit(false);
      if (res.status == 200) {
          ToastMessage(1,res.message);
          navigation.navigate(RoutName.ADMIN_CATEGORY_DET_LIST);
      }else{
        ToastMessage(0,res.message);
      }
    })
  }

  const [CategoryListData,setCategoryListData]=useState([]);

  const handleCheck=(data,name)=>{
    setCategoryForm(prevState=>{
      return{
        ...prevState,
        [name]:data
      }
    })
    setModalVisible(false);
  }

  useEffect(()=>{
    const postData={action:"getCategoryList"};
    APIService.apiAction(postData, apiUrls.category).then(res => {
      if (res.status == 200) {
        let NewDataArr=[];
        res.data.map((curEle,index)=>{
          NewDataArr.push({label:curEle.iCategoryName,value:curEle.iCategoryId});
        })

        setCategoryListData(NewDataArr);
      }else{
        setCategoryListData([]);
      }
    })
    return ()=>{}
  },[])

  const [imagePickSts,setImagePickSts]=useState(false);

  const handlePickImage=(data)=>{
    const fileName=data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.length);
    let tempData=data;
    tempData['FileName']=fileName
    setCategoryForm(prevState=>{
      return{
        ...prevState,
        tImage:tempData
      }
    });
  }

  const fileExt=(uri)=>{
    return uri.split('.').pop();
  }

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{data.id?'Edit':'Add'} Category Detail</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Category Name<Text style={{color:"red"}}>*</Text></Text>
      <View>
        <Input
            placeholder={'Select Category'}
            value={CategoryForm.iCategoryId.label}
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
        isSubmit && !isRequires.iCategoryId?<Text style={{color:"red"}}>Category name field is required!</Text>:""
      }

      <Text style={{marginTop:wp(5),fontSize:18}}>Category Detail Description<Text style={{color:"red"}}>*</Text></Text>
      <Input
          placeholder={'Enter Category Description'}
          onChangeText={(text) => handleChange(text, 'tText')}
          value={CategoryForm.tText}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
      />
      {
        isSubmit && !isRequires.tText?<Text style={{color:"red"}}>Category Description field is required!</Text>:""
      }

      <Text style={{marginTop:wp(5),fontSize:18}}>Image<Text style={{color:"red"}}>*</Text></Text>

      {
        CategoryForm.tImage==null?
        <TouchableOpacity onPress={()=>{setImagePickSts(!imagePickSts)}} style={styles.chooseFile}>
          <View style={{width:wp(15),paddingLeft:wp(4),paddingTop:wp(2)}}>
            <Icon IconName='upload' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'white'}/>
          </View>
          <View style={{width:wp(40)}}>
            <Text style={{alignSelf:'center',marginTop:wp(3),color:'white',fontSize:20}}>Choose Image</Text>
          </View>
        </TouchableOpacity>
        :""
      }

      {
        CategoryForm.tImage?.base64?
        <Image
          style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
          source={{
            uri: 'data:'+CategoryForm.tImage.base64+'/'+fileExt(CategoryForm.tImage.FileName)+';base64,'+CategoryForm.tImage.base64,
          }}
        />
        :""
      }

        {
          isSubmit && !isRequires.Image?<Text style={{color:"red"}}>Image field is required!</Text>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>

        <DropDownCommon  modalVisible={modalVisible} setModalVisible={setModalVisible} data={CategoryListData} selectedVal={CategoryForm.iCategoryId.value} handleCheck={handleCheck} fieldName='iCategoryId'/>

        <ImagePickerCommon  show={imagePickSts} close={setImagePickSts} handlePickImage={handlePickImage} setImage={setCategoryForm} fieldName='tImage'/>

    </View>
  )
}

export default CategoryDetailAdd

const ImagePickerCommon=(props)=>{
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
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
