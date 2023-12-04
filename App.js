import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, View} from 'react-native';
import PlannerAPI from './services/planner-firebase-service'
import { DataType } from './types/day.type';
import React, {useState, useEffect} from 'react';
import Activities from './dataTest';
import MenuBar, {HomeScreen, SettingsScreen,DetailsScreen, ActivityScreen, PresetScreen} from './menuBar'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import { View, Text, Button } from 'react-native';
// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function App(props) {
  
  return (
    <>
    {/* <MenuBar></MenuBar> */}
      <NavigationContainer>
        
        {/* <Stack.Navigator> */}
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Details" component={DetailsScreen} />
          <Drawer.Screen name="Activities" component={ActivityScreen} />
          <Drawer.Screen name="Presets" component={PresetScreen} />
          <Drawer.Screen name="Settings">
            {(props) => <SettingsScreen {...props} extraData={"someData"} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    
       {/* <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
              title:"MenuBar title"
            }}
            /> */}
        {/* <Tab.Screen name="Settings" component={SettingsScreen} />  */}
      
  
    </>
  );
}
// export function DefaultScreen({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app! TOday</Text>
//       <StatusBar style="auto" />
//       <DataTest name={''}></DataTest>
//     </View>
//   );
// }
// DefaultScreen.navigationOptions = {
//   title: 'Default',
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Details" component={DetailsScreen} />
//     </Stack.Navigator>
//   );
// }
