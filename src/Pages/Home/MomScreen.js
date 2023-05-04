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

const MomScreen = ({navigation,route}) => {
    const [loading, setLoading] = useState(false);
    const {currentMonth}=route.params;

    const MonthDataObj={
      '1':Month1Data,
      '2':Month2Data,
      '3':Month3Data,
      '4':Month4Data,
      '5':Month5Data,
      '6':Month6Data,
      '7':Month7Data,
      '8':Month8Data,
      '9':Month9Data,
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
            <Header iconName={'menu'} title={'MOM'} />
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
              MonthDataObj?.[''+currentMonth]?
              <View style={{marginTop:scale(10)}}>
              {
                MonthDataObj[''+currentMonth]['content'].map((curEle,index)=>{
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

export default MomScreen


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
      fontSize:RFPercentage(2),
      fontFamily:'Lato_700Bold',
      marginTop:scale(10),
      width:widthPercentageToDP('90%'),
      height:verticalScale(20)
    },
    paragraph:{
      fontSize:RFPercentage(2),
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
      fontSize:RFPercentage(2),
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
      backgroundColor:'white',
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
      {Title:'શાસ્ત્રીય વિકાસ:',description:`=> પ્રથમ માસમાં ગર્ભ કલલ અવસ્થામાં હોય છે .=> પ્રથમ માસમાં પાંચતત્વો માંથી જલતત્વ પ્રભાવિત હોય છે.`,subData:[]},
      {Title:'સુશ્રુત સંહિતા:',description:`=> પ્રથમ મહિનામાં આપણે ગર્ભના અંગ પ્રત્યંગ અલગ અલગ ઓળખી શકતા નથી.=> કારણ કે અવ્યક્ત હોય છે એક અઠવાડિયા પછી ગર્ભ કલલ એટલે કે પરપોટા જેવો હોય છે.`,subData:[]},
      {Title:'વિચાર:',description:`=> પ્રથમ માસથી જ માતાની અંદર  ધબકી  રહેલા નાજુક હૃદય ઉપર માતાના ગુસ્સાની, આવેગોની, લાગણીઓની, પ્રેમની અસર પડે છે.=> આથી પ્રારંભથી જ સગર્ભાએ પોતાના વિચારો ,લાગણીઓ, ભાવનાઓ ઉત્કૃષ્ટ રાખવા જોઈએ.=> શરૂઆતથી જ ઉત્તમ પુસ્તકોનું વાંચન શરૂ કરી દેવું જોઈએ.`,subData:[]},
      {
        Title:'Book Reading: ',description:`=> બાળકમાં જળ તત્વ પ્રભાવી હોય છે .=> જળની ગુણવત્તા છે: શીતળતા, તરલતા અને પ્રવાહીતા; આ પ્રકારના ગુણો બાળકમાં વિકસે એ માટેની બુક વાંચવી જોઈએ.`,
        subData:[
          {Title:'Topics: ',description:`=> પ્રાર્થના=> પ્રાકૃતિક=> કવિતા => વાર્તા`},
          {Title:'Types of Books:',description:`=> સર્વ ધર્મ પ્રાર્થના=> પ્રકૃતિ વર્ણન ની વાર્તા => સંતાન ગોપાલ સ્તોત્ર=> બાળ કૃષ્ણ લીલા.`},
        ]
      },
      {Title:'Music: ',description:`=> સગર્ભાવસ્થાના પ્રથમ માસમાં ગર્ભ કલલ અવસ્થામાં હોય છે .=> જળ તત્વ પ્રભાવી હોવાથી રાગ મલ્હાર આધારિત સંગીત સાંભળવું જોઈએ.`,subData:[]},
    ]
  }

  const Month2Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Baby Development: ',description:`=> ગર્ભનું મસ્તિષ્ક અને ચેતાતંત્રના વિકાસની પ્રક્રિયા શરૂ થાય છે .=> નાક ,હોઠ, જીભનો વિકાસ શરૂ થાય છે .=> હાથ પગના નિર્માણની પ્રક્રિયાને વેગ મળે છે.=> ધડ કરતા માથાનો આકાર મોટો હોય છે .=> કરોડરજ્જુ બનવાની શરૂઆત પણ થઈ જાય છે.=> પીઠના મણકા અને પાંસળીઓની નિર્માણ પ્રક્રિયા શરૂ થાય છે .=> આંખો દ્રશ્યમાન થાય છે ;અને તેનો આગામી વિકાસ શરૂ થાય છે .=> શરીરના હાડકાની નિર્માણ પ્રક્રિયા ઝડપથી બને છે; Cartilage નુ bone માં રૂપાંતરણ થવાની શરૂઆત થાય છે.`,subData:[]},
      {Title:'સુશ્રુત સહિતા: ',description:`=> બીજા મહિને ગર્ભ પરપોટા રૂપે ન રહેતા, હવે થોડો ઘટ્ટ બને છે. આ ગર્ભપેશી જેવો લાંબો ,પીંડ જેવો ગોળ કે અર્બુદ જેવો અણીદાર કઠણ થઈ જાય છે.`,subData:[]},
      {Title:'શાસ્ત્રીય વિકાસ: ',description:`=> ગર્ભ હવે ઘન સ્વરૂપ બની જાય છે.=> બીજા માસમાં ગર્ભ બુદબુદ અવસ્થામાં હોય છે.=> દ્વિતીય માસમાં પૃથ્વી, અગ્નિ, વાયુ અને આકાશ નું આહવાન થતું હોય છે.=> પંચ મહાભૂતોના વિકાસ બાદ સ્થૂલશરીર બને છે.`,subData:[]},
      {Title:'વિચાર: ',description:`=> માતાની સંવેદનાની અસર બાળક ઉપર પડે છે.=> ઉત્તમ વિચારો કરવા જોઈએ.=> શિશુની રક્ષા માટે ગર્ભ રક્ષા સ્તોત્ર, ઇષ્ટ દેવી દેવતા મંત્ર ,ગણપતિ સ્તવન, સરસ્વતી પ્રાર્થના, સંતાન ગોપાલ સ્તોત્ર, વિષ્ણુ સહસ્ત્રના નામ વગેરેનું પઠન કરવું.=> કુંડામાં છોડ રોપી તેનું જતન કરવું .=> છોડની જેમ મારો ગર્ભ પણ જલ્દીથી વિકસિત થશે એવી ભાવના રાખવી.=> પ્રકૃતિનું સૌંદર્ય માણવું .;જેમ કે ખીલેલા પુષ્પો ઉગતો સુરજ ફૂલો પર પતંગિયા રંગબેરંગ ફૂલ છોડ.`,subData:[]},
      {Title:'Book Reading: ',description:`=> બીજા  માસ દરમિયાન વાયુ તત્વ ,પૃથ્વી તત્વ, અગ્નિ તત્વ અને આકાશત્વ પ્રભાવી હોય છે .=> બાળકના સારો વિકાસ થાય એ માટે બાળકમાં ગતિ વહન અને ઝડપના ગુણો વિકસાવવા જોઈએ.`,subData:[
        {Title:'Topics: ',description:`=>બાળકોની વાર્તા => બાળ લીલા=> ભગવાનના અવતારો.`},
        {Title:'Types of Book: ',description:`=>કૃષ્ણ=> રામ=> લવ કુશ=> હનુમાન=> પ્રહલાદ=> પંચતંત્ર અને ઈસપની વાર્તાઓ.=> ભગવત ગીતા: અધ્યાય 8 and 9.`},
      ]},
      {Title:'Music: ',description:`=> ગર્ભાવસ્થાના બીજા માસમાં પૃથ્વી, અગ્નિ, વાયુ અને આકાશ આ મહાભૂતનો આહવાન થતો હોય છે => વાયુ તત્વનો પ્રભાવ વિશેષ હોય છે; વાયુ તત્વ એ પ્રાણ તત્વ છે . => શરીરની સંરચનામાં વાયુ તત્વનું ખૂબ જ મહત્વ રહેલું છે. => વાયુ તત્વ એ ત્વરિત ગતિ સૂચવે છે. => સંગીતમાં રાગ બાગેશ્રીજ વાયુ તત્વ માટે ખૂબ પ્રભાવશાળી છે. => શરીરની રચનામાં પૃથ્વી તત્વ મહત્વનું છે. પૃથ્વી તત્વ ઘન સ્વરૂપમાં શરીરને નિશ્ચિત આકાર આપે છે . => સંગીતમાં રાગ કાનડા તે તત્વો માટે ખૂબ પ્રભાવશાળી છે => અગ્નિ તત્વ શરીરમાં ઊર્જાનું વહન કરે છે . => સંગીતમાં રાગ દિપક અને રાગ અડાણા અગ્નિ તત્વો માટે ખૂબ જ પ્રભાવકારી છે. => આકાશ એ વિશાળતાનું પ્રતીક છે . => ગીતમાં રાગ હિંડોળ આકાશ તત્વ માટે ખૂબ પ્રભાવકાળી છે.`,subData:[]},
      {Title:'વસ્ત્ર: ',description:`=> આછા સફેદ , આછા ગુલાબી અથવા કેસરી`,subData:[]},
      {Title:'આભૂષણ: ',description:`=> ચાંદી અથવા હીરાના.`,subData:[]},
      {Title:'પ્રાણાયામ: ',description:`=> અનુલોમ વિલોમ, શીતલી, શીતકારી`,subData:[]},
      {Title:'માતાની સ્થિતિ: ',description:`=> આ મહિને મોટાભાગની સ્ત્રીઓને ઉલટી, ઉબકા, પેટ અને છાતીમાં બળતરા ની તકલીફ થાય છે.=> આ ઉપરાંત સ્વાદ અને સુગંધમાં થતા ફેરફારને કારણે તેને ખાવાનું ભાવતું નથી.=> આ મહિનામાં કારણ વગર ગુસ્સો, વાત વાતમાં રડી પડવું, માનસિક તણાવ કંઈ કામ કરવાની ઈચ્છા ન થવી વગેરે લક્ષણો જોવા મળે છે.=> સ્ત્રીના શરીરમાં ગર્ભાશયનું સ્થાન મોટા આંતરડા અને મૂત્રાશયની વચ્ચે રહેલું હોય છે.=> આથી જેમ ગર્ભ મોટો થાય છે; તેમ ગર્ભાશય ખેચાવાથી તેનો આકાર વધે છે .=> આથી ગર્ભવતી સ્ત્રીને વારંવાર પેશાબ કરવા જવાની ઈચ્છા થાય છે.=> ત્રીજા મહિના બાદ જ્યારે ગર્ભ ઉપર તરફ વધવાની શરૂઆત કરે ત્યારે આ તકલીફ ઓછી થાય છે.`,subData:[]},
      {Title:'વિશેષ કાળજી: ',description:`=> ત્રીજા મહિના સુધી ગર્ભ સ્થિર હોતો નથી આથી ગર્ભ પ્રત્યે સાવધાની રાખવી પડે છે.=> ચાલતા, ઉઠતા બેસતા કાળજી રાખવી અને લપસી ન જવાય તેનું ખાસ ધ્યાન રાખવું.=> ભારે વજન ન ઉચકવું પોતા કરવા કે કપડાં ધોવા જેવા કામો જેમાં નીચે નમવાનું આવે છે તે ન કરવા.=> કસરતો ન કરવી.=> લાંબી  મુસાફરી ન કરવી.=> ઊંચા પગથીયા કે દાદર ન ચડવા .=> છીંક ઉધરસ કે બગાસુ આવે ત્યારે ઉભા હોય તો બેસી જવું અથવા આધાર લઈ લેવો .=> ઊંચી એડી વાળા ચપ્પલ કે સેન્ડલ  પહેરવા નહીં .=> જીન્સ  કે અન્ય ચુસ્ત કપડા પહેરવા નહીં .=> ઝાટકા સાથે ઊઠવું નહીં .=> નાની વાતમાં ખોટું લગાડવું, ક્રોધ કરવો, ઈર્ષા કરવી વગેરેથી દૂર રહેવું; નહીંતર આ બધા સ્વભાવો બાળકમાં પણ આવી શકે છે.`,subData:[]},
    ]
  }

  const Month3Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Baby Development: ',description:`=> ત્રીજા મહિનામાં ગર્ભની આકૃતિ મનુષ્ય જેવી થવા લાગે છે.=> બાળક હવે બે હાથ બે પગ અને મસ્તક એમ પાંચે અંગો એક સાથે ધારણ કરે છે.=> આંખના પોપચા પણ સ્પષ્ટ દેખાવા લાગે છે પણ હજુ તે બંધ હોય છે.=> બાળકના નાક ,કાન ,કપાળ ,મુખ અને જીભ નો વિકાસ થવા લાગે છે.=> બાળકનું સ્વાદુપિંડ અને કીડની પણ કાર્યરત થઈ જાય છે=> હવે બાળક તેની આસપાસના દ્રવ્ય પદાર્થો શોષી શકે છે અને ગળી પણ શકે છે બાળક પેશાબ પણ કરી શકે છે.=> ત્રીજા મહિનાથી બાળકને જ્ઞાનેન્દ્રિય અને કર્મેન્દ્રિયોનું સર્જન થઈ જાય છે.=> બાળકનું સંવેદન તંત્ર કામ કરતું થઈ જતું હોવાથી બાળકને સુખ દુઃખ સારી ખરાબ વસ્તુઓનું જ્ઞાન ધીરે ધીરે થવા લાગે છે.=> સગર્ભા જે વાંચે છે જુએ છે સાંભળે છે એ બધું હવે ગર્ભ અનુભવવા લાગે છે .=> હવે તે ગંધ પણ પારખી શકે છે ગર્ભસ્થ શિશુ આ ગાળામાં સ્વાદ પારખવાનું શીખે છે અને માતા જે સ્વાદનો આનંદ માણે છે તે સ્વાદ નો આનંદ ગર્ભસ્થ શિશુ પણ માણવા માટે શક્તિમાન બને છે .=> બાળક થોડું હલનચલન પણ કરે છે પરંતુ ગર્ભનું કદ નાનું હોવાથી માતા બાળકનું હલનચલન અનુભવી શકતી નથી.`,subData:[]},
      {Title:'શાસ્ત્રીય વિકાસ: ',description:`=> મહાભૂતોના વિકાસ બાદ બાળકનું ચિત્તશરીર નિર્માણ પામે છે.`,subData:[]},
      {Title:'સુશ્રુત સહિતા: ',description:`=> ત્રીજા મહિનામાં ગર્ભમાં અંગ પ્રત્યંગ સ્પષ્ટ દેખાવા લાગે છે બે હાથ, બે પગ અને ધડ એમ પાંચ પીડ વ્યક્ત થાય છે, બધા જ અવયવો સુક્ષ્મ સ્વરૂપે તૈયાર થાય છે.`,subData:[]},
      {Title:'ચરક સંહિતા: ',description:`=> આચાર્ય ચરકના મતે ત્રીજા મહિને એક સાથે બધી ઇન્દ્રિયો ,બધા અંગ તથા અવયવો તૈયાર થાય છે .=> સાથે નાભી પણ તૈયાર થાય છે.`,subData:[]},
      {Title:'વિહાર: ',description:`=> આ મહિનામાં ગર્ભમાં ઇન્દ્રિયનું નિર્માણ શરૂ થતું હોવાથી ગર્ભવતી સ્ત્રીએ પાંચ ઇન્દ્રિયોનો વિકાસ થાય એવી પ્રવૃત્તિઓને વિશેષ પ્રાધાન્ય આપવું .=> ગર્ભની સાંભળવાની શક્તિ અને કાનનો વિકાસ આ ગાળામાં થવા લાગે છે ;એટલે ઉત્તમ પ્રકારનું સંગીત જો માતા સાંભળે તો બાળકમાં સંગીત પ્રત્યેની જન્મજાત રુચી વિકાસ પામે છે.=> હંમેશા સકારાત્મક વિચારો જ કરવા.=> ધાર્મિક પુસ્તકો વાંચવા અને ઇષ્ટદેવની આરાધના કરવી.`,subData:[]},
      {Title:'Book Reading: ',description:`=> બાળકના કાનનો વિકાસ થવા લાગે છે .=> બાળક સાંભળવાનું શરૂ  કરે છે.`,subData:[
        {Title:'Quality: ',description:`=> બાળકને એવી વાર્તા સંભળાવી કે જેમાંથી મોરલ મળતું હોય ,કોઈ સંદેશ મળતો હોય કે જેમાંથી કંઈક શીખવા મળતું હોય.`},
        {Title:'Topics: ',description:`=> બાળકોની વાર્તા ,=> બાળકોના નાટક,=> બાળકોને જીવન ચરિત્ર ,=> આ ઉપરાંત ભગવાનના જીવન ચરિત્ર.`},
        {Title:'Types of Books: ',description:`=> નચીકેતા, => પ્રહલાદ, => પાંડવોના જીવન ચરિત્ર, => રામાયણ , => ભગવાન બુદ્ધ ચરિત્ર , => મહાવીર સ્વામી ચરિત્ર, => સ્વામિ  નારાયણ જીવન ચરિ ત્ર.=> ભગવદ્ ગીતા : અધ્યાય 10 and 11.`},
      ]},
      {Title:'Music: ',description:`=> ત્રીજા માસે પંચમહાભૂતોના એકત્રીકરણ પછી ચિત્ત શક્તિનો વિકાસ ખૂબ જ જરૂરી છે ચિત્તના વિકાસ માટે શ્રવણ ખૂબ જ મહત્વનું છે.=> આદ્યશક્તિ દુર્ગાની ભક્તિ ચિત્તના વિકાસ માટે ખૂબ જ ઉપયોગી હોવાથી રાગ દુર્ગા સાંભળવાથી આદ્યશક્તિ દુર્ગાનું સ્મરણ થાય છે.`,subData:[]},
      {Title:'વસ્ત્ર: ',description:`=> પીળા રંગના`,subData:[]},
      {Title:'આભૂષણો: ',description:`=> સોના અને પોખરાજ ના`,subData:[]},
      {Title:'પ્રાણાયામ: ',description:`=> અનુલોમ વિલોમ, શીત્કારી, શીતલી, ભ્રામરી`,subData:[]},
      {Title:'માતાની સ્થિતિ: ',description:`=> આ મહિનાના અંત સુધી ધીમે ધીમે સ્ત્રીને ઉલટી, ઉબકા, અરુચી વગેરે ઓછા થવા લાગે છે.=> પહેલા ત્રણ મહિના સુધી ગર્ભ એકદમ મજબૂત પણે માતા સાથે  જોડાયેલો ન હોવાથી આ ત્રણ મહિના સુધી શારીરિક સંબંધો રાખવા હિતાવહ નથી .=> આ ઉપરાંત બીજા મહિના દરમિયાન જે કાળજી લેવાની છે તે આ મહિને પણ લેવી.`,subData:[]},
    ]
  }

  const Month4Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Heading 1 ',description:`=> No Data Found`,subData:[]},
    ]
  }

  const Month5Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Baby Development: ',description:`=> પાંચમા મહિને ગર્ભ નું મન વિકાસ પામતો હોય છે => ઉપરાંત સાત ધાતુઓ પૈકી માસ અને રક્ત ધાતુની વિશેષ વૃદ્ધિ થાય છે  => ગર્ભસ્થ શિશુ માતાના સ્પર્શનો પ્રત્યુતર આપે છે => ગર્ભનું હલનચલન પણ માતા સ્પષ્ટ રીતે અનુભવી શકે છે . => બાળકનું યકૃત અને આંતરડા બનવા લાગે છે . => પાંચમાં મહિને ગર્ભની બહાર ફરતી સપાટી vernix caseosa જેનાથી ગર્ભજળ વગેરેથી ગર્ભને હાની અટકે છે.`,subData:[]},
      {Title:'શાસ્ત્રીય વિકાસ: ',description:`=> ભાવ શરીર મન શરીર પાંચમા મહિનામાં મનનું નિર્માણ થતું હોય છે .=> બાળક પોતાના વિચાર કરવા લાગે છે.=> બાળકની પોતાની વિચાર શક્તિ ચાલુ થાય છે.=> મનુષ્યના જીવનમાં શરીરની સાથે મનનું પણ ખૂબ જ મહત્વ રહેલું છે.`,subData:[]},
      {Title:'Book Reading: ',description:`=> મન ઉપર કંટ્રોલ હોવો જરૂરી છે. => બાળકમાં દયા કરુણા શ્રદ્ધા વિશ્વાસ નિષ્ઠા જેવી ક્વોલિટી ડેવલોપ થાય=> પરોપકારી દયાળુ મેઘાવી ધર્મ હેતુ બલિદાન આપવા વાળા બાળકો બુક્સ આરુણી કર્ણ સુદામા પાણીની ઈશ્વરચંદ્ર હરિશ્ચંદ્ર શ્રીનીવાસ રામાનુજન સમ્રાટ અશોક ગોવિંદસિંહ રામસિંહ હકીકત રાય`,subData:[]},
      {Title:'Music: ',description:`=> શિવરંજની રાગની વિશેષતા મધ્યરાત્રીએ ગવાતો રાગ પ્રકૃતિ કરોડ ભક્તિ અને શૃંગાર સક્સેસ થવા માટે મન ઉપર કંટ્રોલ હોવું ખૂબ જ જરૂરી છે ભગવાન શિવનો પોતાના મન ઉપર કંટ્રોલ હતો સુખમાં સુખી ન થઈ જતા દુઃખમાં દુઃખી ન થઈ જતા . આ રાગ સાંભળવાથી શિવની છે મન ઉપર કંટ્રોલ થાય છે મનની વિશાળતા ઉદારતા  સરળતાથી તરલતા દયા વગેરે જેવા ગુણોયુક્ત બાળકનો જન્મ થાય છે`,subData:[]},
      {Title:'વિહાર: ',description:`=> પાંચમા મહિને બાળકનું મન અને માનસિક ભાવો પ્રભાવી આવે એ માટે ઓમકાર ગાયત્રી મંત્રનું ઉચ્ચારણ કરવું પાંચમા મહિને માતાના ભાવો નો અનુભવ કરતું હોય છે આથી માતાએ હંમેશા ખુશ મિજાજ રહેવું જોઈએ માતા કેવી રીતે બોલે છે કેટલા પ્રેમથી બોલે છે કેવો ગુસ્સો કરે છે આ બધું ગર્ભસ્થ શિશુ અનુભવે છે આથી માતાએ અન્ય સાથે બોલવામાં કે બીજા એ વિશે વિચાર કરવામાં વિશેષ જાગૃતિ રાખવી જોઈએ જો માતા ચિંતા કેતાણ અનુભવતી હોય માતાની આસપાસનું વાતાવરણ ભયજનક હોય તો ગર્ભસ્થ શિશુ પણ એ ભાવ અનુભવે છે અને તેનો વિકાસ અટકી જાય છે અને એવા નબળા બાળકો જન્મે છે પ્રસન્ન મધુર વ્યક્તિ વાળી ઈર્ષા મુક્ત પ્રેમાળ સગર્ભા નિશ્ચિતપણે તંદુરસ્ત તેજસ્વી અને બુદ્ધિમાન બાળકને જન્મ આપે છે => આ મહિને મનનો વિકાસ થાય છે મળના ત્રણ પ્રકાર સાત્વિક રાજવી રાજસિક અને કામસિક સાત્વિક અંશ આવે તે માટે ધર્મગ્રંથ હનુમાનચન અને શ્રવણ કરવું થોડા અંશે રાજ્યસિક વૃદ્ધિ આવે એ માટે ચાણક્ય અને મહારાણા પ્રતાપ જેવા ચરિત્રો વાંચવા જોઈએ વસ્ત્ર આભૂષણ સફેદ કે આછા રંગના વસ્ત્રો મોતી અને ચાંદીના આભૂષણો પહેરવા જોઈએ`,subData:[]},
      {Title:'માતાની સ્થિતિ: ',description:`=> સગર્ભાનું પેટ મોટું દેખાવા લાગે છે કોઈ સ્ત્રીમાં પાંચમાં મહિને ગર્ભસ્થ થશે શું અને તેની આસપાસના ગર્ભજળનું વજન વધારે થઈ જવાના કારણે ગર્ભાશયના મુખ પર ખેંચાણ આવી જતા ગર્ભાશયનું મુખ એકાએક ભૂલી જાય છે તેવું બને છે ગર્ભપાતનું જોખમ કાઢવા ગર્ભાશયના મુખ પર ટાંકા લગાવવામાં આવે છે.`,subData:[]},
    ]
  }

  const Month6Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Baby Development: ',description:`=> છઠ્ઠા માસે બાળકની બુદ્ધિનો વિકાસ થાય છે .=> છઠ્ઠા મહિના સુધીમાં ગર્ભસ્થ શિશુના મસ્તિષ્ક નો વિકાસ લગભગ પૂરો થઈ જાય છે; તેથી બુદ્ધિ ગ્રહણ શક્તિ સ્મરણશક્તિ આ બધું આપોઆપ વિકસિત થવા લાગે છે.=> શરીરને કવચની જેમ રક્ષણ આપનારી ત્વચા આ સમયગાળામાં પૂરી તૈયાર થઈ જાય છે.=> બાળકની ત્વચા પર રૂવાડા, માથા પર વાળ; તથા  ભ્રામર અને પોપચા પર પણ કોમળ  વાળ આવવા લાગે છે.=> આંગળાના નખમાં વૃદ્ધિ થવા લાગે છે.=>  શરીરના બધા સ્નાયુઓ અને પેશીઓ ની વૃદ્ધિ થાય છે.=>  બાળકનું હલનચલન વધારે પ્રમાણમાં થવા લાગે છે.=>  છઠ્ઠા મહિને ગર્ભસ્થ શિશુની શ્રવણેન્દ્રિય પુરી કાર્યરત બની જાય છે.=> સુશ્રુત સંહિતા:  આચાર્ય સુશ્રુતના મતે છઠ્ઠા મહિને બાળકમાં બુદ્ધિ વિકસવાની શરૂઆત થાય છે;=>  અને ચરક આચાર્યના મતે બાળકમાં બુદ્ધિ, બળ અને વર્ણ વધુ સ્પષ્ટ રીતે વ્યક્ત થવા માંડે છે.`,subData:[]},
      {Title:'શાસ્ત્રીય વિકાસ: ',description:`=> છઠ્ઠા માસે બાળકમાં બળ ,વર્ણ અને બુદ્ધિનો વિકાસ થાય છે.`,subData:[]},
      {Title:'વિહાર: ',description:`=> છઠ્ઠા માસમાં બાળકની બુદ્ધિનો વિકાસ થતો હોવાથી માતાએ હંમેશા પ્રસન્ન રહેવું.=> ભય ,ગુસ્સો, ક્રોધ ,હિંસા, નિરાશા આ બધી બાબતો તેનામાં ન પ્રવેશે તે માટે સતત કાળજી રાખવી.`,subData:[]},
      {Title:'Activity: ',description:`=> બૌદ્ધિક રમતો રમવી => સુડોકુ , => ચેસ , => શબ્દ પૂર્તિ  કરવી, => ગણિત ગણવું, => સુંદર ચિત્રો દોરવા , => વૈજ્ઞાનિક શોધો, => નવી ખોજ વગેરે વિશે જાણવું, => ડિસ્કવરી ની ચેનલ જોવી , => મગજમારી ,ભેજા મારી વગેરે ચોપડીઓ માંથી કોયડા ઉકેલવા. => ધ્યાન અને ગર્ભ સંવાદ નિયમિતપણે કરવો. => ઇષ્ટદેવની આરાધના કરવી.`,subData:[]},
      {Title:'Book Reading: ',description:`=> જેવું બાળક ઇચ્છતી હોય તેવા પુસ્તકનું વાંચન કરવું. છઠ્ઠા મહિને બાળકની બુદ્ધિનો વિકાસ થાય છે. આથી બાળકમાં આ પ્રકારની ક્વોલિટીનો વિકાસ થાય તેનું ધ્યાન રાખવું જોઈએ.`,subData:[
        {Title:'Qulity: ',description:`=> તર્ક => ચતુરાઈ => ન્યાય => વિવેક => પૃથક્કરણ`},
        {Title:'Topics: ',description:`=> વૈજ્ઞાનિકો જીવન ચરિત્રો => ગણિતશાસ્ત્રીના જીવન ચરિત્રો => શબ્દકોશ => વૈદિક ગણિત => ભારતીય પંચાંગ`},
        {Title:'Types of Books: ',description:`=> જગદીશ ચંદ્ર બોઝ=> એપીજે અબ્દુલ કલામ => આર્યભટ્ટ => રામાનુજન => કલ્પના ચાવડા => સુનિતા વિલિયમ`},
        {Title:'ભગવત ગીતા: ',description:`=> અધ્યાય 16 and 17`},
        {Title:'Video: ',description:`=> વૈદિક ગણિત વિડીયો, સાઇન્ટીસ્ટ વિડીયો, ભારતીય પંચાંગનો અભ્યાસ.`},
      ]},
      {Title:'Music: ',description:`=> છઠ્ઠા માસે બુદ્ધિ તત્ત્વનો વિકાસ થતો હોય છે. => બુદ્ધિ તત્વને સંયમી બનાવવા માટે માતા સરસ્વતી ની ઉપાસના કરવી જોઈએ . => મા સરસ્વતીની ઉપાસનાથી બુદ્ધિ તત્વનું ભવિષ્યમાં પ્રજ્ઞામાં(wisdom) પરિવર્તન થાય છે.`,subData:[]},
      {Title:'વસ્ત્ર: ',description:`=> ભૂખરા કે ગ્રે રંગના વસ્ત્રો પહેરવા.`,subData:[]},
      {Title:'આભૂષણ: ',description:`=> નીલમ.`,subData:[]},
      {Title:'પ્રાણાયામ: ',description:`=> અનુલોમ વિલોમ ,ભ્રામરી ,ઓમકાર, ગાયત્રી મંત્ર.`,subData:[]},
      {Title:'યોગાસન: ',description:`=> વજ્રાસન, તાડાસન, પદ્માસન અને સવાસન.`,subData:[]},
      {Title:'માતા ની સ્થિતિ: ',description:`=> આ મહિને ગર્ભસ્થ શિશુ વૃદ્ધિ પામે છે .=> આથી પેટ થોડું વધુ બહાર આવે છે .=> ગર્ભવતીને વારંવાર ભૂખ લાગે છે .=> વજન વધતું જાય છે .=> પેટની ચામડી ખેંચાતી હોવાથી થોડી કાળી પડે છે .=> અને ઉપર સ્ટ્રેચમાર્ક પડવાની શરૂઆત થાય છે .=> ક્યારેક પેટ પર ખંજવાળ આવે છે .=> ક્યારેક પ્રેગ્નન્સી હોર્મોન્સને કારણે સફેદ પાણી પડે છે.`,subData:[]},
    ]
  }

  const Month7Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Baby Development: ',description:`=> ગર્ભની ત્વચા લાલાશ પડતા રંગની હોય છે . => હવે ત્વચાની નીચે ચરબી નું નિર્માણ શરૂ થાય છે . => બાળકના મગજનો વધારે વિકાસ થાય છે . => ખાસ કરીને થીંકીંગ પાર્ટ એટલે કે વિચાર ક્ષમતા વધે છે . => ફેફસાનો વિકાસ ચાલતો જ હોય છે અને જન્મ પછી જ્યારે શ્વસન ક્રિયા શરૂ થાય છે ત્યારે તેનામાં કોઈપણ ઘર્ષણ ઉત્પન્ન ન થાય એ માટે વિશિષ્ટ દ્રવ્યોનું નિર્માણ શરૂ થાય છે. =>  માતાના પેટ પર હાથ મુકતા બાળકોનું અસ્તિત્વ સ્પર્શથી અનુભવાય છે . => એ જ રીતે ક્યારેક ક્યારેક બાળકના પગનો આકાર પણ અનુભવાય છે . => બાળક આંખોને ખોલ બંધ કરી શકે છે.`,subData:[]},
      {Title:'શાસ્ત્રીય વિકાસ: ',description:`=> આ મહિનો શરીરના અંગોની સુદ્રઢતા માટેનો છે.`,subData:[]},
      {Title:'સુશ્રુત સંહિતા: ',description:`=> સાતમે મહિને ગર્ભના દરેક અવયવ તૈયાર થઈ ગયા હોય છે અને આથી જ આ મહિનામાં પ્રસુતિ થાય તો ગર્ભ જીવી શકે છે .=> પરંતુ તેનું વજન ઓછું હોવાથી તેની વિશિષ્ટ કાળજી રાખવી પડે છે.=> રોગપ્રતિકારક શક્તિ પણ ઓછી હોવાથી બાળકને ખૂબ સાચવવો પડે છે .`,subData:[]},
      {Title:'વિહાર: ',description:`=> ગમે તેવી પરિસ્થિતિમાં હકારાત્મક અભિગમ રાખો .`,subData:[
        {Title:'કલાત્મક વસ્તુઓ બનાવવી જેમ કે: ',description:`=> ચિત્ર દોરવું  => માટી કામ કરવું  => તોરણ બનાવવું  => ભરત કામ કરવું => વિવિધ મોતીઓની માળા બનાવી `},
        {Title:'સર્જનાત્મક પ્રવૃત્તિઓ જેમ કે: ',description:`=> ઘર શણગારવું  => બાગ કામ કરવું => તેમજ પક્ષીઓને ચણ નાખવી  => સંગીત સાંભળવું   => વાજિંત્રોના અવાજ  ઓળખવા`},
      ]},
      {Title:'Book Reading: ',description:`=> આ મહિનો અંગોને સુદ્રઢતા માટેનો છે.`,subData:[
        {Title:'Qulity: ',description:`=> આ મહિને બાળકની Physical Strength Develop થાય છે.=> બાળકની બહાદુરી વધે છે .`},
        {Title:'Topics: ',description:`=> વીર બાળકોની => વાર્તા સાહસિક => બાળકની વાર્તા અને=> પ્રેરક વાર્તા`},
        {Title:'Types of Books: ',description:`=> સ્વામી વિવેકાનંદ => દયાનંદ સરસ્વતી  => મંગલ પાંડે  => ભગતસિંહ ચંદ્રશેખર  => આઝાદ શિવાજી => સુભાષચંદ્ર બોઝ  => શ્રી અરવિંદ  => નાના સાહેબ `},
      ]},
      {Title:'Music: ',description:`=> આ મહિનામાં શરીરના અંગોની સુદ્રઢતા માટેનો છે. => સંગીતમાં રાગ માલ કૌશ સર્વાંગ સંપૂર્ણ રાગ છે . => તેમજ આ રાગ પાંચ સ્વરો સાગમધની થી બને છે. => આ પાંચેય સ્વરોને પંચતત્વ સાથે સંબંધ છે . => જેનાથી શરીર અને પ્રકૃતિ સુદ્રઢ  બને છે. => રાગ માલકૌશ દ્વારા મન શરીર અને આત્માની ગતિ વિધિ વ્યક્ત થાય છે.`,subData:[]},
      {Title:'વસ્ત્ર: ',description:`=> લાલ રંગના વસ્ત્રો પહેરવા . => આછા ગુલાબી અથવા ગુલાબી વસ્ત્રો પણ પહેરી શકાય છે.`,subData:[]},
      {Title:'આભૂષણ: ',description:`=> સોના અને પન્ના ના ઘરેણા પહેરવા.`,subData:[]},
      {Title:'પ્રાણાયામ: ',description:`=> અનુલોમ વિલોમ , ભ્રામરી, ઓમકાર`,subData:[]},
      {Title:'આસન: ',description:`=> વજ્રાસન => તાડાસન => કટીચક્રાસન=> પદ્માસન અને => સવાસન `,subData:[]},
      {Title:'માતાની સ્થિતિ: ',description:`=> બાળકના અવયવોનો પૂરો વિકાસ થવાથી માતાનું પેટ ખૂબ વધી જાય છે .=> આથી ચાલવામાં તકલીફ થાય છે .=> વધેલા વજનને લીધે પણ કેટલીક સમસ્યાઓ સર્જાય છે.=> જેમ કે પગની નસો ફૂલી જાય છે જેને Vericose Vein કહે છે .=> પગમાં કળતર કે દુખાવો થાય છે .=> કેટલીક વાર પગ પર સોજા આવે છે.=> પેટ તથા ગર્ભસ્થ શિશુ નું વજન વધવાથી છાતીમાં બળતરા ,ગળામાં બળતરા ,ખાવાનું ઉપર આવવું, એસીડીટી થવી વગેરે શક્યતા રહે છે.=> ઘણીવાર સાતમા મહિને પગ પરના સોજા ની સાથે બ્લડ પ્રેશર પણ વધવાની શક્યતા રહે છે .=> આવા સમયે ખોરાકમાં મીઠાનું પ્રમાણ સદંતર બંધ કે નહીંવત કરવું; વળી શક્ય હોય તો સાદા મીઠા ની જગ્યાએ સિંધુ મીઠું વાપરવું, અથાણા, પાપડ, સલાડમાં ઉપરથી મીઠું નાખવાની આદત વગેરેથી દૂર રહેવું.`,subData:[]},
    ]
  }

  const Month8Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Baby Development: ',description:`=> બાળકના સ્નાયુ અને માસ પેશીઓનો સંપૂર્ણ વિકાસ થાય છે . => ગર્ભનું મજ્જા તંત્ર સંપૂર્ણપણે તૈયાર થઈ જાય છે. => આ મહિને ગર્ભની ત્વચાની નીચે ચરબી ના સ્તર તૈયાર થઈ જાય છે . => આથી તેની ત્વચા ઠંડીથી રક્ષણ તથા પોષણ મેળવવા માટે સક્ષમ બને છે. => ગર્ભના ફેફસાનો વિકાસ ઝડપથી થતો હોય છે. => અને શ્વસન ક્રિયામાં જરૂરી એવા lecitjin નામક દ્રવ્યોનું નિર્માણ પણ શરૂ થાય છે . => આ  સમયગાળામાં ગર્ભસ્થ શિશુ પોતાના  જન્મની તૈયારી રૂપે માથું નીચે અને પગ ને ઉપરની દિશામાં કરે છે.`,subData:[]},
      {Title:'શાસ્ત્રીય: ',description:`=> ઓજ નામની શક્તિનું બાળક માંથી માતામાં અને માતા બાળકમાં સંચરણ થયા કરે છે. => આ મહિનામાં હું જ વારંવાર ગર્ભના દ્વારા બાળકમાં આવે છે અને પાછું બાળકમાંથી માથામાં આવે છે. => ઑજ એટલે જીવનશક્તિ  => જ્યારે આ શક્તિ બાળકમાં હોય છે ત્યારે તે વધારે પ્રસન્ન અને તાજગી પડ્યું બની જાય છે; પણ માતા ઉદાસ બની જાય છે, થાક અનુભવ લાગે છે . => તેથી ઉલટું માથામાં આ શક્તિ આવે ત્યારે માતા પ્રસન્ન તાજગી સભર સ્ફૂર્તિ વાળી બની જાય છે.  => અને બાળક ઉદાસીન બની જાય છે.`,subData:[]},
      {Title:'સુશ્રુત સહિત: ',description:`=> આઠમા મહિને ઓજસ એટલે કે શરીરને ઉપયોગી એવી તેજ સ્વરૂપ શક્તિ ગર્ભમાં અને ગર્ભવતીમાં વારાફરતી અસ્થિર રહીને ફરતી હોય છે.`,subData:[]},
      {Title:'વિહાર: ',description:`=> રોજ બાળક સાથે ગર્ભ સંવાદ કરવો. => રોજ બાળકને ચોક્કસ સમયે ગીત ભજન કે પ્રાર્થના સંભળાવી . => આ મહિને મુસાફરી બને ત્યાં સુધી ન કરવી . => જે કંઈ વાંચો એ મોઢેથી વાંચવું થી વાંચવું .`,subData:[]},
      {Title:'Book Reading: ',description:`=> આ મહિને Ojas એટલે કે ઓરા અસ્થિર હોય છે .=> આથી આ મહિને પ્રશવ (Delivery) ન થાય તે માટે માતાએ વિશેષ કાળજી રાખવી જોઈએ .`,subData:[
        {Title:'Qulity: ',description:`=> સ્થિરતા => ધીરજ  => શ્રદ્ધા => ધારણ શક્તિ  => તેજસ્વિતા `},
        {Title:'Topics: ',description:`=> સત્યવાદી અને  ઈમાનદાર બાળકોની વાર્તા => ભગવાનમાં વિશ્વાસ રાખનાર બાળકોની વાર્તા`},
        {Title:'Books: ',description:`=> હરિશ્ચંદ્ર => રામ => પ્રહલાદ=> નરસિંહ મહેતા => મીરાબાઈ => સીતાજી => અહલ્યા => અનસુયા => શબરી => ગાર્ગી `},
      ]},
      {Title:'Music: ',description:`=> ગર્ભાધાનનો આઠમો માસ શરીરની સ્થિરતા માટેનો છે. => જ્યારે ઓજનું પરિવહન થાય છે ;ત્યારે શરીરની સ્થિરતા ખૂબ જ જરૂરી છે . => સંગીતમાં રાગ ભિન્નષડજના સ્વરૂપ ના લગાવો પ્લીઝ સ્થિરતા વિશે દર્શન છે દર્શનીય છે આ રાગમાં ઠરાવ છે તેથી આ રાગ સાંભળવું હિતકારી છે સાંભળવો એ તો કરી છે`,subData:[]},
      {Title:'વસ્ત્ર: ',description:`=> કોઈપણ રંગના`,subData:[]},
      {Title:'આભૂષણ: ',description:`=> સોનાના`,subData:[]},
      {Title:'પ્રાણાયામ: ',description:`=> અનુલોમ વિલોમ, ઓમકાર, ગાયત્રી મંત્ર`,subData:[]},
      {Title:'યોગાસન: ',description:`=> તાડાસન, કટી ચક્રાસન, પદ્માસન અને સવાસન.`,subData:[]},
      {Title:'માતાની સ્થિતિ: ',description:`=> આઠમાં મહિનામાં બાળકનું કદ વધવાથી માતાને વધવાથી તેને હલનચલન માટે ઓછી જગ્યા મળે છે . => બાળકને હલનચલન માટે ઓછી જગ્યા મળે છે.=> માતાના શરીરમાં દૂધ બનવાની પ્રક્રિયા પણ શરૂ થાય છે.=> સગર્ભા સ્ત્રીને પગ પર સોજા આવી જાય છે . તેથી લટકતા ન રાખવા .=> બ્લડ પ્રેશર ન વધે તેનું ધ્યાન રાખવું.=> આ તમે ગાળામાં સગર્ભા સ્ત્રીએ વધુ સમય ઊભા ન રહેવું. => વધુ પડતું કામ ન કરવું.=> બાળકનો વિકાસ વધતાં અને પેટ મોટું થવાથી માતાને ખબર ના દુખાવાની ફરિયાદ રહે છે માતાને કમર ના દુખાવાની ફરિયાદ રહે છે.`,subData:[]},
    ]
  }

  const Month9Data={
    videoUrl:"",
    ImageUrl:"",
    content:[
      {Title:'Scientific: ',description:`=> બાળકના સ્નાયુઓનો વિકાસ સંપૂર્ણ થઈ જાય છે.=> હવે બાળક પોતાનું માથું ફેરવી શકે છે અને ઉપાડી શકે છે.=> બાળકના હાથ અને પગના નખ નો  સંપૂર્ણ વિકાસ થઈ જાય છે.=> ગર્ભના મગજમાં રહેલી પેશીઓમાં સંખ્યાત્મક વધારો થાય છે .=> છેલ્લા દિવસોમાં તેના બધા અંગો બરાબર વિકાસ પામે છે.=> જો બાળક male child હોય તો તેના testicle scrotum માં નીચે આવી જાય છે.=> બાળકના મોઢા અને શરીરની ત્વચા કોમળ બની જાય છે.=> હવે બાળક પ્રસ્તુતિ માટે તૈયાર થઈ જાય છે.=> પ્રસ્તુતિની પૂર્વ તૈયારી રૂપે બાળકનું માથું નીચે તરફ આવે છે અને સ્થિર થાય છે.`,subData:[]},
      {Title:'ચરક સંહિતા: ',description:`=> નવમો મહિનો ચાલુ થઈ ગયા પછી ઉપર એક પણ દિવસ ચડી ગયો હોય, તો આઠમા મહિને અસ્થિર રહેતું ઓજ હવે ગર્ભમાં સ્થિર થઈ જાય છે . => અને એ પછી ગમે ત્યારે પ્રસુતિ થાય ત્યારે તે માતા કે ગર્ભ કોઈના માટે નુકસાનકારક નથી, એવું આયુર્વેદ શાસ્ત્ર માને છે.`,subData:[]},
      {Title:'શાસ્ત્રીય વિકાસ: ',description:`=> મન શરીરમાંથી નિર્વાણ શરીર.=> આ મહિનામાં શિશુના દરેક અંગોનું નિર્માણ થઈ ચૂક્યું હોય છે .=> તમામ અંગો શુદ્ધ અને સ્થિર ગયા સ્થિર થઈ ગયા પછી શરણાગતિ દ્વારા ગર્ભસ્થ શિશુની અંતરયાત્રા પૂરી થાય છે.`,subData:[]},
      {Title:'વિચાર (Activity): ',description:`=> મનને પ્રસન્ન રાખવું.=> આ મહિનો બાળકના જન્મ કાળ હોવાથી માતાએ અધિકતર પ્રસન્ન રહેવું.=> બાળક સાથે પ્રેમપૂર્વક વાર્તાલાપ કરવો ગીતો સાંભળવા પોતાની આશા વ્યક્ત કરવી .=> પ્રાકૃતિક ઘટનાઓ માનવી જેમ કે નદીનો પ્રવાહ, વરસાદ, સૂર્યોદય, પુષ્પનું ખીલવું વગેરે.`,subData:[]},
      {Title:'Book Reading: ',description:`=> હવે બાળકને ડીલેવરી માટે રેડી કરવાનું છે.=> બાળકના તમામ અંગ શુદ્ધ અને સ્થિર થઈ ગયા પછી શરણાગતિ દ્વારા ગર્ભસ્થ શિશુની અંતરયાત્રા પૂરી કરવાની છે.`,subData:[
        {Title:'Qulity: ',description:`=> બાળકમાં શરણાગતિ અને સમર્પણ ના ગુણો વિકસાવવાના છે.`},
        {Title:'Topics: ',description:`=> માતા-પિતાના  ભક્ત બાળકોની વાર્તા => ગુરુ ભક્ત બાળકોની વાર્તા => આધ્યાત્મિક વાંચન`},
        {Title:'Types of Book: ',description:`=> એકલવ્ય => ગણેશજી, => શ્રવણ,  => ચંદ્રલેખા  => સત્યકામા => આરુણી => સોમ શર્મા.`},
      ]},
      {Title:'Music: ',description:`=> આ મહિનામાં શિશુ ના દરેક અંગોનું નિર્માણ થઈ ચૂક્યું છે . => શિશુના તમામ અંગો શુદ્ધ અને સ્થિર થઈ ગયા પછી શરણાગતિ દ્વારા ગર્ભસ્થ શિશુની અંતરયાત્રા પૂરી થાય છે. => ભારતીય સંગીતમાં પણ સાધક સંગીતયાત્રાના અંતિમ ચરણમાં રાગ ભૈરવી દ્વારા શરણાગત થાય છે. => રાગ ભૈરવી એ સંપૂર્ણ રાગ છે . => તેથી આ રાગ શરણાગતિની ચરમશીમાં છે. => નવમાં માસે આ રાગના ગીતો સાંભળવાથી ગર્ભસ્થ શિશુમાં શરણાગતિનો ભાવ જન્મે છે.`,subData:[]},
      {Title:'વસ્ત્ર: ',description:`=> ખુલતા ઢીલા સફેદ રંગના વસ્ત્રો પહેરવા.`,subData:[]},
      {Title:'આભૂષણ: ',description:`=> મોતી ચાંદીના અલંકારો પહેરવા.`,subData:[]},
      {Title:'પ્રાણાયામ: ',description:`=> અનુલોમ વિલોમ, ઓમકાર, રામરી પ્રાણાયા`,subData:[]},
      {Title:'યોગાસન: ',description:`=> વજ્રાસન, તાડાસન, કટી ચક્રાસન, પદ્માસન અને સવાસન.`,subData:[]},
      {Title:'માતાની સ્થિતિ: ',description:`=> નવમા મહિને સગર્ભા સ્ત્રીનું પેટ ઘણુ વધી જાય છે.=> બાળક સંપૂર્ણપણે તૈયાર હોવાથી સગર્ભાને ભારેપણું અનુભવાય છે.=> તે જલ્દીથી થાકી જાય છે .=> થોડું કામ કરવાથી કે ચાલવાથી પણ હાફ ચડી જાય છે.=> પ્રસુતિની પૂર્વ તૈયારી રૂપે બાળકોનું માથું નીચે તરફ આવે છે અને સ્થિર થાય છે .=> ગર્ભસ્થ શિશુ નીચે તરફ આવવાથી સ્ત્રીના મૂત્રાશય પર દબાણ આવે છે, અને માતાને વારંવાર પેશાબ કરવા જવાની ઈચ્છા થાય છે .=> ઘણીવાર સફેદ પાણી પડે છે.=> ઊંઘમાં ખલેલ પહોંચે છે.=> આરામથી સુઈ શકાતું નથી .=> કમર પીઠ અને પેટમાં દર્દ થાય છે.=> મોઢામાં પાણી આવે છે અથવા તો ગભરામણ થાય છે.`,subData:[]},
      {Title:'પ્રસુતિના ચિન્હો: ',description:`=>  પેટમાં ધીમો ધીમો દુખાવો થાય. => 20 થી 30 મિનિટે કે દર કલાકે આ દુખાવો પાંચથી દસ સેકન્ડ માટે થાય . => દુખાવા વખતે જાજરૂ કે પેશાબ માટેની ઈચ્છા થાય. => પેટ કડક થાય . => સફેદ પાણી કે લોહી નીકળે .`,subData:[]},
      {Title:'માતાની મનની સ્થિતિ: ',description:`=> જેમ જેમ પ્રસુતિના દિવસો નજીક આવતા જાય છે .=> તેમ તેમ સગર્ભા ચિંતાતુર બને છે.=> તેમાં જો પ્રથમ પ્રસુતિ હોય તો પ્રસુતિની પીડાની કલ્પનાથી ગભરાઈ જાય છે .=> મનોબળ મજબૂત રાખવું જોઈએ.=> પોતાના ઉત્તમ બાળકની કલ્પના અને એ હવે ગણતરીના દિવસોમાં પોતાના ખોળામાં રમતું હશે, તેવી ભાવિ સુખદ કલ્પનાથી વર્તમાન ભય અને ચિંતા ને હટાવી દેવા જોઈએ.=> સાથે સાથે બાળકના આગમન માટેની પૂરી તૈયારી કરી લેવી જોઈએ.`,subData:[]},
    ]
  }