import { Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Icon = (props) => {
  return (
    <Text>
        {
            props.LibraryName=='FontAwesome'?
            <FontAwesome name={props.IconName} size={props.IconSize} color={props.IconColor} solid={props?.solid}/>
            :""
        }
        {
            props.LibraryName=='FontAwesome5'?
            <FontAwesome5 name={props.IconName} size={props.IconSize} color={props.IconColor} solid={props?.solid}/>
            :""
        }
        {
            props.LibraryName=='MaterialCommunityIcons'?
            <MaterialCommunityIcons name={props.IconName} size={props.IconSize} color={props.IconColor} solid={props?.solid}/>
            :""
        }
        {
            props.LibraryName=='SimpleLineIcons'?
            <SimpleLineIcons name={props.IconName} size={props.IconSize} color={props.IconColor} solid={props?.solid}/>
            :""
        }
         {
            props.LibraryName=='Feather'?
            <FeatherIcon name={props.IconName} size={props.IconSize} color={props.IconColor} solid={props?.solid}/>
            :""
        }
    </Text>
  )
}

export default Icon