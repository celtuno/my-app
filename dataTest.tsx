import React, { useState } from 'react'
import { Button, Text, Image, StyleSheet, View } from 'react-native';

import PlannerAPI from './services/planner-firebase-service'
import { IMyDay, IPreset } from './types/day.type';
import { Feather , } from '@expo/vector-icons';
    export type Props = {
        name: string;
        baseEnthusiasmLevel?: number;
    };
        const ImageWithRequire = ({ name }) => {
            const image = images[name];
            return (
                <Image key={name} style={styles.image} source={image} />
            )
        };
    export const Activities: React.FC<Props> = ({
    name,
    baseEnthusiasmLevel = 0,}) => 
    {
        const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>());        
        const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
        
        const GetData = async ()  =>{
            const dataFound =  await PlannerAPI.GetDBAllIemsSnapshot('planner');
            if(dataFound){

                setSnapshotFound(dataFound.snapshotFound);//dataFound.snapshotFound)
                if(dataFound.snapshotFound)
                {             
                    setDays(dataFound.data.days)
                }             
            }
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
                                    {/* <Text
                                        id={"day" + activity.Id}
                                        key={activityIndex}                            
                                    >
                                        {activity.Image}
                                    </Text> */}
                                    <Feather  name={activity.Selected ? 'check-circle': 'circle'}
                                    size={20}
                                    />
                                    <ImageWithRequire name={activity.Image.split('.').slice(0, -1).join('.')}/>
                                    {/* <Image key={activityIndex + 1} style={styles.image}
                                        // onError={(e) => {
                                        //      = "images/error.png";
                                        // }}
                                        source={{uri:GetImagePath(activity.Image)}}//${activity.Image.split('.').slice(0, -1).join('.')}`}}
                                        alt={activity.Name} /> */}
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

    export  const Presets: React.FC<Props> = ({
    name,
    baseEnthusiasmLevel = 0,}) => 
    {
        const [presets, setPresets] = useState<Array<IPreset>>(new Array<IPreset>());
        const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
        
        const GetData = async () =>{
            const tmp = await PlannerAPI.GetDBAllIemsSnapshot('presets').then((dataFound) => 
            {
                setSnapshotFound(dataFound.snapshotFound);
                if(dataFound.snapshotFound)
                {
                    // alert("OK")
                    setPresets(dataFound.data.presets)
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
                        
                        {/* <Text                           
                            id={"presets" + activity.Id}
                            key={activityIndex}
                            
                        >
                            {activity.Image}
                        </Text> */}
                        <Feather  name={activity.Selected ? 'check-circle': 'circle'}
                          size={20}
                          />
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

     const images = {
        // image1: require('./assets/images/image1.png'),
        // image2: require('./assets/images/image2.png'),
        // image3: require('./assets/images/image3.png'),
        image4: require('./assets/images/image4.png'),
        image5: require('./assets/images/image5.png'),
        image6: require('./assets/images/image6.png'),
        image7: require('./assets/images/image7.png'),
        image8: require('./assets/images/image8.png'),
        image9: require('./assets/images/image9.png'),
        image10: require('./assets/images/image10.png'),
        image11: require('./assets/images/image11.png'),
        error: require('./assets/images/error.png')    
     }

  export default Activities
  