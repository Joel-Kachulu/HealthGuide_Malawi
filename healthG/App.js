import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from "@react-navigation/native"
import { FONTS } from './constants/fonts'; 
import { useCallback } from 'react';
import { Login, Signup, Welcome, Home, Htips, Profile, ComReport, Notifications, Statistics } from './screens';
import { Provider } from 'react-redux'
import { store } from './store/store'

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);

  const onLayoutRootView = useCallback(async ()=>{
    if(fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  },[fontsLoaded])

  if(!fontsLoaded) {
    return null;
  }

  return ( 
    <Provider store={store}>
   <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Htips" component={Htips}/>
        <Stack.Screen name="Notifications" component={Notifications}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Statistics" component={Statistics}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  </SafeAreaProvider>
  </Provider>
  );
}

