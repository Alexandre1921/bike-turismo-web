/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

if (firebase.apps.length === 0) {
    // @ts-ignore
    firebase.initializeApp(process.env.secrets.FIREBASE_SERVICE_ACCOUNT_BIKE_TURISMO);
}

export const db = firebase.firestore();

export const auth = firebase.auth();

export default firebase;
