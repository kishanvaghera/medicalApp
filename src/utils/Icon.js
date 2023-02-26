import { Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Icon = (props) => {
  return (
    <Text>
        {
            props.LibraryName=='FontAwesome'?
            <FontAwesome name={props.IconName} size={props.IconSize} color={props.IconColor} />
            :""
        }
        {
            props.LibraryName=='FontAwesome5'?
            <FontAwesome5 name={props.IconName} size={props.IconSize} color={props.IconColor} />
            :""
        }
        {
            props.LibraryName=='MaterialCommunityIcons'?
            <MaterialCommunityIcons name={props.IconName} size={props.IconSize} color={props.IconColor} />
            :""
        }
    </Text>
  )
}

export default Icon