import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

import auth from "@react-native-firebase/auth";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Activities,
  Statistics,
  Login,
  Presets,
  UserData,
  Users,
} from "../classHandler";
import { Divider } from "react-native-paper";
// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// export function MenuBar() {
//   return (
// <NavigationContainer>

// <Stack.Navigator>

// <Stack.Screen name="Home" component={HomeScreen} />
// <Stack.Screen name="Details" component={DetailsScreen} />
// <Stack.Screen name="Activities" component={ActivityScreen} />
// <Stack.Screen name="Presets" component={PresetScreen} />
// <Stack.Screen name="Settings">
//   {(props) => <SettingsScreen props={undefined} {...props} extraData={"someData"} />}
// </Stack.Screen>

// </Stack.Navigator>

//    </NavigationContainer>
//   );
// }
export function HomeScreen({ navigation, authUser }) {
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
    >
      {/* <View>
        <Text>Home Screen</Text>
      </View> */}
      <View
        style={{
          margin: 30,
          columnGap: 12,
          rowGap: 15,
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <View style={{ justifyContent: "flex-start", flexGrow: 4 }}>
          <Pressable
            onPress={() => navigation.navigate("Statistics", { itemId: 123 })}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View>
                <Feather name="calendar" size={83} />
              </View>
              <View>
                <Text style={{ padding: 30 }}>Activities</Text>
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Activities", { itemId: 123 })}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View>
                <Feather name="layout" size={83} />
              </View>
              <View>
                <Text style={{ padding: 30 }}>Statistics</Text>
              </View>
            </View>
          </Pressable>
          {/* <Button
          title="Go to Activities"
          onPress={() => navigation.navigate("Activities", { itemId: 123 })}
        /> */}
          <Pressable
            onPress={() => navigation.navigate("Presets", { itemId: 123 })}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Feather name="list" size={83} />
              <Text style={{ padding: 30 }}>Presets</Text>
            </View>
          </Pressable>
          {/* <Button
          title="Go to Presets"
          onPress={() => navigation.navigate("Presets", { itemId: 123 })}
        /> */}
          {auth().currentUser && !auth().currentUser.isAnonymous ? (
            <Pressable
              onPress={() => navigation.navigate("Settings", { itemId: 123 })}
            >
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Feather name="settings" size={83} />
                <Text style={{ padding: 30 }}>Settings</Text>
              </View>
            </Pressable>
          ) : (
            ""
          )}
          {/* <Button
          title="Go to Profile"
          onPress={() => navigation.navigate("Settings", { itemId: 123 })}
        /> */}
          {auth().currentUser && !auth().currentUser.isAnonymous ? (
            <Pressable
              onPress={() => navigation.navigate("Users", { itemId: 123 })}
            >
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Feather name="users" size={83} />
                <Text style={{ padding: 30 }}>Users</Text>
              </View>
            </Pressable>
          ) : (
            ""
          )}
          {/* <Button
          title="Go to Users"
          onPress={() => navigation.navigate("Users", { itemId: 123 })}
        /> */}
        </View>
        <View style={{ flexGrow: 1 }}>
          <Pressable
            onPress={() => navigation.navigate("Login", { itemId: 123 })}
          >
            <Divider />
            <View
              style={{
                margin: 10,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Feather
                name={auth().currentUser ? "log-out" : "log-in"}
                size={23}
              />
              <Text style={{ padding: 6 }}>
                {auth().currentUser ? "Logout" : "Login"}
              </Text>
            </View>
          </Pressable>
          {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate("Details", { itemId: 123 })}
        /> */}
        </View>
      </View>
    </View>
  );
}
HomeScreen.navigationOptions = {
  title: "Home",
};
let AuthTitle = "Login";
export function LoginScreen({ navigation, authUser }) {
  authUser ? (AuthTitle = "Logut") : "Login";
  return (
    <View>
      {/* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
      {authUser ? (
        <Text style={[{ fontSize: 22, margin: 6, textAlign: "center" }]}>
          {"Profile"}
        </Text>
      ) : (
        <View>
          <Text style={[{ fontSize: 28, margin: 6, textAlign: "center" }]}>
            {"Welcome to planner"}
          </Text>
          <Text style={{ fontSize: 18, margin: 6, textAlign: "center" }}>
            {"Login to continue"}
          </Text>
        </View>
      )}
      {/* <View style={{margin:30, columnGap:12}}>         */}
      {/* <Button title="Settings" onPress={() => navigation.navigate('Settings', { itemId: 123 })} /> */}
      <Login name={""} navigation={navigation} />
    </View>
    // </View>
  );
}
LoginScreen.navigationOptions = {
  title: AuthTitle,
};
export function SettingsScreen({ props, authuser, navigation }) {
  return (
    <View>
      <View>
        {/* style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}> */}
        {/* <Text style={{textAlign:'center'}}>Settings Screen</Text> */}
        <UserData name={""} authuser={authuser} navigation={navigation} />
        {/* <Text>{extraData}</Text> */}
      </View>
    </View>
  );
}
SettingsScreen.navigationOptions = {
  title: "Settings",
};
export function StatisticsScreen({ route, navigation }) {
  // const { itemId } = route.params;
  // Use the itemId parameter
  // ...
  return (
    <View>
      {/* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
      {/* <Text style={{fontWeight:'bold'}}>Details Screen</Text> */}
      <Statistics name={""} navigation={navigation} />
      {/* <Text>{itemId ?? "no data"}</Text> */}
    </View>
  );
}
StatisticsScreen.navigationOptions = {
  title: "Statistics",
};
export function UsersScreen({ route, navigation }) {
  // const { itemId } = route.params;
  // Use the itemId parameter
  // ...
  return (
    <ScrollView style={{ margin: 5 }}>
      {/* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
      <Text style={{ fontWeight: "bold" }}>UsersScreen Screen</Text>
      <Users name={""} navigation={navigation} />
      {/* <Text>{itemId ?? "no data"}</Text> */}
    </ScrollView>
  );
}
UsersScreen.navigationOptions = {
  title: "Users",
};
export function ActivityScreen({ navigation }) {
  return (
    <View style={{ margin: 5 }}>
      {/* <Text style={{fontSize:33,fontWeight:'500'}}>Activities</Text> */}
      <StatusBar style="auto" />
      <Activities name={""} navigation={navigation} />
    </View>
  );
}
ActivityScreen.navigationOptions = {
  title: "Activities",
};
export function PresetScreen({ navigation }) {
  return (
    <View style={{ margin: 5 }}>
      {/* <Text style={{fontSize:33,fontWeight:'500'}}>Presets</Text> */}
      <StatusBar style="auto" />
      <Presets name={""} navigation={navigation} />
    </View>
  );
}
PresetScreen.navigationOptions = {
  title: "Presets",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
