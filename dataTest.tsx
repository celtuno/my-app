import React, { useState } from 'react'
import { Button, Text, Image, StyleSheet, View } from 'react-native';
import DayAPI from './services/day-api'
import AuthAPI from './services/auth-api'
import { DataType, IMyDay, IPreset, IUser } from './types/day.type';
import { Feather , } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import PlannerHandler from './services/planner-handler';
import Divider from './Components/Divider';
import { GoogleSigninButton, User } from '@react-native-google-signin/google-signin';

    
export type Props = {
        name: string;
        authuser?: User | null | undefined;
        dbusers?: Array<IUser> |null | undefined
    };
    const ImageWithRequire = ({ name }) => {
        const image = images[name];
        return (
            <Image key={name} style={styles.image} source={image} />
        )
    };

export const Activities: React.FC<Props> = ({
name,
authuser,}) => 
{
    const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>());        
    const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
    
    const GetData = async ()  =>{
        const dataFound =  await PlannerHandler.GetDBAllIemsSnapshot(DataType.Planner,'');
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
        <Button onPress={GetData} title="Fetch activities"></Button>
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
authuser,}) => 
{
    const [presets, setPresets] = useState<Array<IPreset>>(new Array<IPreset>());
    const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
    
    const GetData = async () =>{
        const tmp = await PlannerHandler.GetDBAllIemsSnapshot(DataType.Presets, '').then((dataFound) => 
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
        <Button onPress={GetData} title="Fetch presets"></Button>
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
    
export  const Users: React.FC<Props> = ({
    name,
    authuser ,}) => 
    {
        const [users, setUsers] = useState<Array<IUser>>(new Array<IUser>());
        const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
        
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
                            <View key={userIndex} style={[{backgroundColor:'#0133d321',borderRadius:30,margin:20, padding:30}]}>
                                <React.Fragment>
                                    <Text key={userIndex} style={styles.heading} >{userItem.Name}</Text>
                                </React.Fragment>
                                <Divider/>
                                <React.Fragment>                                    
                                    <Text>Config</Text>
                                    <Text>Background {userItem.Config.background}</Text>
                                    <Text>Color1 {userItem.Config.color1}</Text>
                                    <Text>Color2 {userItem.Config.color2}</Text>
                                    <Text>Title {userItem.Config.title}</Text>
                                    <Text>Title size {userItem.Config.titleSize}</Text>
                                </React.Fragment>                           
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

    export  const UserData: React.FC<Props> = ({
    name,
    authuser ,}) => 
    {
        const [user, setUser] = useState<IUser>();
        const [dbUserId, setdbUserId] = useState<number>();
        const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
        
        const GetUserData = async () =>{
            if(auth().currentUser){                
                await PlannerHandler.GetDBAllIemsSnapshot(DataType.User,"5").then((dataFound) => 
                {
                    if(dataFound.snapshotFound)
                    {
                        setSnapshotFound(dataFound.snapshotFound);
                        // alert("OK")
                        setUser(dataFound.data.users[0])
                    }           
                }).catch((e) =>{
                    console.log(e)
                    alert("Error")
                });
                await AuthAPI.CheckAuth(authuser).then((data) =>{
                    if(data.dbUser.Id > 0)
                    setdbUserId(data.dbUser.Id)
                })
            }
            else
                alert("Not logged in")
        }
        return(
        <>
            <Button onPress={GetUserData} title="Fetch users"></Button>
            <View style={styles.textBlock}>
                {
                snapshotFound ?                    
                    <View  style={[{backgroundColor:'#0133d321',borderRadius:30,margin:20, padding:30}]}>
                        <React.Fragment>
                            <Text  style={styles.heading} >{user.Name}</Text>
                        </React.Fragment>
                        <Divider/>
                        <React.Fragment>                                    
                            <Text>Config</Text>
                            <Text>Background {user.Config.background}</Text>
                            <Text>Color1 {user.Config.color1}</Text>
                            <Text>Color2 {user.Config.color2}</Text>
                            <Text>Title {user.Config.title}</Text>
                            <Text>Title size {user.Config.titleSize}</Text>
                        </React.Fragment>                           
                    </View>   
                :
                <Text key={"none"}>                
                    No data
                </Text>
            }
            </View>

        </>
        )
    };
    
   export  const Login: React.FC<Props> = ({
    name,
    authuser,
    dbusers }) => 
    {
        const [user, setUser] = useState<IUser>();               
        
        return(
        <>
            {/* <Button onPress={GetData} title="Check data"></Button> */}
            <View style={styles.textBlock}>
            {!auth().currentUser
            ?                    
                <View  style={[{backgroundColor:'#0133d321',borderRadius:30,margin:20, padding:30}]}>
                        <React.Fragment>

                        <Text  style={styles.heading} >Login</Text>
                        </React.Fragment>
                        <React.Fragment >
                           
                                <GoogleSigninButton
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={() =>AuthAPI.SignInFunc("google")}
                                    disabled={false}
                                    />
                            {/* <Button
                            //   className="login__btn login__google"
                            onPress={() => AuthAPI.SignInFunc("google")}
                            title='Login with Google'
                            //  <Google sx={{ m: "15px" }} /> Login with Google{" "}
                        /> */}
                            <Button
                            //   className={"login__btn"}
                            onPress={() => AuthAPI.SignInFunc("anonymous")}
                            title='Login anonymously'
                            //   <Person sx={{ m: "15px" }} /> Login anonymously{" "}
                            />
                            <Button
                            //   className={"login__btn "}
                            disabled={true}
                            onPress={() => AuthAPI.SignInFunc("apple")}
                            title = "Login with Apple"
                            //   <Apple sx={{ m: "15px" }} />
                            />
                            <Button
                            //   className={"login__btn "}
                            disabled={true}
                            onPress={() => AuthAPI.SignInFunc("facebook")}
                            title ="Login with Facebook"
                            //   <Facebook sx={{ m: "15px" }} />
                            />
                        </React.Fragment>                
                    </View>
            :
            <Text key={"none"}>
                <Text>{auth().currentUser.displayName}</Text>
                <Button title='Logout' onPress={AuthAPI.SignOut}/>
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
  