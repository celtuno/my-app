import React, { useEffect, useState } from "react";
import {Text,View, ScrollView, RefreshControl, Dimensions } from "react-native";
import {styles} from "../../styles/classStyles";
import { IUser } from "../../types/day.type";

import auth  from "@react-native-firebase/auth";
import { User } from "@react-native-google-signin/google-signin";
import { DataType } from "../../types/day.type";
import PlannerHandler from "../../services/planner-handler";


type Props = {
    name: string;
    authuser?: User | null | undefined;
    dbusers?: Array<IUser> |null | undefined
    navigation
};
export  const Statistics: React.FC<Props> = ({
name,
authuser,
dbusers,
navigation }) => 
{
    const [activityCount, setactivityCount] = useState<number | null |undefined>(null); 
    const [presetCount, setpresetCount] = useState<number | null |undefined>(null); 
    const [userCount, setuserCount] = useState<number | null |undefined>(null); 
    const [user, setUser] = useState<IUser>();    
    const { width } = Dimensions.get('window');
    useEffect(() =>{
        if(!activityCount && !presetCount && !userCount)
        GetData()
    })
    const GetData = async () =>{
       
        await  PlannerHandler.GetDBSnapshotCount(DataType.Planner).then((countData) =>{
        console.log(countData)
        setactivityCount(countData.activityCount)
        });
                await  PlannerHandler.GetDBSnapshotCount(DataType.Presets).then((countData) =>{
        console.log(countData)
        setpresetCount(countData.presetCount)
        });
        await  PlannerHandler.GetDBSnapshotCount(DataType.User).then((countData) =>{
        console.log(countData)
        setuserCount(countData.userCount)
        });
        // return countData
    }
    return(
    <>
        {/* <Button onPress={async () => await GetData()} title="Check data"></Button> */}
         <View >{/* style={styles.textBlock}> */}
            {auth().currentUser
            ?                    
                <View  style={[{backgroundColor:'#05050310',borderRadius:10,margin:15, padding:15}]}>
                    <React.Fragment>
                        <Text  style={styles.heading} >Statistics</Text>
                    </React.Fragment>
                    <React.Fragment>
                        <View style={[styles.configContainer,{width:width}]}>
                            <View style={styles.titleTextColumn} >
                                <Text>Activities</Text>
                            </View>
                            <View style={styles.textColumn} >                                
                                <Text>{activityCount?? "No data"}</Text>
                            </View>         
                        </View>                            

                        <View style={[styles.configContainer,{width:width}]}>
                            <View style={styles.titleTextColumn} >
                                <Text>Presets</Text>
                            </View>
                            <View style={styles.textColumn} >                               
                                <Text>{presetCount?? "No data"}</Text>
                            </View>         
                        </View>

                        <View style={[styles.configContainer,{width:width}]}>
                            <View style={styles.titleTextColumn} >
                                <Text>Users</Text>
                            </View>
                            <View style={styles.textColumn} >                                
                                <Text>{userCount?? "No data"}</Text>
                            </View>         
                        </View>
                    </React.Fragment>                
                </View>
            :
                <View  style={[{backgroundColor:'#05050310',borderRadius:10,margin:15, padding:15}]}>                       
                   Logged out                    
                </View>
        }
        </View>

    </>
    )
}; 