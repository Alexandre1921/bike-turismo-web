/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import serviceAccount from '../service-account-file.json';

if (firebase.apps.length === 0) {
    firebase.initializeApp(serviceAccount);
}

export const db = firebase.firestore();

export const auth = firebase.auth();

export default firebase;
