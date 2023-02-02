import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './CategoryDetailAddStyle'
import * as APIService from '../../../Middleware/APIService';
import apiUrls from '../../../Middleware/apiUrls';
import { Input } from '../../../Layouts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {ToastMessage} from '../../../utils/ToastMessage'
import RoutName from '../../../Routes/RoutName';
import { Picker } from '@react-native-picker/picker';
import {Dropdown,GroupDropdown,MultiselectDropdown} from 'sharingan-rn-modal-dropdown';

const CategoryDetailAdd = ({navigation, route}) => {
  const {data}=route.params;
  const [CategoryForm,setCategoryForm]=useState({
    iDetailId:data?data.id:"",
    iCategoryId:{label:"Select Category",value:""},
    tImage:"",
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
    setIsSubmit(true);
  }

  const options=[
    {label:"Doha",value:"1"}
  ]

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>{data.id?'Edit':'Add'} Category Detail</Text>
      
      <Text style={{marginTop:wp(5),fontSize:18}}>Category Name<Text style={{color:"red"}}>*</Text></Text>
      <View style={{marginBottom:wp(10)}}>
        <Dropdown
            label="Simple dropdown"
            data={options}
            enableSearch
            value={CategoryForm.iCategoryId['value']}
          />
      </View>

      {/* <View style={styles.dropDownView}>
      <Picker
        selectedValue={CategoryForm.iCategoryId['lable']}
        onValueChange={(item) => {
          //console.log('Picker', item)
          setCategoryForm(prevState => {
            return {
              ...prevState,
              iCategoryId: { value: item, lable: item }
            }
          })
        }}
        mode="dropdown" // Android only
        style={{ color: '#000' }}>
        {
          options.map((curElm, index) => {
            return <Picker.Item label={curElm.lable} value={curElm.value} />
          })
        }

      </Picker>
    </View> */}
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
      <Input
          placeholder={'Enter Image'}
          onChangeText={(text) => handleChange(text, 'Image')}
          value={CategoryForm.Image}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          inputContainerStyle={{
            width:wp(90),
            marginTop:wp(3)
          }}
        />
        {
          isSubmit && !isRequires.Image?<Text style={{color:"red"}}>Image field is required!</Text>:""
        }

        <TouchableOpacity onPress={()=>OnSubmit()} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CategoryDetailAdd