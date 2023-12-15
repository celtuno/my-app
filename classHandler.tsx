import React, { useEffect, useState } from 'react'
import { Button, Text, Image, StyleSheet, View, Dimensions, Pressable } from 'react-native';
import { DataType, IMyDay, IPreset, IUser } from './types/day.type';
import PlannerHandler from './services/planner-handler';
import Divider from './Components/Common/Divider';
import { User } from '@react-native-google-signin/google-signin';
import { styles } from './styles/classStyles';
import { Activities as ActivitiesComponent } from './Components/MenuComponents/Activities';
import { Presets as PresetsComponent } from './Components/MenuComponents/Presets';
import { Statistics as StatisticsComponent } from './Components/MenuComponents/Statistics';
import { UserComponent } from './Components/MenuComponents/UserComponent';
import { Login as LoginComponent } from './Components/MenuComponents/Login';

export type Props = {
    name: string;
    authuser?: User | null | undefined;
    dbusers?: Array<IUser> |null | undefined
    navigation
};

 export const Activities =  ActivitiesComponent 
 export const Presets = PresetsComponent 
 export const Statistics = StatisticsComponent 
 export const UserData = UserComponent
 export const Login =  LoginComponent 
export  const Users: React.FC<Props> = ({
    name,
    authuser ,}) => 
    {
        const [users, setUsers] = useState<Array<IUser>>(new Array<IUser>());
        const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
        
        const { width } = Dimensions.get('window');
        const GetData = async () =>{
            const tmp = await PlannerHandler.GetDBAllIemsSnapshot(DataType.User,'').then((dataFound) => 
            {
                setSnapshotFound(dataFound.snapshotFound);
                if(dataFound.snapshotFound)
                {
                    // alert("OK")
                    setUsers(dataFound.data.users)
                }           
            }).catch((e) =>{
                console.log(e)
                alert("Error")
            });
        }
        
        return(
        <>
            <Button onPress={GetData} title="Fetch users"></Button>
            <View style={styles.textBlock}>
                {snapshotFound ?
                    users?.map((userItem, userIndex) => (
                        userItem?
                            <View key={userIndex} style={[{backgroundColor: userItem.Config.color1 ? userItem.Config.color1 : '#05050310',borderRadius:15,margin:15, padding:15}]}>
                                <React.Fragment>
                                    {/* <Text style={styles.heading}>Profile</Text> */}
                                    <Text key={userIndex} style={styles.subheading} >{userItem.Name}</Text>
                                    <Divider/>
                                </React.Fragment>
                                                                 
                                    <View>
                                    <Text style={styles.configheading} >Config</Text>
                                        <View >                                            
                                            <View style={[styles.container,{width:width}]}>
                                                <View style={styles.titleTextColumn} >                                            
                                                    <Text>Background</Text>
                                                </View>
                                                <View style={styles.textColumn} >
                                                    <Text style={styles.configData}>{userItem.Config?.background ?? '-'}</Text>
                                                </View>         
                                            </View>         
                                        </View> 
                                        <View style={[styles.container,{width:width}]}>
                                                <View style={styles.titleTextColumn} >
                                                    <Text>Color1</Text>
                                                </View>
                                                <View style={styles.titleTextColumn} >
                                                    <Text style={styles.configData}>{userItem.Config.color1}</Text>
                                                </View>
                                            </View>
                                        <View style={[styles.container, {width:width}]}>
                                            <View style={styles.titleTextColumn} >                                
                                                <Text>Color2 </Text>
                                                </View>
                                            <View style={styles.textColumn} >
                                                <Text style={styles.configData}> {userItem.Config.color2}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.container, {width:width}]}>                            
                                            <View style={styles.titleTextColumn} >
                                                <Text>Title</Text>
                                                </View>
                                            <View style={styles.textColumn} >
                                                <Text style={styles.configData}>{userItem.Config.title}</Text>
                                            </View>
                                        </View>                        
                                        <View style={[styles.container, {width:width}]}>
                                            <View style={styles.titleTextColumn} >
                                                <Text>Title size</Text>
                                                </View>
                                            <View style={styles.textColumn} >
                                                <Text style={styles.configData}> {userItem.Config.titleSize}</Text>
                                            </View>
                                        </View>
                                    </View>    
                                {/* </React.Fragment>                            */}
                            </View>   
                        :
                        ''
                    )   )                
                    
                    :
                <Text key={"none"}>
                
                    No data
                </Text>
            }
            </View>

        </>
        )
};



