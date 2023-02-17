import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
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

const ActivityAdd = ({navigation, route}) => {
  const {id,name,aSubCategoryList}=route.params;

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
        const postData={action:"addActivityCategory",iActivityCatId:ActivityForm.iActivityCatId,vActivitCatName:ActivityForm.vActivitCatName,subCategory:SubCategoryList,isChecked:isChecked};
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

          <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default ActivityAdd