import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Colors as theme}  from '../adminTheme';

const styles = StyleSheet.create({
    mainScreen:{
        marginTop: wp(8),
        padding:wp(5)
    },
    mainTitle:{
        alignSelf:'center',
        fontSize:25,
        fontWeight:'800',
        color:theme.primaryDark,
    },
    boxRows:{
        marginTop:wp(5),
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    boxCard:{
        width:wp(42),
        height:wp(42),
        marginBottom:wp(5),
        backgroundColor:theme.BgWhite,
        borderRadius:wp(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        justifyContent:'center',
        alignContent:'center'
    },
    boxCardText:{
        fontSize:25,
        fontWeight:'800',
        alignSelf:'center',
        color:theme.TextColor,
        textAlign:'center'
    }
})

export default styles