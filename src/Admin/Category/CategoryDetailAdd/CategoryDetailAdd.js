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

const MonthList=[
  {label:"1st Month",value:"1"},
  {label:"2nd Month",value:"2"},
  {label:"3rd Month",value:"3"},
  {label:"4th Month",value:"4"},
  {label:"5th Month",value:"5"},
  {label:"6th Month",value:"6"},
  {label:"7th Month",value:"7"},
  {label:"8th Month",value:"8"},
  {label:"9th Month",value:"9"},
]

const WeekList=[
  {label:"Week 1",value:"1"},
  {label:"Week 2",value:"2"},
  {label:"Week 3",value:"3"},
  {label:"Week 4",value:"4"},
  {label:"Week 5",value:"5"},
  {label:"Week 6",value:"6"},
  {label:"Week 7",value:"7"},
  {label:"Week 8",value:"8"},
  {label:"Week 9",value:"9"},
  {label:"Week 10",value:"10"},
  {label:"Week 11",value:"11"},
  {label:"Week 12",value:"12"},
  {label:"Week 13",value:"13"},
  {label:"Week 14",value:"14"},
  {label:"Week 15",value:"15"},
  {label:"Week 16",value:"16"},
  {label:"Week 17",value:"17"},
  {label:"Week 18",value:"18"},
  {label:"Week 19",value:"19"},
  {label:"Week 20",value:"20"},
  {label:"Week 21",value:"21"},
  {label:"Week 22",value:"22"},
  {label:"Week 23",value:"23"},
  {label:"Week 24",value:"24"},
  {label:"Week 25",value:"25"},
  {label:"Week 26",value:"26"},
  {label:"Week 27",value:"27"},
  {label:"Week 28",value:"28"},
  {label:"Week 29",value:"29"},
  {label:"Week 30",value:"30"},
  {label:"Week 31",value:"31"},
  {label:"Week 32",value:"32"},
  {label:"Week 33",value:"33"},
  {label:"Week 34",value:"34"},
  {label:"Week 35",value:"35"},
  {label:"Week 36",value:"36"},
  {label:"Week 37",value:"37"},
  {label:"Week 38",value:"38"},
  {label:"Week 39",value:"39"},
  {label:"Week 40",value:"40"},
]

