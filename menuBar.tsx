import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import Activities, { Presets } from './dataTest';
import { createDrawerNavigator } from '@react-navigation/drawer';
// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MenuBar() {
  return (
<NavigationContainer>
 
<Stack.Navigator>
  
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Details" component={DetailsScreen} />
<Stack.Screen name="Activities" component={ActivityScreen} />
<Stack.Screen name="Presets" component={PresetScreen} />
<Stack.Screen name="Settings">
  {(props) => <SettingsScreen props={undefined} {...props} extraData={"someData"} />}
</Stack.Screen>

</Stack.Navigator>
     
   </NavigationContainer>
  );
}
export function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <View style={{margin:30, columnGap:12}}>
        <Button title="Go to Details" onPress={() => navigation.navigate('Details', { itemId: 123 })} />
        <Button title="Go to Activities" onPress={() => navigation.navigate('Activities', { itemId: 123 })} />
        <Button title="Go to Presets" onPress={() => navigation.navigate('Presets', { itemId: 123 })} />
        <Button title="Go to Settings" onPress={() => navigation.navigate('Settings', { itemId: 123 })} />
        </View>
      </View>
    );
  }
  HomeScreen.navigationOptions = {
    title: 'Home',
  };
 export function SettingsScreen({props, extraData}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
        
        <Text>{extraData}</Text>
      </View>
    );
  }
SettingsScreen.navigationOptions = {
    title: 'Settings',
  };
export  function DetailsScreen({ route }) {
    const { itemId } = route.params;
    // Use the itemId parameter
    // ...
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontWeight:'bold'}}>Details Screen</Text>
        <Text>{itemId ?? "no data"}</Text>
      </View>
    );
  }
  DetailsScreen.navigationOptions = {
    title: 'Details',
  };
  
 export function ActivityScreen({navigation}) {
    return (
      <ScrollView>
        <Text style={{fontSize:33,fontWeight:'500'}}>Activities</Text>
        <StatusBar style="auto" />
        <Activities name={''} />
      </ScrollView>
    );
  }
  ActivityScreen.navigationOptions = {
    title: 'Activities',
  };
  export function PresetScreen({navigation}) {
    return (
      <ScrollView>
        <Text style={{fontSize:33,fontWeight:'500'}}>Presets</Text>
        <StatusBar style="auto" />
        <Presets name={''} />
      </ScrollView>
    );
  }
  PresetScreen.navigationOptions = {
    title: 'Presets',
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default MenuBar

