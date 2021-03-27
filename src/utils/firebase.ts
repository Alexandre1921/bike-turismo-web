/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

if (firebase.apps.length === 0) {
    console.log(process.env.serviceAccount);
    firebase.initializeApp(process.env.serviceAccount!);
}

export const db = firebase.firestore();

export const auth = firebase.auth();

export default firebase;
