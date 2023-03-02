import { View, Text, TouchableOpacity, ScrollView,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './AddDietStyle';
import * as APIService from '../../Middleware/APIService';
import {ToastMessage} from '../../utils/ToastMessage'
import Icon from '../../utils/Icon'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { scale, verticalScale } from '../../utils/scalling';
import * as ImagePicker from 'expo-image-picker';
import { Loader } from '../../Components';
import apiUrls from '../../Middleware/apiUrls';
import RoutName from '../../Routes/RoutName';

const AddDiet = ({navigation,route}) => {
  const {data}=route.params;
  const [CategoryForm,setCategoryForm]=useState({
    iDietId:data.id,
    eDietType:data.type, 
    tImageArr:[]
  });

  const handleChange=(name,e)=>{
    setCategoryForm(prevState=>{
      return{
        ...prevState,
        [name]:e
      }
    });
  }

  useEffect(()=>{
    if(data.id>0){
      const postData={action:"getDietDetail",iDietId:data.id}
      APIService.apiAction(postData, apiUrls.diet).then(res => {
        if(res.status==200){
          setCategoryForm({
            eDietType:res.data.eDietType, 
            tImageArr:res.data.tImageArr
          });
        }
      })
    }
  },[data])

  const [imagePickSts,setImagePickSts]=useState(false);

  const handlePickImage=(data)=>{
    let newImageArr=[];
    data.map((curEle,index)=>{
      const fileName=curEle.uri.substring(curEle.uri.lastIndexOf('/') + 1, curEle.uri.length);
      let tempData=curEle;
      tempData['FileName']=fileName

      newImageArr.push(tempData);
    })

    let oldPhotos=[...CategoryForm.tImageArr,...newImageArr];
    setCategoryForm(prevState=>{
      return{
        ...prevState,
        tImageArr:oldPhotos
      }
    });
  }

  const fileExt=(uri)=>{
    return uri.split('.').pop();
  }

  const [loading,setLoading]=useState(false);
  const OnSubmit=()=>{
    if(CategoryForm.eDietType!="" && CategoryForm.tImageArr.length>0){
      setLoading(true);
      let newFileTempArr=[];
      CategoryForm.tImageArr.map((curEle,index)=>{
        let file={iDietImageId:curEle.iDietImageId,file:""};
        if(curEle?.base64){
          file['file']='data:'+curEle.type+'/'+fileExt(curEle.FileName)+';base64,'+curEle.base64;
        }else{
          file['file']=curEle.tImage;
        }
        newFileTempArr.push(file);
      })
      const postData={action:"addDiet",iDietId:data.id,eDietType:CategoryForm.eDietType,tImageArr:newFileTempArr};
      APIService.apiAction(postData, apiUrls.diet).then(res => {
        setLoading(false);
        if (res.status == 200) {
          navigation.navigate(RoutName.ADMIN_DIET_LIST)
          ToastMessage(1,res.message);
        }else{
          ToastMessage(0,res.message);
        }
      })
    }else{
      if(CategoryForm.eDietType==""){
        ToastMessage(0,'Diet Type is required!');
      }else{
        ToastMessage(0,'Image is required!');
      }
    }
  }

  const deleteImage=(ind)=>{
    const filterData=CategoryForm.tImageArr.filter((curEle,index)=>{
      return index!=ind
    })

    setCategoryForm(prevState=>{
      return{
        ...prevState,
        tImageArr:filterData
      }
    });
  }


  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{data.type} Diet</Text>
      <ScrollView contentContainerStyle={{paddingBottom:50}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <Loader loading={loading} />
        {/* <Text style={{marginTop:wp(5),fontSize:18}}>Diet Type<Text style={{color:"red"}}>*</Text></Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:moderateScale(230)}}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={CategoryForm.eDietType=='Fixed'?styles.checkBoxChecked:styles.checkBox} onPress={()=>{handleChange('eDietType','Fixed')}}>
              {
                CategoryForm.eDietType=='Fixed'?
                <Icon LibraryName='FontAwesome' IconName='check' IconSize={28} IconColor={"white"}/>
                :""
              }
            </TouchableOpacity> 
            <Text style={{marginLeft:scale(10),marginTop:scale(15),fontSize:moderateScale(20)}}>Fixed</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={CategoryForm.eDietType=='Monthly'?styles.checkBoxChecked:styles.checkBox} onPress={()=>{handleChange('eDietType','Monthly')}}>
              {
                CategoryForm.eDietType=='Monthly'?
                <Icon LibraryName='FontAwesome' IconName='check' IconSize={28} IconColor={"white"}/>
                :""
              }
            </TouchableOpacity> 
            <Text style={{marginLeft:scale(10),marginTop:scale(15),fontSize:moderateScale(20)}}>Monthly</Text>
          </View>
        </View> */}

        <Text style={{marginTop:wp(5),fontSize:18}}>Images</Text>
        <TouchableOpacity onPress={()=>{setImagePickSts(!imagePickSts)}} style={styles.chooseFile}>
          <View style={{width:wp(15),paddingLeft:wp(4),paddingTop:wp(2)}}>
            <Icon IconName='upload' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'white'}/>
          </View>
          <View style={{width:wp(40)}}>
            <Text style={{alignSelf:'center',marginTop:wp(3),color:'white',fontSize:20}}>Choose Image</Text>
          </View>
        </TouchableOpacity>

        {
          CategoryForm.tImageArr.length>0?<>
          {
            CategoryForm.tImageArr.map((curEle,index)=>{
              return <View key={index}>
                 {
                    curEle?.base64?
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <Image
                        style={{height:verticalScale(150),width:'90%',marginTop:wp(2),resizeMode:'cover',marginBottom:scale(5)}}
                        source={{
                          uri: 'data:'+curEle.type+'/'+fileExt(curEle.FileName)+';base64,'+curEle.base64,
                        }}
                      />
                      <TouchableOpacity onPress={()=>deleteImage(index)}>
                        <Icon IconName='trash' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'red'}/>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <Image
                        style={{height:verticalScale(150),width:'90%',marginTop:wp(2),resizeMode:'cover',marginBottom:scale(5)}}
                        source={{
                          uri: curEle.tImage,
                        }}
                      />
                      <TouchableOpacity onPress={()=>deleteImage(index)}>
                        <Icon IconName='trash' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'red'}/>
                      </TouchableOpacity>
                    </View>
                  }
              </View>
            })
          }
          </>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>

        <ImagePickerCommon  show={imagePickSts} close={setImagePickSts} handlePickImage={handlePickImage} setImage={setCategoryForm} fieldName='tImageArr'/>
      </ScrollView>
    </View>
  )
}

export default AddDiet

const ImagePickerCommon=(props)=>{
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5,
      base64:true,
      fileName:true,
      allowsMultipleSelection:true
    });

    if (!result.canceled) {
      props.handlePickImage(result.assets)
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
