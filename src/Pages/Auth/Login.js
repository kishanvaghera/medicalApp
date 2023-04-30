import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import images from '../../../assets';
import { Input, Button } from '../../Layouts';
import RoutName from '../../Routes/RoutName';
import { useSelector, useDispatch } from 'react-redux'
import { LoginSuccess, UserDataStor, AdminLogin } from '../../Redux/reducer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as APIService from './../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { firebaseConfig } from '../../../config';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const loggedData = useSelector((state) => state.userLoggedData);

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    vOtp:"",
  });

  const handleChange = (e, name) => {
    setState(prevState => {
      return {
        ...prevState,
        [name]: e
      }
    })
  }

  const [isInvalidErr, setIsInvalidErr] = useState(false);

  useEffect(() => {
    if (loggedData.isLogin) {
      navigation.navigate('homeScreenStack');
    }
    return () => { }
  }, [loggedData])

  const saveDataToAsyncStorage = async (data) => {
    try {
      await AsyncStorage.setItem('@loginData', JSON.stringify(data));
      // 'loginData' is the key under which the data is stored
    } catch (e) {
      console.log('Error saving login data to AsyncStorage:', e);
    }
  };


  const [verificationId, setVerificationId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const recaptchaVerifier = useRef(null);

  const [isMobileInvalid, setisMobileInvalid] = useState(false);
  const sendVerificationCode = () => {
    if (phoneNumber == "") {
      setIsInvalidErr(true);
    } else {
      setLoading(true);
      const postData = { action: "mobileNumberCheck", vMobileNumber: phoneNumber }
      APIService.apiAction(postData, apiUrls.auth).then(res => {
        if (res) {
          if (res.status == 200) {
            setisMobileInvalid(false);
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);
            setPhoneNumber('');
            setLoading(false);
          } else {
            setisMobileInvalid(true);
          }
        }
      })
    }
  }

  const [isOTPInvalid, setisOTPInvalid] = useState(false);
  const confirmCode = () => {
    if (state.vOtp == "") {
      setIsInvalidErr(true);
    } else {
      setLoading(true);
      setIsInvalidErr(false);
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, state.vOtp);
      firebase.auth().signInWithCredential(credential).then(() => {
        setisOTPInvalid(false);
        const postData = {
          action: 'AppLogin',
          vMobileNumber: phoneNumber
        };

        APIService.apiAction(postData, apiUrls.auth).then(res => {
          setLoading(false);
          if (res) {
            if (res.status == 200) {
              setIsInvalidErr(false);
              if (res.iRole == 1) {
                dispatch(AdminLogin())
              }
              dispatch(LoginSuccess({ userLoggedId: res.data.iUserId }));
              dispatch(UserDataStor({ isUserData: res.data }));

              saveDataToAsyncStorage(res.data);

            } else {
              setIsInvalidErr(true);
            }
          } else {
            setIsInvalidErr(true);
          }
        })

      }).catch((error) => {
        setLoading(false);
        setisOTPInvalid(true);
      })
    }
  }


  return (
    <View style={styles.body}>
      <Loader loading={loading} />
      <Image
        style={styles.image}
        source={images.login_bg}
        resizeMode={'stretch'} />

      <View style={styles.formContaner}>
        <Text style={styles.boldText}>WelCome back</Text>
        <Text style={styles.lableText}>Login to your account</Text>
        {
          isInvalidErr ? <Text style={{ marginTop: wp(2), color: "red" }}>{verificationId == "" ? "Please Enter Mobile Number!" : "Please Enter OTP Code!"}</Text> : ""
        }
        {
          isMobileInvalid ? <Text style={{ marginTop: wp(2), color: "red" }}>Please enter valid Mobile Number!</Text> : ""
        }
        {
          isOTPInvalid ? <Text style={{ marginTop: wp(2), color: "red" }}>Please enter valid OTP!</Text> : ""
        }

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        {
          verificationId == "" ?
            <Input
              placeholder={'Mobile Number'}
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
            />
            : ""
        }
        {
          verificationId != "" ?
            <Input
              placeholder={'OTP'}
              onChangeText={(text) => handleChange(text, 'vOtp')}
              value={state.vOtp}
              keyboardType={'text'}
              multiline={false}
              returnKeyType={'next'}
            />
            : ""
        }

        {
          verificationId != "" ?
            <Button
              width={'80%'}
              height={40}
              title={'Login'}
              buttonStyle={{ marginTop: 20 }}
              customClick={() => confirmCode()} /> :
            <Button
              width={'80%'}
              height={40}
              title={'Send OTP'}
              buttonStyle={{ marginTop: 20 }}
              customClick={() => sendVerificationCode()} />
        }

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <Text style={[styles.lableText, {}]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(RoutName.REGIDTER)}><Text style={[styles.lableText, { fontWeight: '600' }]} > Sign up</Text></TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Login;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    marginTop: wp(10),
    width: '100%',
    height: '50%'
  },
  formContaner: {
    width: '100%',
    // paddingHorizontal: '10%',
    alignItems: 'center',
    // marginTop: '10%'
  },
  boldText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  lableText: {
    fontSize: 20,
    fontWeight: '400'
  }
});