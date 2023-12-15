import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import {
  HomeScreen,
  SettingsScreen,
  StatisticsScreen,
  ActivityScreen,
  PresetScreen,
  LoginScreen,
  UsersScreen,
} from "./Components/MenuScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import auth from "@react-native-firebase/auth";

// import { View, Text, Button } from 'react-native';
// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function App(props) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // if (initializing) return null;

  // if (!user) {
  //   return (
  //     <View>
  //       <Text>Login</Text>
  //     </View>
  //   );
  // }

  return (
    // <main>
    <>
      {/* <MenuBar></MenuBar> */}
      <NavigationContainer>
        {/* <Stack.Navigator> */}
        <Drawer.Navigator initialRouteName={user ? "Home" : "Login"}>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ drawerItemStyle: { display: user ? "flex" : "none" } }}
          />
          <Drawer.Screen
            name="Users"
            component={UsersScreen}
            options={{ drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{ drawerItemStyle: { display: user ? "flex" : "none" } }}
          />
          <Drawer.Screen
            name="Activities"
            component={ActivityScreen}
            options={{ drawerItemStyle: { display: user ? "flex" : "none" } }}
          />
          <Drawer.Screen
            name="Presets"
            component={PresetScreen}
            options={{ drawerItemStyle: { display: user ? "flex" : "none" } }}
          />
          <Drawer.Screen
            name="Settings"
            options={{
              drawerItemStyle: { display: user ? "flex" : "none" },
            }}
          >
            {(props) => (
              <SettingsScreen
                {...props}
                authuser={user}
                extraData={"someData"}
              />
            )}
          </Drawer.Screen>
          <Drawer.Screen
            name="Login"
            options={{ title: user ? "Logout" : "Login" }}
          >
            {(props) => <LoginScreen {...props} authUser={user} />}
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
    // </main>
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
