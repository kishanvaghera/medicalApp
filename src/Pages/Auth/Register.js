import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
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

const Register = ({ navigation }) => {

  const [options, setOptions] = useState([
    { value: 0, lable: 'Selct Paln' },
    { value: 1, lable: 'Pre-Planning' },
    { value: 2, lable: 'Pregnancy' },
    { value: 3, lable: 'Post Pregnancy' }]);
  const [loading, setLoading] = useState(false);
  const [mainForm, setMainForm] = useState({
    planType: { value: 0, lable: 'Selct Paln' },
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    userName: '',
    password: '',
    confirmPassword: ''
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
    APIService.apiAction(postData, apiUrls.category).then(res => {
      setLoading(false);
      console.log('UserGenerateCode', res)
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

  const handalNextBtn = () => {
    navigation.navigate(RoutName.OTHER_DETILS, { userId:'3' });
    // setLoading(true);
    // const postData = {
    //   action: 'addUser',
    //   step: '1',
    //   iPlanId: mainForm.planType['value'],
    //   vFirstName: mainForm['firstName'],
    //   vLastName: mainForm['lastName'],
    //   vEmail: mainForm['email'],
    //   vMobileNo: mainForm['mobileNo'],
    //   vUsername: mainForm['userName'],
    //   vPassword: mainForm['password']
    // };

    // console.log('postdat', postData)
    // APIService.apiAction(postData, apiUrls.auth).then(res => {
    //   setLoading(false);
    //   console.log('addUser', res)
    //   if (res) {
    //     if (res.status == 200) {
    //         navigation.navigate(RoutName.OTHER_DETILS, { userId: res.data });
    //     }
    //   }
    // })
  }

  return (
    <View style={styles.body}>
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
            <View style={styles.dropDownView}>
              <Picker
                selectedValue={mainForm.planType['lable']}
                onValueChange={(item) => {
                  //console.log('Picker', item)
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
                    return <Picker.Item label={curElm.lable} value={curElm.value} />
                  })
                }

              </Picker>
            </View>


            <Input
              placeholder={'First Name'}
              onChangeText={(text) => handleChange(text, 'firstName')}
              value={mainForm.firstName}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
            />
            <Input
              placeholder={'Last Name'}
              onChangeText={(text) => handleChange(text, 'lastName')}
              value={mainForm.lastName}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
            />
            <Input
              placeholder={'Email'}
              onChangeText={(text) => handleChange(text, 'email')}
              value={mainForm.email}
              keyboardType={'email-address'}
              multiline={false}
              returnKeyType={'next'}
            />
            <Input
              placeholder={'Mobile Number'}
              onChangeText={(text) => handleChange(text, 'mobileNo')}
              value={mainForm.mobileNo}
              keyboardType={'phone-pad'}
              multiline={false}
              returnKeyType={'next'}
            />
            <Text style={styles.userText}>{'User Name'}</Text>
            <View style={[styles.dropDownView, { marginTop: 5 }]}>
              <Text style={styles.dropDownText}>{mainForm.userName ? mainForm.userName : '-'}</Text>
            </View>
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
            <Input
              placeholder={'Confirm Password'}
              onChangeText={(text) => handleChange(text, 'confirmPassword')}
              value={mainForm.confirmPassword}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
              autoComplete={'password'}
              secureTextEntry={true}
            />

            <Button
              width={wp(80)}
              height={40}
              title={'Next'}
              buttonStyle={{ marginTop: 20 }}
              customClick={() => handalNextBtn()} />

            <Text style={[styles.lableText, { marginTop: 5, fontSize: 15 }]}>By Signing you agree to team of use</Text>
            <Text style={[styles.lableText, { fontSize: 15 }]}>and privacy notic</Text>
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
    alignItems: 'center',
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
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: '5%',
    backgroundColor: '#D3D3D3'
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
    fontSize: 14,
    fontWeight: '500',
  },
  userText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
    width: wp(80),
    marginTop: wp(5)
  },
  lableBtn: {
    alignSelf: 'flex-end',
    marginTop: 5
  }
});