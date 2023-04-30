import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig={
    apiKey: "AIzaSyAO9bcpju6Mg65g2TArpgkQuMLpHgEqcUA",
    authDomain: "geetagarbhasanskar.firebaseapp.com",
    projectId: "geetagarbhasanskar",
    storageBucket: "geetagarbhasanskar.appspot.com",
    messagingSenderId: "973876527525",
    appId: "1:973876527525:web:1fad75da0bd60f503fa84c",
    measurementId: "G-GE3DHR19SM"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}