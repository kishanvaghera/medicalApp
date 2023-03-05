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
        paddingBottom:wp(3),
        paddingTop:wp(2)
    },
    boxInner:{
        flexDirection:'row',
    },
    boxHead:{
        marginLeft:wp(8),
    },
    boxHeadTitle:{
        width:wp(60),
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
        right:wp(4),
        top:wp(3),
    },
    boxButtonRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:wp(15),
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