import * as firebase from 'firebase'
import 'firebase/auth'

import { FirebaseConfig } from './keys'

if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

const FirebaseDB = firebase.database()
const Storage = firebase.storage().ref()

const dbRef = FirebaseDB.ref()

// Referência direta para 'eventos'
const eventosRef = dbRef.child('eventos')

const FirebaseAuth = firebase.auth()

export { FirebaseDB, eventosRef, FirebaseAuth, Storage }