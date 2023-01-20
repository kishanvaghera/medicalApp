import {LoginSucess,Logout} from './constants';

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