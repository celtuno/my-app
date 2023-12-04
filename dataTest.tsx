import React, { useState } from 'react'
import { Button, Text, Image, StyleSheet, View } from 'react-native';

import PlannerAPI from './services/planner-firebase-service'
import { IMyDay, IPreset } from './types/day.type';
import { Feather , } from '@expo/vector-icons';
    export type Props = {
        name: string;
        baseEnthusiasmLevel?: number;
    };

    export const Activities: React.FC<Props> = ({
    name,
    baseEnthusiasmLevel = 0,}) => 
    {
        const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>());        
        const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
        
        const GetData = () =>{
            const tmp = PlannerAPI.GetDBAllIemsSnapshot('planner').then((dataFound) => 
            {

            
            setSnapshotFound(dataFound.snapshotFound);//dataFound.snapshotFound)
            if(dataFound.snapshotFound)
            {
                // alert("OK")
                setDays(dataFound.data)
            }

            // )
            // snapshotFound = true;
            }).catch((e) =>{
                console.log(e)
                alert("Error")
            });
        }
        
        return(
        <>
            <Button onPress={GetData} title="Check data"></Button>
            <View style={styles.textBlock}>
                {snapshotFound ?
                    days?.map((dayItem, dayIndex) => (
                        dayItem?
                        <View key={dayIndex} style={[{backgroundColor:'#0133d321',borderRadius:30,margin:20, padding:30}]}>
                            <React.Fragment>

                            <Text key={dayIndex} style={styles.heading} >{dayItem.Name}</Text>
                            </React.Fragment>
                            {
                                dayItem?.Activities.map((activity, activityIndex) => (
                                <React.Fragment key={activityIndex}>                        
                                    <Text
                                        id={"day" + activity.Id}
                                        key={activityIndex}                            
                                    >
                                        {activity.Image}
                                    </Text>
                                    <Feather  name={activity.Selected ? 'check-circle': 'circle'}
                                    size={20}
                                    />
                                    <Image key={activityIndex + 1} style={styles.image}
                                        // onError={(e) => {
                                        //      = "images/error.png";
                                        // }}
                                        source={require(`./assets/images/image5.png`)}//${activity.Image.split('.').slice(0, -1).join('.')}`}}
                                        alt={activity.Name} />
                                </React.Fragment>
                                ))                
                            }
                        </View>
                        :
                        ''
                    ))            
                :
                <Text key={"none"}>
                No data
                </Text>
                }
            </View>
        </>
        )
    };

    export const Presets: React.FC<Props> = ({
    name,
    baseEnthusiasmLevel = 0,}) => 
    {
        const [presets, setPresets] = useState<Array<IPreset>>(new Array<IPreset>());
        const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
        
        const GetData = () =>{
            const tmp = PlannerAPI.GetDBAllIemsSnapshot('presets').then((dataFound) => 
            {
                setSnapshotFound(dataFound.snapshotFound);
                if(dataFound.snapshotFound)
                {
                    // alert("OK")
                    setPresets(dataFound.data)
                }           
            }).catch((e) =>{
                console.log(e)
                alert("Error")
            });
        }
        
        return(
        <>
            <Button onPress={GetData} title="Check data"></Button>
            <View style={styles.textBlock}>
            {snapshotFound ?
                presets?.map((presetItem, presetIndex) => (
                    presetItem?
                    <View key={presetIndex} style={[{backgroundColor:'#0133d321',borderRadius:30,margin:20, padding:30}]}>
                        <React.Fragment>

                        <Text key={presetIndex} style={styles.heading} >{presetItem.Name}</Text>
                        </React.Fragment>
                    {
                    presetItem?.Activities.map((activity, activityIndex) => (
                    <React.Fragment key={activityIndex}>
                        
                        <Text                           
                            id={"presets" + activity.Id}
                            key={activityIndex}
                            
                        >
                            {activity.Image}
                        </Text>
                        <Feather  name={activity.Selected ? 'check-circle': 'circle'}
                          size={20}
                          />
                        <Image key={activityIndex + 1} style={styles.image}
                            
                            source={require(`./assets/images/image5.png`)}
                            alt={activity.Name} />
                    </React.Fragment>                           
                ))                
                }
                </View>   
                :
                ''
            ))
            :
            <Text key={"none"}>
                No data
            </Text>
            }
            </View>

        </>
        )
    };
    
    var styles = StyleSheet.create({
        image:{
         width: 360,
         height: 140,
         resizeMode:'contain'
       },
       imagetext:{
        textAlign:'center'
       },
       textBlock:{
        
        flexDirection:'column'
       },
        heading:{
        fontWeight:'300',
        fontSize:23,
        flexDirection:'column'
       }
     });
  export default Activities
  