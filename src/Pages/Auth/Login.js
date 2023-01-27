import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import images from '../../../assets';
import { Input, Button } from '../../Layouts';
import RoutName from '../../Routes/RoutName';
import { useSelector, useDispatch } from 'react-redux'
import { LoginSuccess } from '../../Redux/reducer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as APIService from './../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';


const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const loggedData = useSelector((state) => state.userLoggedData);

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    userName: "",
    password: ""
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
  const LoginCheck = () => {
  //  setLoading(true);
    const postData = {
      action: 'login',
      vUsername: state.userName,
      vPassword: state.password
    };

    APIService.apiAction(postData, apiUrls.auth).then(res => {
   //   setLoading(false);
      console.log('login respos', JSON.stringify(res))
      // if (res) {
      //   if (res.status == 200) {
      //     setIsInvalidErr(false);
      //     dispatch(LoginSuccess({ userLoggedId: 12 }));
      //   }
      // }
    })

    // if(state.userName!="" && state.password!=""){
    //   if(state.userName=="admin" && state.password=="123456"){
    //     setIsInvalidErr(false);
    //     dispatch(LoginSuccess({userLoggedId:12}));
    //   }else{
    //     setIsInvalidErr(true);
    //   }
    // }else{
    //   setIsInvalidErr(true);
    // }
  }

  useEffect(() => {
    console.log("loggedData.isLogin", loggedData.isLogin)
    if (loggedData.isLogin) {
      navigation.navigate('homeScreenStack');
    }
    return () => { }
  }, [loggedData])



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
          isInvalidErr ? <Text style={{ marginTop: wp(2), color: "red" }}>Username or password is wrong!</Text> : ""
        }
        <Input
          placeholder={'Username'}
          onChangeText={(text) => handleChange(text, 'userName')}
          value={state.userName}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
        />
        <Input
          placeholder={'Password'}
          onChangeText={(text) => handleChange(text, 'password')}
          value={state.password}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          autoComplete={'password'}
          secureTextEntry={true}
        />
        <Button
          width={'80%'}
          height={40}
          title={'Sign in'}
          buttonStyle={{ marginTop: 20 }}
          customClick={() => LoginCheck()} />
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