const CategoryDetailAdd = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {data}=route.params;
  const [CategoryForm,setCategoryForm]=useState({
    iDetailId:data?data.iDetailId:"",
    iCategoryId:data.iCategoryId,
    iSubCategoryId:data?{label:data.vSubCategoryName,value:data.iSubCategoryId}:{label:"",value:""},
    // vSubjectName:data?data.vSubjectName:null,
    iThemeId:data?data.iThemeId:"",
    iSeenType:data?data.iSeenType:"",
    iSeenVal:{label:"",value:""},
    tImage:data?data.tImage:null,
    tText:data?data.tText:"",
    tMusicLink:data?data.tMusicLink:"",
    tVideoLink:data?data.tVideoLink:"",
  });

  useEffect(()=>{
    if(data){
        if(data.iSeenType==1){
          const filterMonth=MonthList.filter((curEle,index)=>{
            return curEle.value==data.iSeenVal
          })

          if(filterMonth.length>0){
            setCategoryForm(prevState=>{
              return {
                ...prevState,
                ['iSeenVal']:filterMonth[0]
              }
            });
          }else{
            setCategoryForm(prevState=>{
              return {
                ...prevState,
                ['iSeenVal']:{label:"",value:""}
              }
            });
          }
        }else if(data.iSeenType==2){
          const filterweek=WeekList.filter((curEle,index)=>{
            return curEle.value==data.iSeenVal
          })

          if(filterweek.length>0){
            setCategoryForm(prevState=>{
              return {
                ...prevState,
                ['iSeenVal']:filterweek[0]
              }
            });
          }else{
            setCategoryForm(prevState=>{
              return {
                ...prevState,
                ['iSeenVal']:{label:"",value:""}
              }
            });
          }
        }else if(data.iSeenType==3){
          setCategoryForm(prevState=>{
            return {
              ...prevState,
              ['iSeenVal']:{label:data.iSeenVal,value:data.iSeenVal}
            }
          });
        }
    }
  },[data])

  const handleChange=(e,name="")=>{
    if(name=="iSeenVal"){
      setCategoryForm(prevState=>{
        return {
          ...prevState,
          [name]:{label:"",value:e}
        }
      });
    }else{
      setCategoryForm(prevState=>{
        return {
          ...prevState,
          [name]:e
        }
      });
    }
  }

  const [isRequires,setisRequired]=useState({
    iCategoryId:{status:false},
    tText:{status:false},
  });

  useEffect(()=>{
      let tempRequired={}

      if(SubCategoryList.length>0){
        tempRequired={
          iCategoryId:{status:false},
          tText:{status:false},
          iSubCategoryId:{status:false},
          // vSubjectName:{status:false},
        }
      }else{
        tempRequired={
          iCategoryId:{status:false},
          tText:{status:false},
          // vSubjectName:{status:false},
        }
      }

      setisRequired(tempRequired);
  },[CategoryForm])

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    // setIsSubmit(true);
    let file="";
    if(CategoryForm.tImage!=""){
      if(CategoryForm?.tImage?.base64){
        file='data:'+CategoryForm.tImage.type+'/'+fileExt(CategoryForm.tImage.FileName)+';base64,'+CategoryForm.tImage.base64;
      }else{
        file=CategoryForm.tImage;
      }
    }

    // vSubjectName:CategoryForm.vSubjectName
    const postData={action:'addCategoryDetail',iDetailId:CategoryForm.iDetailId,iCategoryId:CategoryForm.iCategoryId,tImage:file,tText:CategoryForm.tText,iSubCategoryId:CategoryForm.iSubCategoryId.value,tVideoLink:CategoryForm.tVideoLink,tMusicLink:CategoryForm.tMusicLink,iThemeId:CategoryForm.iThemeId,iSeenType:CategoryForm.iSeenType,iSeenVal:CategoryForm.iSeenVal.value};
    APIService.apiAction(postData, apiUrls.category).then(res => {
      setIsSubmit(false);
      if (res.status == 200) {
          ToastMessage(1,res.message);
          navigation.navigate(RoutName.ADMIN_CATEGORY_DET_LIST,{id:data.iCategoryId});
      }else{
        ToastMessage(0,res.message);
      }
    })
  }

  const [CategoryListData,setCategoryListData]=useState([]);
  const [SubCategoryList,SetSubCategoryList]=useState([]);

  const handleCheck=(data,name)=>{
    setCategoryForm(prevState=>{
      return{
        ...prevState,
        [name]:data
      }
    })
    if(name=="iSeenType"){
      setCategoryForm(prevState=>{
        return {
          ...prevState,
          ['iSeenVal']:{label:"",value:""}
        }
      });
    }
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
  
  const [DayWiseList,setDayWiseList]=useState([]);
  useEffect(()=>{
    const newArr=[];
    for (let i = 1; i <= 365; i++) {
        newArr.push({label:"Day "+i,value:i});
    }
    setDayWiseList(newArr);
  },[])

  const [DropDownList,setDropDownList]=useState([]);
  const handleDropModal=(name)=>{
    setDropFieldName(name);
    if(name=="iCategoryId"){
      setDropDownList([...CategoryListData]);
    }else if(name=="iSubCategoryId"){
      setDropDownList([...SubCategoryList]);
    }else if(name=="iSeenVal"){
      if(CategoryForm['iSeenType']==1){
        setDropDownList([...MonthList]);
      }else if(CategoryForm['iSeenType']==2){
        setDropDownList([...WeekList]);
      }
    }
    setModalVisible(!modalVisible)
  }
  
  useEffect(()=>{
    if(CategoryForm.iCategoryId>0){
      const postData={action:"getSubCategoryDetail",iCategoryId:CategoryForm.iCategoryId};
      APIService.apiAction(postData, apiUrls.category).then(res => {
        if (res.status == 200) {
          let NewDataArr=[];
          res.data.map((curEle,index)=>{
            NewDataArr.push({label:curEle.vSubCategoryName,value:curEle.iSubCategoryId});
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
  },[CategoryForm.iCategoryId])
  const [DropFieldName,setDropFieldName]=useState("");

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{data.id?'Edit':'Add'} Category Detail</Text>
      <ScrollView contentContainerStyle={{paddingBottom:50}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {
        SubCategoryList.length>0?
        <>
          <Text style={{marginTop:wp(5),fontSize:18}}>Sub Category Name<Text style={{color:"red"}}>*</Text></Text>
          <View>
            <Input
                placeholder={'Select Sub Category'}
                value={CategoryForm.iSubCategoryId.label}
                keyboardType={'text'}
                multiline={false}
                returnKeyType={'next'}
                inputContainerStyle={{
                  width:wp(90),
                  marginTop:wp(3),
                  paddingTop:wp(2)
                }}
                clickHandle={()=>{handleDropModal('iSubCategoryId')}}
            />
          </View>
          {
            isSubmit && !isRequires.iSubCategoryId?<Text style={{color:"red"}}>Sub Category name field is required!</Text>:""
          }
        </>
        :"" 
        }

        <Text style={{marginTop:wp(5),fontSize:18}}>Choose Theme<Text style={{color:"red"}}>*</Text></Text>

        <View style={{flexDirection:'row',width:wp(80),justifyContent:'space-between',marginTop:wp(3)}}>
          <TouchableOpacity onPress={()=>handleCheck(1,'iThemeId')}>
            <View style={CategoryForm['iThemeId']==1?styles.radioButtonActive:styles.radioButton}></View>
            <Text >Theme 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleCheck(2,'iThemeId')}>
            <View style={CategoryForm['iThemeId']==2?styles.radioButtonActive:styles.radioButton}></View>
            <Text>Theme 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleCheck(3,'iThemeId')}>
            <View style={CategoryForm['iThemeId']==3?styles.radioButtonActive:styles.radioButton}></View>
            <Text>Theme 3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleCheck(4,'iThemeId')}>
            <View style={CategoryForm['iThemeId']==4?styles.radioButtonActive:styles.radioButton}></View>
            <Text>Theme 4</Text>
          </TouchableOpacity>
        </View>

        <Text style={{marginTop:wp(5),fontSize:18}}>Category Seen Type</Text>
        <View style={{flexDirection:'row',width:wp(80),justifyContent:'space-between',marginTop:wp(3)}}>
          <TouchableOpacity onPress={()=>handleCheck(1,'iSeenType')}>
            <View style={CategoryForm['iSeenType']==1?styles.radioButtonActive:styles.radioButton}></View>
            <Text >Month wise</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleCheck(2,'iSeenType')}>
            <View style={CategoryForm['iSeenType']==2?styles.radioButtonActive:styles.radioButton}></View>
            <Text>Week Wise</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleCheck(3,'iSeenType')}>
            <View style={CategoryForm['iSeenType']==3?styles.radioButtonActive:styles.radioButton}></View>
            <Text>Day Wise</Text>
          </TouchableOpacity>
        </View>

        {
          CategoryForm['iSeenType']==1?
          <>
          <Text style={{marginTop:wp(5),fontSize:18}}>Month Wise Seen<Text style={{color:"red"}}>*</Text></Text>
          <View>
            <Input
                placeholder={'Select Month'}
                value={CategoryForm.iSeenVal.label}
                keyboardType={'text'}
                multiline={false}
                returnKeyType={'next'}
                inputContainerStyle={{
                  width:wp(90),
                  marginTop:wp(3),
                  paddingTop:wp(2)
                }}
                clickHandle={()=>{handleDropModal('iSeenVal')}}
            />
          </View>
          </>:""
        }

        {
          CategoryForm['iSeenType']==2?<>
          <Text style={{marginTop:wp(5),fontSize:18}}>Week Wise Seen<Text style={{color:"red"}}>*</Text></Text>
          <View>
            <Input
                placeholder={'Select Week'}
                value={CategoryForm.iSeenVal.label}
                keyboardType={'text'}
                multiline={false}
                returnKeyType={'next'}
                inputContainerStyle={{
                  width:wp(90),
                  marginTop:wp(3),
                  paddingTop:wp(2)
                }}
                clickHandle={()=>{handleDropModal('iSeenVal')}}
            />
          </View>
          </>:""
        }

        {
          CategoryForm['iSeenType']==3?<>
          <Text style={{marginTop:wp(5),fontSize:18}}>Day Wise Seen<Text style={{color:"red"}}>*</Text></Text>
          <Input
              placeholder={'Enter Day'}
              onChangeText={(text) => handleChange(text, 'iSeenVal')}
              value={CategoryForm.iSeenVal.value}
              keyboardType={'numeric'}
              multiline={false}
              returnKeyType={'next'}
              inputContainerStyle={{
                width:wp(90),
                marginTop:wp(3),
                paddingTop:wp(2)
              }}
          />
          </>:""
        }

        <Text style={{marginTop:wp(5),fontSize:18}}>Category Detail Description<Text style={{color:"red"}}>*</Text></Text>
        <Input
            placeholder={'Enter Category Description'}
            numberOfLines={4}
            onChangeText={(text) => handleChange(text, 'tText')}
            value={CategoryForm.tText}
            keyboardType={'text'}
            multiline={true}
            returnKeyType={'next'}
            inputContainerStyle={{
              width:wp(90),
              height:wp(40),
              marginTop:wp(3),
              paddingLeft:wp(3),
              paddingRight:wp(3)
            }}
        />
        {
          isSubmit && !isRequires.tText?<Text style={{color:"red"}}>Category Description field is required!</Text>:""
        }

        <Text style={{marginTop:wp(5),fontSize:18}}>Video Link</Text>
        <Input
            placeholder={'Paste Video Link'}
            onChangeText={(text) => handleChange(text, 'tVideoLink')}
            value={CategoryForm.tVideoLink}
            keyboardType={'text'}
            multiline={false}
            returnKeyType={'next'}
            inputContainerStyle={{
              width:wp(90),
              marginTop:wp(3),
              paddingTop:wp(2)
            }}
        />

        <Text style={{marginTop:wp(5),fontSize:18}}>Music Link</Text>
        <Input
            placeholder={'Paste Music Link'}
            onChangeText={(text) => handleChange(text, 'tMusicLink')}
            value={CategoryForm.tMusicLink}
            keyboardType={'text'}
            multiline={false}
            returnKeyType={'next'}
            inputContainerStyle={{
              width:wp(90),
              marginTop:wp(3),
              paddingTop:wp(2)
            }}
        />

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
          CategoryForm.tImage!=null && CategoryForm.tImage!=""?
          <>
            {
              CategoryForm?.tImage?.base64?
              <Image
                style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
                source={{
                  uri: 'data:'+CategoryForm.tImage.type+'/'+fileExt(CategoryForm.tImage.FileName)+';base64,'+CategoryForm.tImage.base64,
                }}
              />
              :<Image
              style={{width:wp(40),height:wp(40),marginTop:wp(2)}}
              source={{
                uri: CategoryForm.tImage,
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
      

        <DropDownCommon  modalVisible={modalVisible} setModalVisible={setModalVisible} data={DropDownList} selectedVal={CategoryForm?.[''+DropFieldName]?.['value']} handleCheck={handleCheck} fieldName={DropFieldName}/>

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
