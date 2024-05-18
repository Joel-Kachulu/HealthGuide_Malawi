import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { browserSessionPersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


let firebaseApp

export const getFirebaseApp = () => {
    if(firebaseApp){
      return firebaseApp
    }

    // firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBUEnqE7qLeqAPpJ9wkSF8H9rDbG1x_dwk",
        authDomain: "healthguide-146f1.firebaseapp.com",
        databaseURL: "https://healthguide-146f1-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "healthguide-146f1",
        storageBucket: "healthguide-146f1.appspot.com",
        messagingSenderId: "589619914321",
        appId: "1:589619914321:web:16d0bc6f163ccb324d7a70",
        measurementId: "G-F91P3HFP9J"
    };
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

    // initialize firebase auth with react native persistence
    //initializeAuth(app, {
      //persistence: getReactNativePersistence(ReactNativeAsyncStorage)
      //initializeAuth(app, { persistence: browserSessionPersistence });
    //})

    firebaseApp = app;

    return app;
  };




