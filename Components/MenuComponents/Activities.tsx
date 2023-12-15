import React, { useEffect, useState } from "react";
import {Text,View, ScrollView, RefreshControl } from "react-native";
import {styles} from "../../styles/classStyles";
import { IMyDay, IUser } from "../../types/day.type";
import AuthAPI from "../../services/auth-api";

import auth ,{ FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User } from "@react-native-google-signin/google-signin";
import { DataType } from "../../types/day.type";
import PlannerHandler from "../../services/planner-handler";
import ImageWithRequire from "../Common/ImageWithRequire";


type Props = {
    name: string;
    authuser?: User | null | undefined;
    dbusers?: Array<IUser> |null | undefined
    navigation
};

export const Activities: React.FC<Props> = ({
name,}) => 
{
    const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>());        
    const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
    
    const [user, setUser] = useState<IUser>();
    
    const authuser: FirebaseAuthTypes.User  = auth().currentUser;
    const GetUserData = async () =>{
        setUser(null)
        if(auth().currentUser){                
            await AuthAPI.CheckAuth(authuser).then((data) =>{
                console.log("Check auth")
                console.log(data.dbUser)
                if(data.dbUser && data.dbUser.Id > 0){                    
                    setUser(data.dbUser)
                }
            })
        }
        else
            console.log("Not logged in")
    }
        useEffect( ()=>{
        if(!user || !auth().currentUser)
            GetUserData()
    })
    const GetData = async ()  =>{
        const dataFound =  await PlannerHandler.GetDBAllIemsSnapshot(DataType.Planner,'');
        if(dataFound){

            setSnapshotFound(dataFound.snapshotFound);
            if(dataFound.snapshotFound)
            {             
                setDays(dataFound.data.days)
            }             
        }
    }       
    useEffect(() =>{
        if(!snapshotFound)
            GetData();       
    })
    
    useEffect(() =>{
        if(!user)
            GetUserData();
     })
        
    const ReFetch = () =>{
        GetUserData();
        GetData();
    }
    return(
    <>
        {/* <Button onPress={GetData} title="Fetch activities"></Button> */}
        <ScrollView refreshControl={<RefreshControl onRefresh={ReFetch} refreshing={false}/>} style={styles.textBlock}>
            {snapshotFound && authuser?
                days?.map((dayItem, dayIndex) => (
                    dayItem?
                    <View key={dayIndex} style={[{backgroundColor: (user && user.Config && user.Config.color1) ? user.Config.color1 : '#05050310',borderRadius:10,margin:15, padding:15}]}>
                        <React.Fragment>
                            <Text key={dayIndex} style={styles.subheading} >{dayItem.Name}</Text>
                        </React.Fragment>
                        {
                            dayItem?.Activities.map((activity, activityIndex) => (
                            <React.Fragment key={activityIndex}>                             
                                {/* <Feather  name={activity.Selected ? 'check-circle': 'circle'} */}
                                {/* size={20}
                                /> */}
                                <ImageWithRequire name={activity.Image.split('.').slice(0, -1).join('.')}/>                              
                            </React.Fragment>
                            ))                
                        }
                    </View>
                    :
                    ''
                ))            
            :
            <Text key={"none"}>
            { authuser ? 'No data' : 'Not logged in'}
            </Text>
            }
        </ScrollView>
    </>
    )
};
