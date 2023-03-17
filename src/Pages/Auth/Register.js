import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { Input, Button } from '../../Layouts';
import RoutName from '../../Routes/RoutName';
import * as APIService from './../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { moderateScale, scale } from '../../utils/scalling';
import validator from 'validator';

const Register = ({ navigation }) => {

  const [options, setOptions] = useState([
    { value: 0, lable: 'Select Plan' },
    { value: 1, lable: 'Pre - Planning' },
    { value: 2, lable: 'Pregnancy' },
    { value: 3, lable: 'Post Pregnancy' }]
  );

  const [loading, setLoading] = useState(false);

  const [mainForm, setMainForm] = useState({
    planType: { value: 0, lable: 'Selct Paln' },
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    userName: '',
    password: '',
  })

  const handleChange = (e, name) => {
    setMainForm(prevState => {
      return {
        ...prevState,
        [name]: e
      }
    })
  }

  useEffect(() => {

    generateUserCode();
    return () => { }
  }, [])

  const generateUserCode = () => {
    setLoading(true);
    const postData = {
      action: 'UserGenerateCode',
    };
    APIService.apiAction(postData, apiUrls.auth).then(res => {
      setLoading(false);
      if (res) {
        if (res.status == 200) {
          setMainForm(prevState => {
            return {
              ...prevState,
              userName: res.data
            }
          })
        }
      }
    })
  }

  const [isSubmitErrShow,setIsSubmitErrShow]=useState(false);
  const handalNextBtn = () => {
    setIsSubmitErrShow(true);
    const {planType,firstName,lastName,email,mobileNo,userName,password}=mainForm;

    if(planType.value>0 && firstName!="" && lastName!="" && email!="" && validator.isEmail(mainForm['email']) && mobileNo!="" && userName!="" && password!=""){
        navigation.navigate(RoutName.OTHER_DETILS, { userId: '3' });
        setLoading(true);
        const postData = {
          action: 'addUser',
          step: '1',
          iPlanId: mainForm.planType['value'],
          vFirstName: mainForm['firstName'],
          vLastName: mainForm['lastName'],
          vEmail: mainForm['email'],
          vMobileNo: mainForm['mobileNo'],
          vUsername: mainForm['userName'],
          vPassword: mainForm['password']
        };
    
        APIService.apiAction(postData, apiUrls.auth).then(res => {
          setLoading(false);
          if (res) {
            if (res.status == 200) {
              navigation.navigate(RoutName.OTHER_DETILS, { userId: res.data });
            }
          }
        })
    }
  }

  const regex = /^\d{10}$/;

  return (
    <View style={styles.body}>
      <SafeAreaView>
      </SafeAreaView>
      <Loader loading={loading} />
      <View style={styles.backBtbView}>
        <AntDesign name="left" size={22} color="black" />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          alignItems: 'center'
        }}
        style={{ flex: 1 }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.formContaner}>
            <Text style={styles.boldText}>Register</Text>
            <Text style={styles.lableText}>Create your new account</Text>

            <Text style={styles.userText}>{'User Name Code'}</Text>
            <View style={[styles.dropDownView, { marginTop: 5, paddingLeft: scale(20), backgroundColor: '#DDDDDD' }]}>
              <Text style={styles.dropDownText}>{mainForm.userName ? mainForm.userName : '-'}</Text>
            </View>

            <View style={styles.dropDownView}>
              <Picker
                selectedValue={mainForm.planType['lable']}
                onValueChange={(item) => {
                  setMainForm(prevState => {
                    return {
                      ...prevState,
                      planType: { value: item, lable: item }
                    }
                  })
                }}
                mode="dropdown" // Android only
                style={{ color: '#000' }}>
                {
                  options.map((curElm, index) => {
                    return <Picker.Item style={{ fontSize: scale(16), fontWeight: '800', color: '#000000' }} label={curElm.lable} value={curElm.value} />
                  })
                }
              </Picker>
            </View>
            {mainForm.planType['value']==0 && isSubmitErrShow?<Text style={styles.err}>Plan Type is required!</Text>:""}

            <Input
              placeholder={'First Name'}
              onChangeText={(text) => handleChange(text, 'firstName')}
              value={mainForm.firstName}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
            />
            {mainForm['firstName']=="" && isSubmitErrShow?<Text style={styles.err}>First Name is required!</Text>:""}

            <Input
              placeholder={'Last Name'}
              onChangeText={(text) => handleChange(text, 'lastName')}
              value={mainForm.lastName}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
            />
            {mainForm['lastName']=="" && isSubmitErrShow?<Text style={styles.err}>Last Name is required!</Text>:""}

            <Input
              placeholder={'Email'}
              onChangeText={(text) => handleChange(text, 'email')}
              value={mainForm.email}
              keyboardType={'email-address'}
              multiline={false}
              returnKeyType={'next'}
            />
            {(mainForm['email']=="" || !validator.isEmail(mainForm['email'])) && isSubmitErrShow?<Text style={styles.err}>{mainForm['email']==""?"Email is required!":"Email type is not valid!"}</Text>:""}

            <Input
              placeholder={'Mobile Number'}
              onChangeText={(text) => handleChange(text, 'mobileNo')}
              value={mainForm.mobileNo}
              keyboardType={'phone-pad'}
              multiline={false}
              returnKeyType={'next'}
            />
            {(mainForm['mobileNo']=="" || !regex.test(mainForm['mobileNo'])) && isSubmitErrShow?<Text style={styles.err}>{mainForm['mobileNo']==""?"Mobile Number is required!":"Mobile Number is not valid!"}</Text>:""}

            <Input
              placeholder={'Password'}
              onChangeText={(text) => handleChange(text, 'password')}
              value={mainForm.password}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
              autoComplete={'password'}
              secureTextEntry={true}
            />
            {(mainForm['password']=="" || !validator.isLength(mainForm['password'], { min: 8 })) && isSubmitErrShow?<Text style={styles.err}>{mainForm['password']==""?"Password is required!":"Password minimum length is 8."}</Text>:""}

            <Button
              width={wp(80)}
              height={40}
              title={'Next'}
              buttonStyle={{ marginTop: 20 }}
              customClick={() => handalNextBtn()} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

export default Register;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
  formContaner: {
    width: '100%',
    paddingHorizontal: '10%',
    // alignItems: 'center',
    marginTop: '10%'
  },
  boldText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  lableText: {
    fontSize: 20,
    fontWeight: '400'
  },
  backBtbView: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: scale(40),
  },
  dropDownView: {
    width: wp(80),
    height: 40,
    marginTop: 20,
    color: '#000',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: '#808080',
    borderRadius: 10,
    paddingLeft: 5,
  },
  dropDownText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  userText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    width: wp(80),
    marginTop: wp(5)
  },
  lableBtn: {
    alignSelf: 'flex-end',
    marginTop: 5
  },
  err:{
    fontSize:scale(16),
    color:'red',
    marginTop:scale(5)
  }
});