import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './CategoryAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';
import Icon from '../../../utils/Icon'
import {Colors as theme}  from '../../adminTheme';

const CategoryAdd = ({navigation, route}) => {
  const {id,name,aSubCategoryList}=route.params;

  const [CategoryForm,setCategoryForm]=useState({
    iCategoryId:id?id:"",
    iCategoryName:name?name:"",
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
    iCategoryName:{status:false}
  });

  const [isSubmit,setIsSubmit]=useState(false);
  const OnSubmit=()=>{
    setIsSubmit(true);
      if(CategoryForm.iCategoryName!=""){
        setisRequired({
          iCategoryName:{status:true}
        });
        const postData={action:"addCategory",iCategoryId:CategoryForm.iCategoryId,iCategoryName:CategoryForm.iCategoryName,subCategory:SubCategoryList,isChecked:isChecked};
        APIService.apiAction(postData, apiUrls.category).then(res => {
          setIsSubmit(false);
          if (res.status == 200) {
              ToastMessage(1,res.message);
              navigation.navigate(RoutName.ADMIN_CATEGORY_LIST);
          }else{
            ToastMessage(0,res.message);
          }
        })
      }else{
        setisRequired({
          iCategoryName:{status:false}
        });
      }
  }

  const [SubCategoryList,setSubCategoryList]=useState([{iSubCategoryId:'',vSubCategoryName:''}]);

  useEffect(()=>{
    if(aSubCategoryList.length){
      setSubCategoryList([...aSubCategoryList]);
    }else{
      setSubCategoryList([{iSubCategoryId:'',vSubCategoryName:''}]);
    }
  },[aSubCategoryList])
  
  const handleSubCategory=(e,index)=>{
    let tempData=SubCategoryList;
    tempData[index]={
      ...tempData[index],
      vSubCategoryName:e
    }
    setSubCategoryList([...tempData]);
  }

  const addMoreSubCat=()=>{
    let tempData=SubCategoryList;
    tempData.push({iSubCategoryId:'',vSubCategoryName:''});
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
      setSubCategoryList([{iSubCategoryId:'',vSubCategoryName:''}]);
    }
  },[isChecked])

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{id?'Edit':'Add'} Category</Text>
      
        <Text style={{marginTop:wp(5),fontSize:18}}>Category Name<Text style={{color:"red"}}>*</Text></Text>
        <Input
          placeholder={'Enter Category Name'}
          onChangeText={(text) => handleChange(text, 'iCategoryName')}
          value={CategoryForm.iCategoryName}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
        />
        {
          isSubmit && !isRequires.iCategoryName?<Text style={{color:"red"}}>Category name field is required!</Text>:""
        }

        <Text style={{marginTop:wp(5),fontSize:18}}>Is any sub category?</Text>  
        
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
            <Text style={{marginTop:wp(5),fontSize:18}}>Sub Category Name</Text>
            <>
              {
                SubCategoryList.map((curEle,index)=>{
                  const indexNum=index+1;
                  return <View style={{flexDirection:'row',justifyContent:'space-between'}} key={index}>
                            <Input
                              placeholder={'Enter Sub Category Name'}
                              onChangeText={(text) => handleSubCategory(text, index)}
                              value={curEle.vSubCategoryName}
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
    </View>
  )
}

export default CategoryAdd