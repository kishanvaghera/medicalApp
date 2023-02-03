import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Icon from './Icon'
import { Input } from '../Layouts'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useState,useEffect } from 'react'

const evenOddNumber=(number)=>{
    if(number % 2==0){
      return styles2.grayBackground
    }else{
      return styles2.grayWhiteBg
    }
}

const DropDownCommon = (props) => {
    
    const [SearchString,setSearchString]=useState("");

    const [filterList,setFilterList]=useState([]);

    useEffect(() => {
    if(SearchString==""){
        setFilterList([...props.data]);
    }else{
        const filterData=props.data.filter((curEle,index)=>{
        let upperCase1=new String(curEle.label).toUpperCase();
        let upperCase2=new String(SearchString).toUpperCase();
        return upperCase1.includes(upperCase2)
        })
        setFilterList([...filterData]);
    }
    return () => {}
    }, [SearchString,props.data])

    useEffect(()=>{
    if(!props.modalVisible){
        setSearchString("");
    }
    },[props.modalVisible])

  return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
              props.setModalVisible(!props.modalVisible);
            }}>
            <View style={styles2.centeredView}>
              <View style={styles2.modalView}>
                <View style={styles2.searchBox}>
                  <View style={styles2.searchIcon}>
                      <Icon IconName='search' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'#a2a2af'}/>
                  </View>
                  <View>
                      <Input
                        placeholder={'Search'}
                        onChangeText={(text) => setSearchString(text)}
                        keyboardType={'text'}
                        value={SearchString}
                        multiline={false}
                        returnKeyType={'next'}
                        inputContainerStyle={{
                          width:wp(70),
                          marginTop:wp(3),
                          borderRadius:0,
                          borderColor:'transparent',
                        }}
                        inputStyle={{fontSize:18,color:'#5f5f75',paddingBottom:wp(3)}}
                      />
                  </View>
                  <TouchableOpacity onPress={()=>props.setModalVisible(!props.modalVisible)} style={styles2.searchIcon}>
                      <Icon IconName='close' LibraryName='FontAwesome' IconSize={wp(10)} IconColor={'#a2a2af'}/>
                  </TouchableOpacity>
                </View>
                <View style={styles2.mainContaint}>
                  <ScrollView contentContainerStyle={{paddingBottom:0,paddingLeft:1,paddingRight:5}}>
                    {
                      filterList.map((curEle,index)=>{
                        return <TouchableOpacity onPress={()=>props.handleCheck(curEle,props.fieldName)} key={index} style={[styles2.rows,evenOddNumber(index)]}>
                                  <View style={styles2.textRows}>
                                    <Text style={styles2.dropText}>{curEle.label}</Text>
                                    {
                                      props.selectedVal==curEle.value?
                                      <Text style={styles2.CheckIcon}>
                                        <Icon IconName='check-circle' LibraryName='FontAwesome5' IconSize={wp(8)} IconColor={'#32324e'}/>
                                      </Text>
                                      :""
                                    }
                                  </View>
                                </TouchableOpacity>
                      })
                    }
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
  )
}

export default DropDownCommon

const styles2 = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'rgba(52, 52, 52, 0.9)',
      height:'100%',
      width:wp(100),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      paddingTop:wp(5),
      shadowOpacity: 0.1,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    searchBox:{
      width:wp(100),
      height:wp(19),
      backgroundColor:'#ffffff',
      position:'absolute',
      padding:wp(2),
      flexDirection:'row'
    },
    searchIcon:{
      width:wp(15),
      height:wp(15),
      marginTop:wp(2)
    },
    rows:{
      // position:'relative',
      width:wp(100),
      height:wp(15),
      backgroundColor:'red'
    },
    mainContaint:{
      marginTop:wp(14)
    },
    grayBackground:{
      backgroundColor:'#e4e2ef'
    },
    grayWhiteBg:{
      backgroundColor:'#f1effc'
    },
    dropText:{
      fontSize:20,
      fontWeight:'600',
      color:'#32324e',
      marginLeft:wp(3),
      marginTop:wp(3),
      width:wp(85),
    },
    textRows:{
      width:wp(100),
      flexDirection:'row'
    },
    CheckIcon:{
      marginTop:wp(3)
    }
  });