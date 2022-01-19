import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAyHTc-SNVaBIcK3aHAonIpAm3UkbOuP2M',
  authDomain: 'olyupexerciseproperties.firebaseapp.com',
  projectId: 'olyupexerciseproperties',
  storageBucket: 'olyupexerciseproperties.appspot.com',
  messagingSenderId: '384826181907',
  appId: '1:384826181907:web:f50ad71cd89fce1d7032e6',
  measurementId: 'G-B8MSKFBLCH',
};

const app = initializeApp(firebaseConfig);

export default app;
