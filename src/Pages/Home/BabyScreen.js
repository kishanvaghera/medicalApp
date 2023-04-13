import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView,Dimensions,TouchableOpacity,} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { Video , Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import Icon from '../../utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import images from '../../../assets/'

const BabyScreen = ({navigation,route}) => {
    const [loading, setLoading] = useState(false);
    const {CurrentWeek}=route.params;

    const MonthDataObj={
      '1':Month1Data,
      '2':Month1Data,
      '3':Month1Data,
      '4':Month1Data,
      '5':Month1Data,
      '6':Month1Data,
      '7':Month1Data,
      '8':Month1Data,
      '9':Month1Data,
      '10':Month1Data,
      '11':Month1Data,
      '12':Month1Data,
      '13':Month1Data,
      '14':Month1Data,
      '15':Month1Data,
      '16':Month1Data,
      '17':Month1Data,
      '18':Month1Data,
      '19':Month1Data,
      '20':Month1Data,
      '21':Month1Data,
      '22':Month1Data,
      '23':Month1Data,
      '24':Month1Data,
      '25':Month1Data,
      '26':Month1Data,
      '27':Month1Data,
      '28':Month1Data,
      '29':Month1Data,
      '30':Month1Data,
      '31':Month1Data,
      '32':Month1Data,
      '33':Month1Data,
      '34':Month1Data,
      '35':Month1Data,
      '36':Month1Data,
      '37':Month1Data,
      '38':Month1Data,
      '39':Month1Data,
      '40':Month1Data,
    }

    const thumbnailSource = require('../../../assets/videoThumb.png');
    const video = React.useRef(null);
    const [status, setStatus] = useState({});
    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }else{
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    const [isPlayButtonClicked,setisPlayButtonClicked]=useState(false);
    const handlePlayPress = async () => {
        // Call the playAsync method to start playing the video
        await video.current.playAsync();
        setisPlayButtonClicked(true);
    };

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={'BABY'} />
        </SafeAreaView>

        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:scale(80),paddingTop:scale(10)}} >
            <View style={{marginTop:scale(20),marginBottom:scale(10)}}>
              <Video
                    ref={video}
                    style={styles.imageView}
                    source={{
                        uri: "http://schoolopathy.com/MedicalApi/uploads/music/Shree Geeta 1 Month Final-1.m4v",
                    }}
                    useNativeControls={isPlayButtonClicked}
                    rate={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    isLooping   
                    onPlaybackStatusUpdate={status => setStatus(() => 'Play')}
                    onFullscreenUpdate={setOrientation}
              />

              {
                  isPlayButtonClicked?"":
                  <TouchableOpacity onPress={handlePlayPress} style={{position:'absolute',top:0}} >
                      <Image source={images.videoThumb} style={styles.thumbnail}/>
                  </TouchableOpacity>
              }
              <View style={styles.VideoFooter}>
                <Text style={styles.VideoFooterText}>What you should know this week? | Dr. Abc</Text>
              </View>
            </View>


            <Image style={styles.Image2} source={images.pregnancyMom} />

            {
              MonthDataObj?.['1']?
              <View style={{marginTop:scale(10)}}>
              {
                MonthDataObj['1']['content'].map((curEle,index)=>{
                  const myArray = new String(curEle.description).split("=>");
                  const isSubData=curEle['subData'].length;
                  return <View key={index}>
                            <Text style={styles.heading}>
                              {curEle.Title}
                            </Text>
                            <View style={styles.MainDesc}>
                              <View>
                                {
                                  myArray.map((curEle2,index2)=>{
                                    return curEle2!=""?
                                          <View key={index2}>  
                                            <View style={styles.descriptionBox}>
                                              <View style={{marginTop:scale(10)}}>
                                                    <Icon LibraryName="Ionicons" IconName="ios-checkmark-circle-outline" IconSize={25} IconColor="#0B4E98" />
                                              </View>
                                              <Text style={styles.paragraph}>
                                                {curEle2}
                                              </Text>
                                            </View>
                                          </View>
                                          :""
                                  })
                                }
                              </View>

                              {
                                isSubData?
                                <>
                                {
                                  curEle['subData'].map((curSubEle,SubIndex)=>{
                                    const myArraySub = new String(curSubEle.description).split("=>");
                                    return <View key={SubIndex}>
                                            <Text style={styles.heading}>
                                              {curSubEle.Title}
                                            </Text>
                                            {
                                              myArraySub.map((curEleSubDes,SubIndex2)=>{
                                                return curEleSubDes!=""?<View key={SubIndex2} style={styles.descriptionBox}>
                                                          <View style={{marginTop:scale(10)}}>
                                                                <Icon LibraryName="Ionicons" IconName="ios-checkmark-circle-outline" IconSize={25} IconColor="#0B4E98" />
                                                          </View>
                                                          <Text style={styles.paragraph}>
                                                            {curEleSubDes}
                                                          </Text>
                                                        </View>:""
                                              })
                                            }
                                          </View>
                                  })
                                }
                                </>
                                :""
                              }
                            </View>
                        </View>
                })
              }
            </View>:""
            }
          </ScrollView>
        </View>
    </View>
  )
}

