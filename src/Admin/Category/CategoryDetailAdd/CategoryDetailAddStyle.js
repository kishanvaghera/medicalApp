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
        height:wp(14),
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
    boxHead:{
        marginLeft:wp(8),
        marginTop:wp(3),
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
        top:wp(4)
    },
    submitBtn:{
        width:wp(30),
        backgroundColor:theme.primaryDark,
        paddingTop:wp(3),
        paddingBottom:wp(3),
        borderRadius:wp(2),
        marginTop:wp(5)
    },
    submitBtnText:{
        color:theme.BgWhite,
        alignSelf:'center',
        fontSize:18,
    },
    dropDownView: {
        width: wp(80),
        height: 40,
        marginTop: 20,
        color: '#000',
        justifyContent: 'center',
        borderWidth: 0.8,
        borderColor: '#808080',
        borderRadius: 10,
        paddingLeft: 5,
      },
      dropDownText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
      },
      chooseFile:{
        marginTop:wp(3),
        width:wp(55),
        height:wp(15),
        backgroundColor:'#a276e9',
        borderRadius:wp(2),
        flexDirection:'row'
      },
      radioButton:{
        width:wp(4),
        backgroundColor:'#E80F88',
        padding:wp(5),
        alignSelf:'center',
        borderRadius:wp(5)
      },
      radioButtonActive:{
        width:wp(4),
        backgroundColor:'#790252',
        padding:wp(5),
        alignSelf:'center',
        borderRadius:wp(5)
      }
})

export default styles