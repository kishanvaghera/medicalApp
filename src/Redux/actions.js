import {LoginSucess,Logout, UserData} from './constants';

export const LoginSucessActs = text =>{
    return {
        type:LoginSucess,
        payload:text
    }
}

export const LogoutActs = text => {
    return {
        type:Logout
    }
}

export const UserDataActs = text => {
    return {
        type:UserData
    }
}