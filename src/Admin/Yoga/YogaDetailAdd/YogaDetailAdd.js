import { View, Text, TouchableOpacity,Modal,StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './YogaDetailAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';
import { Picker } from '@react-native-picker/picker';
import Icon from '../../../utils/Icon';
import DropDownCommon from '../../../utils/DropDownCommon';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const YogaDetailAdd = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {data}=route.params;
  const [YogaForm,setYogaForm]=useState({
    iDetailId:data?data.iYogaId:"",
    iYogaCatId:data?{label:data.vYogaCategoryName,value:data.iYogaCatId}:{label:"",value:""},
    tYogaFile:data?data.tYogaFile:null,
    tYogaDesc:data?data.tYogaDesc:"",
    iSubYogaCatId:data?{label:data.vSubYogaName,value:data.iSubYogaCatId}:{label:"",value:""},
    vYogaName:data?data.vYogaName:"",
    tVideoLink:data?data.tVideoLink:"",
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
    iYogaCatId:{status:false},
    tYogaFile:{status:false},
    tYogaDesc:{status:false},
    vYogaName:{status:false},
    tVideoLink:{status:false},
  });

  useEffect(()=>{
    let tempRequired={};
    if(YogaForm.iYogaCatId.value>0){
      tempRequired={
        iYogaCatId:{status:false},
        tYogaFile:{status:false},
        tYogaDesc:{status:false},
        iSubYogaCatId:{status:false},
        vYogaName:{status:false},
        tVideoLink:{status:false},
      }
    }else{
      tempRequired={
        iYogaCatId:{status:false},
        tYogaFile:{status:false},
        tYogaDesc:{status:false},
        vYogaName:{status:false},
        tVideoLink:{status:false},
      }
    }

    setisRequired(tempRequired);
  },[YogaForm])

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=async()=>{
    setIsSubmit(true);
    if(YogaForm.tYogaFile!=""){
      if(YogaForm.tYogaFile.base64){
        file='data:'+YogaForm.tYogaFile.type+'/'+fileExt(YogaForm.tYogaFile.FileName)+';base64,'+YogaForm.tYogaFile.base64;
      }else{
        file=YogaForm.tYogaFile;
      }
    }
   

   const postData={action:'addYogaDetail',iDetailId:YogaForm.iDetailId,iYogaCatId:YogaForm.iYogaCatId.value,tYogaFile:file,tYogaDesc:YogaForm.tYogaDesc};
    APIService.apiAction(postData, apiUrls.yoga).then(res => {
      setIsSubmit(false);
      if (res.status == 200) {
          ToastMessage(1,res.message);
          navigation.navigate(RoutName.ADMIN_YOGA_DET_LIST);
      }else{
        ToastMessage(0,res.message);
      }
    })
  }

  const [CategoryListData,setCategoryListData]=useState([]);
  const [SubCategoryList,SetSubCategoryList]=useState([]);

  const handleCheck=(data,name)=>{
    setYogaForm(prevState=>{
      return{
        ...prevState,
        [name]:data
      }
    })
    setModalVisible(false);
  }

  useEffect(()=>{
    const postData={action:"getYogaCategory"};
    APIService.apiAction(postData, apiUrls.yoga).then(res => {
      if (res.status == 200) {
        let NewDataArr=[];
        res.data.map((curEle,index)=>{
          NewDataArr.push({label:curEle.vYogaCategoryName,value:curEle.iYogaCatId});
        })

        setCategoryListData(NewDataArr);
      }else{
        setCategoryListData([]);
      }
    })
    return ()=>{}
  },[])

  const [imagePickSts,setYogaFilePickSts]=useState(false);

  const handlePickImage=(data)=>{
    const fileName=data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.length);
    let tempData=data;
    tempData['FileName']=fileName
    setYogaForm(prevState=>{
      return{
        ...prevState,
        tYogaFile:tempData
      }
    });
  }

  const fileExt=(uri)=>{
    return uri.split('.').pop();
  }

  const [DropDownList,setDropDownList]=useState([]);
  const handleDropModal=(name)=>{
    setDropFieldName(name);
    if(name=="iYogaCatId"){
      setDropDownList([...CategoryListData]);
    }else if(name=="iSubYogaCatId"){
      setDropDownList([...SubCategoryList]);
    }
    setModalVisible(!modalVisible)
  }

  const [DropFieldName,setDropFieldName]=useState("");

  useEffect(()=>{
    if(YogaForm.iYogaCatId.value>0){
      const postData={action:"SubYogaCategoryList",iYogaCatId:YogaForm.iYogaCatId.value};
      APIService.apiAction(postData, apiUrls.yoga).then(res => {
        if (res.status == 200) {
          let NewDataArr=[];
          res.data.map((curEle,index)=>{
            NewDataArr.push({label:curEle.vSubYogaName,value:curEle.iSubYogaCatId});
          })

          SetSubCategoryList(NewDataArr);
        }else{
          SetSubCategoryList([]);
        }
      })
    }else{
      SetSubCategoryList([]);
    }
    return ()=>{}
  },[YogaForm.iYogaCatId])

  //Video Code Start

  const video = React.useRef(null);
  const selectVideo = async () => {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    // const base64File=base64(data['assets'][0]['uri']);
    // console.log("base64File",base64File)
  //   RNFS.readFile(data['assets'][0]['uri'], 'base64').then(res => {
  //     console.log("rees",res)
  // })
  // .catch(err => {
     
  //     console.log(err.message, err.code);
  // });
    setVideoUri(data['assets'][0]);
  };
  
  const [videoUri, setVideoUri] = useState(null);

  function setOrientation() {
      if (Dimensions.get('window').height > Dimensions.get('window').width) {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
      else {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
  }
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{data.id?'Edit':'Add'} Yoga Detail</Text>
      <ScrollView contentContainerStyle={{paddingBottom:50}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Text style={{marginTop:wp(5),fontSize:18}}>Yoga Name<Text style={{color:"red"}}>*</Text></Text>
        <View>
          <Input
            placeholder={'Enter Yoga Name'}
            onChangeText={(text) => handleChange(text, 'vYogaName')}
            value={YogaForm.vYogaName}
            keyboardType={'text'}
            multiline={false}
            returnKeyType={'next'}
            inputContainerStyle={{
              width:wp(90),
              marginTop:wp(3)
            }}
          />
        </View>
        {
          isSubmit && !isRequires.vYogaName?<Text style={{color:"red"}}>Yoga name field is required!</Text>:""
        }
      
        <Text style={{marginTop:wp(5),fontSize:18}}>Yoga Category Name<Text style={{color:"red"}}>*</Text></Text>
        <View>
          <Input
              placeholder={'Select Category'}
              value={YogaForm.iYogaCatId.label}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
              inputContainerStyle={{
                width:wp(90),
                marginTop:wp(3)
              }}
              clickHandle={()=>{handleDropModal('iYogaCatId')}}
          />
        </View>
        {
          isSubmit && !isRequires.iYogaCatId?<Text style={{color:"red"}}>Yoga name field is required!</Text>:""
        }

        {
          SubCategoryList.length>0?
          <>
            <Text style={{marginTop:wp(5),fontSize:18}}>Sub Yoga Category Name<Text style={{color:"red"}}>*</Text></Text>
            <View>
              <Input
                  placeholder={'Select Sub Yoga Category'}
                  value={YogaForm.iSubYogaCatId.label}
                  keyboardType={'text'}
                  multiline={false}
                  returnKeyType={'next'}
                  inputContainerStyle={{
                    width:wp(90),
                    marginTop:wp(3)
                  }}
                  clickHandle={()=>{handleDropModal('iSubYogaCatId')}}
              />
            </View>
            {
              isSubmit && !isRequires.iSubYogaCatId?<Text style={{color:"red"}}>Sub Yoga Category name field is required!</Text>:""
            }
          </>
          :"" 
        }

        <View>
          <TouchableOpacity onPress={selectVideo} style={styles.uploadVideoBtnStyle}><Text style={{marginTop:wp(3),color:'white',fontSize:20}}>Select Video</Text></TouchableOpacity>
          {
            videoUri?.uri?
            <Video
                ref={video}
                style={{width: wp(90),
                  height: hp(35),backgroundColor:'white'}}
                source={{
                    uri: videoUri?.uri,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => 'Play')}
                onFullscreenUpdate={setOrientation}
            />
            :""
          }
        </View>

        <Text style={{marginTop:wp(5),fontSize:18}}>Yoga Detail Description<Text style={{color:"red"}}>*</Text></Text>
        <Input
            placeholder={'Enter Yoga Description'}
            onChangeText={(text) => handleChange(text, 'tYogaDesc')}
            value={YogaForm.tYogaDesc}
            keyboardType={'text'}
            multiline={false}
            returnKeyType={'next'}
            inputContainerStyle={{
              width:wp(90),
              marginTop:wp(3)
            }}
        />
        {
          isSubmit && !isRequires.tYogaDesc?<Text style={{color:"red"}}>Yoga Description field is required!</Text>:""
        }

        <Text style={{marginTop:wp(5),fontSize:18}}>Image<Text style={{color:"red"}}>*</Text></Text>

          <TouchableOpacity onPress={()=>{setYogaFilePickSts(!imagePickSts)}} style={styles.chooseFile}>
            <View style={{width:wp(15),paddingLeft:wp(4),paddingTop:wp(2)}}>
              <Icon IconName='upload' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'white'}/>
            </View>
            <View style={{width:wp(40)}}>
              <Text style={{alignSelf:'center',marginTop:wp(3),color:'white',fontSize:20}}>Choose Image</Text>
            </View>
          </TouchableOpacity>

        {
          YogaForm.tYogaFile!=null && YogaForm.tYogaFile!=""?
          <>
            {
              YogaForm.tYogaFile.base64?
              <Image
                style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
                source={{
                  uri: 'data:'+YogaForm.tYogaFile.type+'/'+fileExt(YogaForm.tYogaFile.FileName)+';base64,'+YogaForm.tYogaFile.base64,
                }}
              />
              :<Image
              style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
              source={{
                uri: YogaForm.tYogaFile,
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
      </ScrollView>

        <DropDownCommon  modalVisible={modalVisible} setModalVisible={setModalVisible} data={DropDownList} selectedVal={YogaForm?.[''+DropFieldName]?.['value']} handleCheck={handleCheck} fieldName={DropFieldName}/>

        <ImagePickerCommon  show={imagePickSts} close={setYogaFilePickSts} handlePickImage={handlePickImage} setYogaFile={setYogaForm} fieldName='tYogaFile'/>

    </View>
  )
}

export default YogaDetailAdd

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
