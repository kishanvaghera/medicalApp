import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

import { Input, Button } from '../../Layouts';
import RoutName from '../../Routes/RoutName';


const OtherDetails = ({ navigation }) => {

    const [hight, setHight] = useState('');
    const [weight, setWeight] = useState('');
    const [pWeek, setPWeek] = useState('');

    const [date, setDate] = useState('');
   
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
       setDate(Moment(currentDate).format('DD-MM-YYYY'));
        // console.log(Moment(currentDate).format('DD-MM-YYYY'))
       // yyyy-MM-dd'T'HH:mm:ssZ
    };
    
    return (
        <View style={styles.body}>
            <View style={styles.formContaner}>
                <Text style={[styles.boldText, { marginTop: 20 }]}>Other Detils</Text>
                <Text style={styles.lableText}>This Information is not required,</Text>
                <Text style={styles.lableText}>you may skip also.</Text>

                <TouchableOpacity 
                onPress={() => setShow(true)}
                style={styles.dropDownView}>
                    <Text style={styles.dropDownText}>{date == '' ? 'Data of Brith' : ''+date}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={'date'}
                        is24Hour={true}
                        format="DD-MM-YYYY"
                        onChange={onChange}
                    />
                )} 
                <Input
                    placeholder={'Hight'}
                    onChangeText={(text) => setHight(text)}
                    value={hight}
                    keyboardType={'numeric'}
                    multiline={false}
                    returnKeyType={'next'}
                />
                <Input
                    placeholder={'Weight'}
                    onChangeText={(text) => setWeight(text)}
                    value={weight}
                    keyboardType={'numeric'}
                    multiline={false}
                    returnKeyType={'next'}
                />
                <View style={styles.dropDownView}>
                    <Text style={styles.dropDownText}>Add Your Dou Date</Text>
                </View>
                <Input
                    placeholder={'Add Your Pregnancy Week'}
                    onChangeText={(text) => setPWeek(text)}
                    value={pWeek}
                    keyboardType={'numeric'}
                    multiline={false}
                    returnKeyType={'next'}
                />

                <Button
                    width={wp(55)}
                    height={40}
                    title={'Submit'}
                    buttonStyle={{ marginTop: 30 }}
                    customClick={() => navigation.navigate(RoutName.LOGIN)} />

                <TouchableOpacity style={{ marginTop: 15 }}
                    onPress={() => navigation.navigate(RoutName.LOGIN)}>
                    <Text style={[styles.boldText, { fontSize: 15 }]}>SKIP</Text>
                </TouchableOpacity>
               

            </View>
        </View>
    );
}
export default OtherDetails;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    formContaner: {
        width: '100%',
        paddingHorizontal: '10%',
        alignItems: 'center',
        marginTop: '10%'
    },
    boldText: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    lableText: {
        fontSize: 20,
        fontWeight: '400'
    },
    dropDownView: {
        width: wp(80),
        height: 40,
        marginTop: 20,
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
});