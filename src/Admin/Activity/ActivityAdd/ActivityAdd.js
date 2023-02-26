import { View, Text, TouchableOpacity, ScrollView,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './ActivityAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';
import Icon from '../../../utils/Icon'
import {Colors as theme}  from '../../adminTheme';
import * as ImagePicker from 'expo-image-picker';

const ActivityAdd = ({navigation, route}) => {
  const {id,name,tImage,aSubCategoryList}=route.params;

  const [ActivityForm,setActivityForm]=useState({
    iActivityCatId:id?id:"",
    vActivitCatName:name?name:"",
    tImage:tImage && tImage!=""?tImage:null,
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

        let file="";
        if(ActivityForm.tImage!=""){
          if(ActivityForm?.tImage?.base64){
            file='data:'+ActivityForm.tImage.type+'/'+fileExt(ActivityForm.tImage.FileName)+';base64,'+ActivityForm.tImage.base64;
          }else{
            file=ActivityForm.tImage;
          }
        }

        const postData={action:"addActivityCategory",iActivityCatId:ActivityForm.iActivityCatId,vActivitCatName:ActivityForm.vActivitCatName,subCategory:SubCategoryList,isChecked:isChecked,tImage:file};
        APIService.apiAction(postData, apiUrls.activity).then(res => {
          console.log("res",res)
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

  const [SubCategoryList,setSubCategoryList]=useState([{iSubActivityId:'',vSubActivityName:''}]);

  useEffect(()=>{
    if(aSubCategoryList.length){
      setSubCategoryList([...aSubCategoryList]);
    }else{
      setSubCategoryList([{iSubActivityId:'',vSubActivityName:''}]);
    }
  },[aSubCategoryList])
  
  const handleSubCategory=(e,index)=>{
    let tempData=SubCategoryList;
    tempData[index]={
      ...tempData[index],
      vSubActivityName:e
    }
    setSubCategoryList([...tempData]);
  }

  const addMoreSubCat=()=>{
    let tempData=SubCategoryList;
    tempData.push({iSubActivityId:'',vSubActivityName:''});
    setSubCategoryList([...tempData]);
  }

  const removeCategory=(index)=>{
    const filterData=SubCategoryList.filter((curEle,ind)=>{
      return ind!=index
    })
    setSubCategoryList([...filterData]);
  }

  const [isChecked,setIsChecked]=useState(aSubCategoryList.length);

  useEffect(()=>{
    if(!isChecked){
      setSubCategoryList([{iSubActivityId:'',vSubActivityName:''}]);
    }
  },[isChecked])

  const [imagePickSts,setImagePickSts]=useState(false);

  const handlePickImage=(data)=>{
    const fileName=data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.length);
    let tempData=data;
    tempData['FileName']=fileName
    setActivityForm(prevState=>{
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
      <Text style={styles.mainTitle}>{id?'Edit':'Add'} Activity</Text>
      <ScrollView contentContainerStyle={{paddingBottom:50}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
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

          <Text style={{marginTop:wp(5),fontSize:18}}>Is any sub activity?</Text>  
          
          <TouchableOpacity style={isChecked?styles.checkBoxChecked:styles.checkBox} onPress={()=>{setIsChecked(!isChecked)}}>
            {
              isChecked?
              <Icon LibraryName='FontAwesome' IconName='check' IconSize={28} IconColor={"white"}/>
              :""
            }
          </TouchableOpacity> 

          {
            SubCategoryList.length>0 && isChecked?
            <>
              <Text style={{marginTop:wp(5),fontSize:18}}>Sub Activity Name</Text>
              <>
                {
                  SubCategoryList.map((curEle,index)=>{
                    const indexNum=index+1;
                    return <View style={{flexDirection:'row',justifyContent:'space-between'}} key={index}>
                              <Input
                                placeholder={'Enter Sub Activity Name'}
                                onChangeText={(text) => handleSubCategory(text, index)}
                                value={curEle.vSubActivityName}
                                keyboardType={'text'}
                                multiline={false}
                                returnKeyType={'next'}
                                inputContainerStyle={{
                                  width:wp(75),
                                  marginTop:wp(3)
                                }}
                              />
                              {
                                SubCategoryList.length==indexNum?
                                <TouchableOpacity style={{marginRight:wp(3),marginTop:wp(4)}} onPress={addMoreSubCat}>
                                  <Icon LibraryName='FontAwesome' IconName='plus-circle' IconSize={35} IconColor={theme.primaryDark}/>
                                </TouchableOpacity>
                                :<TouchableOpacity style={{marginRight:wp(3),marginTop:wp(4)}} onPress={()=>removeCategory(index)}>
                                <Icon LibraryName='FontAwesome' IconName='minus-circle' IconSize={35} IconColor={theme.primaryDark}/>
                              </TouchableOpacity>
                              }
                            </View>
                  })
                }
              </>
            </>
            :""
          }


          <Text style={{marginTop:wp(5),fontSize:18}}>Image</Text>

          <TouchableOpacity onPress={()=>{setImagePickSts(!imagePickSts)}} style={styles.chooseFile}>
            <View style={{width:wp(15),paddingLeft:wp(4),paddingTop:wp(2)}}>
              <Icon IconName='upload' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'white'}/>
            </View>
            <View style={{width:wp(40)}}>
              <Text style={{alignSelf:'center',marginTop:wp(3),color:'white',fontSize:20}}>Choose Image</Text>
            </View>
          </TouchableOpacity>

          {
            ActivityForm.tImage!=null && ActivityForm.tImage!=""?
            <>
              {
                ActivityForm?.tImage?.base64?
                <Image
                  style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
                  source={{
                    uri: 'data:'+ActivityForm.tImage.type+'/'+fileExt(ActivityForm.tImage.FileName)+';base64,'+ActivityForm.tImage.base64,
                  }}
                />
                :<Image
                style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
                source={{
                  uri: ActivityForm.tImage,
                }}
              />
              }
            </>
            :""
          }


          <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
      </ScrollView>

      <ImagePickerCommon  show={imagePickSts} close={setImagePickSts} handlePickImage={handlePickImage} setImage={setActivityForm} fieldName='tImage'/>
    </View>
  )
}

export default ActivityAdd


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
