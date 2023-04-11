import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../../../../Layouts';
import images from '../../../../../assets';
import { scale } from '../../../../utils/scalling';
import Icon from '../../../../utils/Icon';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as APIService from '../../../../Middleware/APIService';
import apiUrls from '../../../../Middleware/apiUrls';
import { UserDataStor } from '../../../../Redux/reducer';

const PlanData={
 '1':'Pre - Planning',
 '2':'Pregnancy',
 '3':'Post Pregnancy',
}

const ProfilePage = () => {
  const dispatch = useDispatch()

  const fileExt=(uri)=>{
    return uri.split('.').pop();
  }

  const userData = useSelector((state) => state?.userLoggedData?.isUserData);

  const [imagePickSts,setActivityFilePickSts]=useState(false);

  const handlePickImage=(data)=>{
    const fileName=data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.length);
    let tempData=data;
    tempData['FileName']=fileName

    const postData={action:"ProfilePicChange",tImage:'data:'+tempData.type+'/'+fileExt(tempData.FileName)+';base64,'+tempData?.base64}
    APIService.apiAction(postData, apiUrls.auth).then(res => {
        if(res.status==200){
          dispatch(UserDataStor({ isUserData : res.data }));
        }
    })
  }


  return (
    <View style={styles.body}>
      <SafeAreaView>
          <Header iconName={'menu'} title={'Profile'} />
      </SafeAreaView>

      <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
        <View style={styles.mainBox}>
            <View style={styles.imageRing}>
              <Image
                source={userData?.tProfilePic==""?images.profile:{uri:userData?.tProfilePic}}
                style={{ width: 100, height: 100, borderRadius: 50,alignSelf:'center'}}
              />
              <TouchableOpacity style={styles.circlePick} onPress={()=>setActivityFilePickSts(true)}>
                <Icon LibraryName="Feather" IconName="camera" IconSize={25} IconColor="white"/>
              </TouchableOpacity>
            </View>
            <View style={styles.BoxRows}>
              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Full Name</Text>
                <Text style={styles.HeadTextData}>{userData?.vFirstName+" "}{userData?.vMiddleName+" "}{userData?.vLastName}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>User Code</Text>
                <Text style={styles.HeadTextData}>{userData?.vUsername==""?"-":userData?.vUsername}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Current Plan</Text>
                <Text style={styles.HeadTextData}>{PlanData[''+userData?.iPlanId]}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Email</Text>
                <Text style={styles.HeadTextData}>{userData?.vEmail==""?"-":userData?.vEmail}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Mobile Number</Text>
                <Text style={styles.HeadTextData}>{userData?.vMobileNo==""?"-":userData?.vMobileNo}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Date Of Birth</Text>
                <Text style={styles.HeadTextData}>{userData?.vDateOfBirth==""?"-":userData?.vDateOfBirth}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Height</Text>
                <Text style={styles.HeadTextData}>{userData?.vHeight==""?"-":userData?.vHeight}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Weight</Text>
                <Text style={styles.HeadTextData}>{userData?.vWeight==""?"-":userData?.vWeight}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Due Date</Text>
                <Text style={styles.HeadTextData}>{userData?.vPregDueDate==""?"-":userData?.vPregDueDate}</Text>
              </View>

              <View style={{marginBottom:scale(20)}}>
                <Text style={styles.HeadText}>Pregnancy Week</Text>
                <Text style={styles.HeadTextData}>{userData?.vPregWeek==""?"-":userData?.vPregWeek}</Text>
              </View>
            </View>
        </View>
      </ScrollView>
      <ImagePickerCommon  show={imagePickSts} close={setActivityFilePickSts} handlePickImage={handlePickImage}/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox:{
    marginTop:scale(20),
    alignSelf:'center',
  },
  imageRing:{
    backgroundColor:'white',
    alignSelf:'center',
    width: 110, 
    height: 110,
    justifyContent:'center',
    borderRadius:scale(100),
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circlePick:{
    width:50,
    height:50,
    backgroundColor:'#004c99',
    position:'absolute',
    right:-15,
    top:-15,
    borderRadius:scale(100),
    justifyContent:'center',
    alignItems:'center',
    borderWidth:scale(3),
    borderColor:'white'
  },
  BoxRows:{
    marginTop:scale(20),
    width:wp('90%'),
    height:'auto',
    backgroundColor:'white',
    borderRadius:scale(20),
    alignSelf:'center',
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingTop:scale(20),
    paddingLeft:scale(20)
  },
  HeadText:{
    fontFamily:'Lato_400Regular',
    fontSize:RFPercentage(2),
    color:'#4173a6',
    height:scale(18)
  },
  HeadTextData:{
    fontFamily:'Lato_700Bold',
    fontSize:RFPercentage(2.3),
    color:'#004c99',
    marginTop:scale(2),
    height:'auto'
  }
});

export default ProfilePage;

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
  }
  useEffect(()=>{
    if(props.show===true){
      pickImage();
    }
  },[props.show])

  return <></>;
}