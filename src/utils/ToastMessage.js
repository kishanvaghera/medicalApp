import Toast from 'react-native-toast-message';

export function ToastMessage(status,message) {
    if(status==1){
        Toast.show({
            type: 'success',
            text1: message,
            text2:""
          });
    }else{
        Toast.show({
            type: 'error',
            text1: message,
            text2:""
          });
    }
}
