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
        height:wp(30),
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
    },
    boxInner:{
        flexDirection:'row',
    },
    boxImage:{
        marginLeft:wp(2),
        marginTop:wp(2),
        height:wp(25),
        width:wp(25),
        backgroundColor:theme.primaryLight,
        borderRadius:wp(5)
    },
    boxHead:{
        marginLeft:wp(2),
        marginTop:wp(2),
    },
    boxHeadTitle:{
        fontSize:20,
        fontWeight:'500',
        color:theme.primaryDark,
    },
    boxHeadDesc:{
        width:wp(58),
        fontSize:15,
        fontWeight:'500',
        color:theme.primaryLight,
    },
    boxEditButton:{
        position:'absolute',
        right:wp(3),
        top:wp(2)
    }
})

export default styles