// var styles = StyleSheet.create({
//     image:{
//         width: 360,
//         height: 140,
//         resizeMode:'contain',
//         margin:15,
//         borderTopColor:'#f0f0f0'
//     },
//     button:{
//         marginTop:12,        
//         // flexDirection:'column'
//     },
//     imagetext:{
//         textAlign:'center'
//     },
//     textBlock:{
//         marginBottom:5,
//         flexDirection:'column'
//     },
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom:2,
//     },
//     configContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom:32,
//     },
//     userContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom:12,
//         paddingBottom:54,
//     },
//     configData:{
//         color:'#01010199'
//     },
//     textColumn:{
//         flex: 0.55,
//         // width: 150, //using fixed item width instead of flex: 0.5 works
//         height: 47,
//         // flexGrow: 1,
//         // flexShrink: 0,
//         padding: 7,
//         marginBottom:1
//         // backgroundColor: 'red'
        
//     },
//     profileColumn:{
//         flex: 0.75,
//         // width: 150, //using fixed item width instead of flex: 0.5 works
//         height: 107,
//         // flexGrow: 1,
//         // flexShrink: 0,
//         padding: 3,
//         marginBottom:3
//         // backgroundColor: 'red'
        
//     }, userTextColumn:{
//         flex: 0.30,
//         // width: 150, //using fixed item width instead of flex: 0.5 works
//         height: 147,
//         // flexGrow: 1,
//         // flexShrink: 0,
//         padding: 17,
//         marginBottom:12,
        
//         // backgroundColor: 'red'
//     },
//     titleTextColumn:{
//         flex: 0.30,
//         // width: 150, //using fixed item width instead of flex: 0.5 works
//         height: 47,
//         // flexGrow: 1,
//         // flexShrink: 0,
//         padding: 7,
//         marginBottom:1,
        
//         // backgroundColor: 'red'
//     },
//     containerLogin: {
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom:56,
//         backgroundColor:'#FF55F5'
//     },

//     textColumnLogin:{
//         flex: 0.55,
//         // width: 150, //using fixed item width instead of flex: 0.5 works
//         height: 107,
//         // flexGrow: 1,
//         // flexShrink: 0,
//         padding: 6,
//         marginBottom:14,        
//         // backgroundColor: 'red'
//     },
//      subheading:{
//         fontWeight:'normal',
//         fontSize:20,
//         flexDirection:'column'
//     },
//     configheading:{
//         fontWeight:'normal',
//         fontSize:16,
//         flexDirection:'column'
//     },
//     heading:{
//         fontWeight:'400',
//         fontSize:28,
//         flexDirection:'column',
//         marginBottom:4
//     },
//     });

    // const images = {
    // // image1: require('./assets/images/image1.png'),
    // // image2: require('./assets/images/image2.png'),
    // // image3: require('./assets/images/image3.png'),
    // image4: require('./assets/images/image4.png'),
    // image5: require('./assets/images/image5.png'),
    // image6: require('./assets/images/image6.png'),
    // image7: require('./assets/images/image7.png'),
    // image8: require('./assets/images/image8.png'),
    // image9: require('./assets/images/image9.png'),
    // image10: require('./assets/images/image10.png'),
    // image11: require('./assets/images/image11.png'),
    // error: require('./assets/images/error.png')    
    // }

// export default Activities
