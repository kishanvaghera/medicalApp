import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'
import { Header, Main } from '../../Layouts';
import { Loader } from '../../Components';
import { scale } from '../../utils/scalling';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import RoutName from '../../Routes/RoutName';

const Live = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [ForYouDataArr,setForYouDataArr]=useState([]);
  const [PlanPreg,setPlanPreg]=useState([]);
  const [LiveData,setLiveData]=useState([]);
  useEffect(()=>{ 
    setLoading(true);
    const postData={action:"getWorkShopList"}
    APIService.apiAction(postData, apiUrls.workshop).then(res => {
      setLoading(false);
        if (res.status == 200) {
          const filterData=res.data.filter((curEle,index)=>{
            return curEle.eType=="ForYou";
          })
          setForYouDataArr([...filterData]);

          const filterPlanData=res.data.filter((curEle,index)=>{
            return curEle.eType=="Planning" || curEle.eType=="Pregnant";
          })
          setPlanPreg([...filterPlanData]);

          const filterLiveData=res.data.filter((curEle,index)=>{
            return curEle.eType=="Live";
          })
          setLiveData([...filterLiveData]);
        } else {
          setForYouDataArr([]);
        }
    })
  },[])

  const clickToRedirect=(tLink)=>{
      if(tLink!=""){
          Linking.openURL(tLink);
      }
  }

  return (
      <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header title={'Workshop'} />
        </SafeAreaView>
        <Main>
          <View style={styles.mainTab}>
            <TouchableOpacity style={{...styles.TabContent,...selectedIndex==1?{}:{borderBottomWidth:0}}} onPress={()=>setSelectedIndex(1)}>
              <Text style={styles.TabContTxt}>For You</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.TabContent,...selectedIndex==2?{}:{borderBottomWidth:0}}} onPress={()=>setSelectedIndex(2)}>
              <Text style={styles.TabContTxt}>Planning / Pregnant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.TabContent,...selectedIndex==3?{}:{borderBottomWidth:0}}} onPress={()=>setSelectedIndex(3)}>
              <Text style={styles.TabContTxt}>Live</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom:scale(120),paddingTop:scale(10)}} >
                
              <View style={{width:wp('90%'),alignSelf:'center'}}>
                {
                  selectedIndex==2?
                    <View style={styles.boxRows}>
                      {
                        PlanPreg.map((curEle,ind)=>{
                          return <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate(curEle?.subData?.length>0?RoutName.LiveSubData:RoutName.LiveMainData,curEle)} style={styles.mainBox} key={ind}>
                                    <Image source={{uri:curEle.tImage}} style={styles.imageBox} resizeMode='cover'/>
                                    <Text style={styles.mainBoxTxt}>
                                      {curEle.tWorkShopTItle}
                                    </Text>
                                  </TouchableOpacity>
                        })
                      }
                    </View>:""
                }

                {
                  selectedIndex==3?<View>
                    {
                      LiveData.map((curEle,ind)=>{
                        return  <TouchableOpacity activeOpacity={0.9} onPress={()=>clickToRedirect(curEle.tZoomLink)}>
                                  <View style={styles.boxRows2} key={ind}>
                                    <View style={styles.mainBox2}>
                                      <Image source={{uri:curEle.tImage}} style={styles.imageBox2} resizeMode='cover'/>
                                      <Text style={styles.mainBoxTxt2}>
                                        {curEle.tWorkShopTItle}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                      })
                    }
                  </View>:""
                }
                
                {
                  selectedIndex==1?<View>
                    {
                      ForYouDataArr.map((curEle,ind)=>{
                        return  <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate(curEle?.subData?.length>0?RoutName.LiveSubData:RoutName.LiveMainData,curEle)} style={styles.boxRows2} key={ind}>
                                  <View style={styles.mainBox2}>
                                    <Image source={{uri:curEle.tImage}} style={styles.imageBox2} resizeMode='cover'/>
                                    <Text style={styles.mainBoxTxt2}>
                                      {curEle.tWorkShopTItle}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                      })
                    }
                  </View>:""
                }
              </View>
          </ScrollView>
        </Main>
      </View>
  )
}

export default Live;
const styles = StyleSheet.create({
  mainBox:{
    width:wp('42%'),
    backgroundColor:'white',
    borderRadius:scale(10),
    marginBottom:scale(20),
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  boxRows:{
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap'
  },
  imageBox:{
    width:wp('42%'),
    height:hp('15%'),
    borderTopLeftRadius:scale(10),
    borderTopRightRadius:scale(10)
  },
  mainBoxTxt:{
    width:wp('40%'),
    fontSize: RFPercentage(1.8),
    fontFamily: 'Lato_400Regular',
    paddingHorizontal:scale(5),
    paddingVertical:scale(5),
    textAlign:'center',
    lineHeight:scale(15)
  },
  boxRows2:{
  },
  mainBox2:{
    width:wp('90%'),
    backgroundColor:'white',
    borderRadius:scale(10),
    marginBottom:scale(20),
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  imageBox2:{
    width:wp('90%'),
    height:hp('25%'),
    borderTopLeftRadius:scale(10),
    borderTopRightRadius:scale(10)
  },
  mainBoxTxt2:{
    width:wp('90%'),
    fontSize: RFPercentage(1.8),
    fontFamily: 'Lato_400Regular',
    paddingHorizontal:scale(5),
    paddingVertical:scale(5),
    textAlign:'center',
    lineHeight:scale(15)
  },
  mainTab:{
    width:wp('90%'),   
    height:hp('7%'),
    marginTop:scale(10),
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  TabContent:{
    width:wp('30%'),
    paddingVertical:scale(5),
    borderBottomWidth:scale(5),
    borderBottomColor:'#0B4E98'
  },
  TabContTxt:{
    textAlign:'center',
    fontSize: RFPercentage(1.8),
    fontFamily: 'Lato_700Bold',
    color:'#0B4E98'
  }
});