import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Colors as theme}  from '../../adminTheme';

const styles = StyleSheet.create({
    mainScreen:{
        marginTop: wp(8),
        padding:wp(5)
    },
    headTitle:{
        marginTop:wp(5)
    }
})

export default styles