export default BabyScreen

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#f1f8ff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    container: {

    },
    heading:{
      fontSize:RFPercentage(2.3),
      fontFamily:'Lato_700Bold',
      marginTop:scale(10),
      width:widthPercentageToDP('90%'),
      height:verticalScale(20)
    },
    paragraph:{
      fontSize:RFPercentage(2.3),
      fontFamily:'Lato_400Regular',
      marginTop:scale(10),
      width:widthPercentageToDP('75%'),
      lineHeight:scale(25),
    },
    imageView:{
        width:widthPercentageToDP('90%'),
        height:verticalScale(170),
        borderTopLeftRadius:scale(20),
        borderTopRightRadius:scale(20),
    },
    thumbnail: {
      width:widthPercentageToDP('90%'),
      height:verticalScale(170),
      resizeMode: 'stretch',
      borderTopLeftRadius:scale(20),
      borderTopRightRadius:scale(20),
      opacity:0.9
    },
    VideoFooter:{
      backgroundColor:"white",
      alignSelf:'center',
      width:widthPercentageToDP('89%'),
      borderBottomLeftRadius:scale(20),
      borderBottomRightRadius:scale(20),
      shadowColor: "#000",
      shadowOffset:{
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      paddingHorizontal:scale(10),
      paddingVertical:scale(12)
    },
    VideoFooterText:{
      fontSize:RFPercentage(2.3),
      fontFamily:'Lato_400Regular',
    },
    Image2:{
      width:widthPercentageToDP('90%'),
      height:verticalScale(200),
      marginTop:scale(10),
      borderRadius:scale(10),
    },
    descriptionBox:{
      flexDirection:'row',
    },
    MainDesc:{
      marginTop:scale(10),
      borderRadius:scale(10),
      backgroundColor:'#eaf4fe',
      shadowColor: "#000",
      shadowOffset:{
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      marginLeft:scale(1),
      width:widthPercentageToDP('89%'),
      marginBottom:scale(15),
      padding:scale(8)
    }
  })

  const Month1Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Baby Development: ',description:`=> સ્ત્રી બીજ અને પુરુષ બીજ ના સંયોજન થી તૈયાર થયેલો ગર્ભ ગર્ભાશયની દીવાલમાં ચોટે છે.=> amniotic sac નું નિર્માણ થાય છે એટલે કે જેમાં ગર્ભનો વિકાસ થાય છે,Yolk sac માંથી આગળ જતા પેશી ,આંતરડા અને રક્તવાહિનીઓ તૈયાર થાય છે.=> BUD નું નિર્માણ થાય છે જેમાંથી આગળ જતા હૃદય ,ફેફસા અને ચેતનાગ્રંથિઓ ઉત્પન્ન થાય છે.=> પહેલા મહિનાના અંતમાં 1/4 in જેટલું લાંબુ હોય છે.=> દર મિનિટે 2.5 લાખ ન્યુરોન તૈયાર થાય છે.=>	હૃદય પણ આકાર ધારણ કરવા લાગે છે.=> પણ પ્રાથમિક અવસ્થાનું હૃદય સ્નાયુમય પેશીઓનું બનેલું હોય છે.`,subData:[]},
    ]
  }