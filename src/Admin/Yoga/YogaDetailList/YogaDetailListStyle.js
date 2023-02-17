import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Colors as theme}  from '../../adminTheme';

const styles = StyleSheet.create({
    mainScreen:{
        marginTop: wp(10),
        padding:wp(5)
    },
    mainTitle:{
        fontSize:25,
        fontWeight:'800',
        color:theme.primaryDark,
    },
    boxRows:{
        marginTop:wp(6),
    },
    boxCard:{
        borderRadius:wp(5),
        paddingBottom:wp(3),
        width:wp(90),
        backgroundColor:theme.BgWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    boxInner:{
        flexDirection:'row',
        width:wp(80),
        paddingLeft:wp(4),
        justifyContent:'flex-start'
    },
    boxImage:{
        marginTop:wp(2),
        height:wp(25),
        width:wp(25),
        borderRadius:wp(5),
        resizeMode:'cover',
    },
    boxHead:{
        marginLeft:wp(5),
        marginTop:wp(2),
    },
    boxHeadTitle:{
        fontSize:20,
        fontWeight:'500',
        color:theme.primaryDark,
        width:wp(40)
    },
    boxHeadDesc:{
        width:wp(58),
        fontSize:15,
        fontWeight:'500',
        color:theme.primaryLight,
    },
    boxEditButton:{
        width:wp(8),
        top:wp(4),
        marginRight:wp(4)
    },
    boxDelButton:{
        width:wp(8),
        top:45,
        right:6,
        position:'absolute'
    },
    tophead:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    TopHeadBtn:{
        marginTop:wp(2)
    }
})

export default styles