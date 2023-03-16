import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Tab, TabBar, Text } from '@ui-kitten/components';
import { moderateScale, scale, verticalScale } from '../../utils/scalling';
import { vertical } from 'react-native-swiper-flatlist/src/themes';
import { Image } from 'react-native';
import images from '../../../assets';

const MoniterScreen = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const renderTab = (title,ind) => (
        <Tab
          title={title}
          titleStyle={styles.tabTitle}
          style={selectedIndex===ind?styles.tabSelected:styles.tab}
        //   selectedStyle={styles.tabSelected}
        />
    );

  return (
    <View style={{marginTop:scale(30)}}>
        <TabBar
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
            style={styles.tabBar}
            indicatorStyle={styles.tabIndicator}
            tabStyle={styles.tabContainer}
        >
            {renderTab('BABY',0)}
            {renderTab('MOM',1)}
        </TabBar>

        <View style={styles.babyCardView}>
            <Text style={styles.lightText} category='p2'>Baby's approximate size:</Text>
            <Text style={styles.dateFirstText} category='h6'>AVOCADO</Text>
            
            <View style={{paddingHorizontal:scale(20),flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={styles.lightText2} category='p2'>Weight</Text>
                    <Text style={styles.dateFirstText2} category='h6'>100 g</Text>
                </View>
                <View>
                    <Image style={{width:moderateScale(150),height:verticalScale(150)}} source={images.baby1} resizeMode={'contain'} />
                </View>
                <View>
                    <Text style={styles.lightText2} category='p2'>Length</Text>
                    <Text style={styles.dateFirstText2} category='h6'>11,6 cm</Text>
                </View>
            </View>
            <View>
                <Text style={styles.lightText3} category='p2'>What's going on?</Text>
                <Text style={styles.dateFirstText3} category='h6'>
                    The baby is playing with the umbilical cord,
                    grabbing and releasing it. The taste buds
                    and bones are developing, and in girls the
                    ova are forming.
                </Text>
            </View>
        </View>
    </View>
  )
}

export default MoniterScreen

const styles = StyleSheet.create({
    tabBar: {
        width:moderateScale(250),
        marginLeft:scale(20),
        flex:1
    },
    tabContainer: {
      padding: 10,
      borderRadius: 20,
    },
    tab: {
        backgroundColor:'#ffffff',
        height:verticalScale(50),
        borderTopLeftRadius:scale(20),
        borderTopRightRadius:scale(20),
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2,
    },
    tabSelected: {
        backgroundColor:'#ffffff',
        height:verticalScale(50),
        borderTopLeftRadius:scale(20),
        borderTopRightRadius:scale(20),
        shadowColor: "#FB2576",
        shadowOffset:{
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 20,
    },
    tabTitle: {
      color: 'white',
    },
    tabIndicator: {
        borderWidth:0,
        backgroundColor: 'transparent',
    //   height: 5,
    //   borderRadius: 5,
    },

    babyCardView:{
        width:moderateScale(320),
        paddingBottom:scale(15),
        backgroundColor:'#ffffff',
        marginTop:scale(-4),
        marginLeft:scale(20),
        borderBottomLeftRadius:scale(20),
        borderBottomRightRadius:scale(20),
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 20,
    },
    lightText:{
        fontSize:scale(20),
        marginLeft:scale(10),
        color:"#6B728E",
        alignSelf:'center',
        marginTop:scale(10)
    },
    dateFirstText:{
        fontSize:scale(24),
        color:"#474E68",
        alignSelf:'center',
        marginTop:scale(5)
    },
    lightText2:{
        fontSize:scale(18),
        color:"#6B728E",
        marginTop:scale(50)
    },
    dateFirstText2:{
        fontSize:scale(24),
        color:"#474E68",
        marginTop:scale(5)
    },
    lightText3:{
        fontSize:scale(18),
        color:"#6B728E",
        marginTop:scale(20),
        marginLeft:scale(20)
    },
    dateFirstText3:{
        fontSize:scale(18),
        color:"#474E68",
        marginTop:scale(5),
        marginLeft:scale(20)
    },
});