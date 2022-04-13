import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDjAViNby6c5nRpMXKTJ-WsTthOkOQ6Wys",
    authDomain: "social1-2acf0.firebaseapp.com",
    databaseURL: "https://social1-2acf0-default-rtdb.firebaseio.com",
    projectId: "social1-2acf0",
    storageBucket: "social1-2acf0.appspot.com",
    messagingSenderId: "331039890173",
    appId: "1:331039890173:web:2b5a2e0db43997a0d27c94",
    measurementId: "G-DHE2FYZG8Q"
};


if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export { auth, db, storage, serverTimestamp }