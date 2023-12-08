import React, { useEffect, useState } from 'react'
import { Button, Text, Image, StyleSheet, View, Dimensions } from 'react-native';
import DayAPI from './services/day-api'
import AuthAPI from './services/auth-api'
import { DataType, IMyDay, IPreset, IUser } from './types/day.type';
import { Feather , } from '@expo/vector-icons';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import PlannerHandler from './services/planner-handler';
import Divider from './Components/Common/Divider';
import { GoogleSigninButton, User } from '@react-native-google-signin/google-signin';
import { Avatar } from 'react-native-paper';
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getDecorators } from 'typescript';

export type Props = {
    name: string;
    authuser?: User | null | undefined;
    dbusers?: Array<IUser> |null | undefined
    navigation
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
    
    const [user, setUser] = useState<IUser>();
    
    const authuser2: FirebaseAuthTypes.User  = auth().currentUser;
    const GetUserData = async () =>{
        setUser(null)
        if(auth().currentUser){                
            await AuthAPI.CheckAuth(authuser2).then((data) =>{
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

            setSnapshotFound(dataFound.snapshotFound);//dataFound.snapshotFound)
            if(dataFound.snapshotFound)
            {             
                setDays(dataFound.data.days)
            }             
        }
    }       
    useEffect(() =>{
        if(!snapshotFound)
            GetData()
    })
    const ReFetch = () =>{
        GetUserData()
        GetData();
    }
    return(
    <>
        {/* <Button onPress={GetData} title="Fetch activities"></Button> */}
        <ScrollView refreshControl={<RefreshControl onRefresh={ReFetch} refreshing={false}/>} style={styles.textBlock}>
            {snapshotFound && user?
                days?.map((dayItem, dayIndex) => (
                    dayItem?
                    <View key={dayIndex} style={[{backgroundColor: user.Config.color1 ? user.Config.color1 : '#05050310',borderRadius:10,margin:15, padding:15}]}>
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
                                {/* <Feather  name={activity.Selected ? 'check-circle': 'circle'} */}
                                {/* size={20}
                                /> */}
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
        </ScrollView>
    </>
    )
};

export  const Presets: React.FC<Props> = ({
name,
authuser,}) => 
{
    const [presets, setPresets] = useState<Array<IPreset>>(new Array<IPreset>());
    const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
    const [user, setUser] = useState<IUser>();
    
    const authuser2: FirebaseAuthTypes.User  = auth().currentUser;
    const GetUserData = async () =>{
        setUser(null)
        if(auth().currentUser){                
            await AuthAPI.CheckAuth(authuser2).then((data) =>{
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
     useEffect(() =>{
        if(!snapshotFound)
            GetData()
    })
    const ReFetch = () =>{
        // GetUserData()
        GetData();
    }
    return(
    <>
        {/* <Button onPress={GetData} title="Fetch presets"></Button> */}
        <ScrollView refreshControl={<RefreshControl onRefresh={ReFetch} refreshing={false}/>} style={styles.textBlock}>
        {snapshotFound ?
            presets?.map((presetItem, presetIndex) => (
                presetItem?
                <View key={presetIndex} style={[{backgroundColor: user.Config.color1 ? user.Config.color1 : '#05050310',borderRadius:10,margin:15, padding:15}]}>
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
                    {/* <Feather  name={activity.Selected ? 'check-circle': 'circle'}
                        size={20}
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
            No data
        </Text>
        }
        </ScrollView>

    </>
    )
};
    
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

export  const UserData: React.FC<Props> = ({
name,
authuser ,}) => 
{

    const [user, setUser] = useState<IUser>();
    const [dbUserId, setdbUserId] = useState<number>(0);
    const [snapshotFound,setSnapshotFound] = React.useState<Boolean>(false);
    const authuser2: FirebaseAuthTypes.User  = auth().currentUser;
    const userPhotURL = authuser2 ? authuser2.photoURL ?? '' :'';
    const { width } = Dimensions.get('window');
        const getInitials = (name:string) =>{
       return name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
    }
    const GetUserData = async () =>{
        setUser(null)
        if(authuser2){                
            await AuthAPI.CheckAuth(authuser2).then((data) =>{
                console.log("Check auth")
                console.log(data.dbUser)
                if(data.dbUser && data.dbUser.Id > 0){
                    setdbUserId(data.dbUser.Id)
                    setUser(data.dbUser)
                }
            })
        //     await PlannerHandler.GetDBAllIemsSnapshot(DataType.User,dbUserId.toString()).then((dataFound) => 
        //     {
        //         setUser(dataFound.data.users[0])
        //         if(dataFound.snapshotFound)
        //         {
        //             setSnapshotFound(dataFound.snapshotFound);
        //             // alert("OK")
        //         }           
        //     }).catch((e) =>{
        //         console.log(e)
        //         alert("Error")
        //     });
        }
        else
            console.log("Not logged in")
    }
    useEffect( ()=>{
        if(!user || !auth().currentUser)
            GetUserData()
    })
    return(
    <>
        {/* <Button onPress={ async () => await GetUserData()} title="Fetch users"></Button> */}
        <View >
        {/* // style={styles.textBlock}> */}
            {
            user && auth().currentUser ?                    
            <>
                <View  style={[{backgroundColor:'#05050310',borderRadius:10,margin:15, padding:15}]}>
                    <React.Fragment>
                        <View style={[styles.userContainer,{width:width}]}>
                            <View style={styles.profileColumn} >
                                <Text style={styles.heading}>Profile</Text>
                                <Text  style={styles.subheading} >{user.Name}</Text>
                            </View>
                            <View style={styles.titleTextColumn} >
                                { auth().currentUser  && auth().currentUser.photoURL 
                                            ? <Avatar.Image size={60} source={{uri: userPhotURL}} /> 
                                            : 
                                            auth().currentUser.displayName 
                                            ? <Avatar.Text label={getInitials(auth().currentUser.displayName)} size={60} style={{marginLeft :18}}  /> 
                                            : <Avatar.Icon icon={"account"} size={60} style={{marginLeft:18}} />  
                                }
                            </View>
                        </View>
                    </React.Fragment>                    
                </View>
                    <Divider/>
                <View  style={[{backgroundColor: '#05050310',borderRadius:10,margin:15, padding:15}]}>
                    {/* <React.Fragment> */}
                       
                         {/* <Text style={styles.textBlock}>Logged in as</Text> */}
                            
                        <Text style={styles.configheading} >Config</Text>
                        <View>
                        <View style={[styles.configContainer,{width:width}]}>
                            <View style={styles.titleTextColumn} >
                                <Text>Background</Text>
                            </View>
                            <View style={styles.textColumn} >
                                <Text style={styles.configData}>{user.Config.background}</Text>
                            </View>         
                        </View>
                        <View style={[styles.configContainer, {width:width}]}>
                            <View style={styles.titleTextColumn} >
                                <Text>Color1</Text>
                            </View>
                            <View style={styles.textColumn} >
                                <Text style={styles.configData}>{user.Config.color1}</Text>
                            </View>
                        </View>
                        <View style={[styles.configContainer, {width:width}]}>
                            <View style={styles.titleTextColumn} >                                
                                <Text>Color2 </Text>
                                </View>
                            <View style={styles.textColumn} >
                                <Text style={styles.configData}> {user.Config.color2}</Text>
                            </View>
                        </View>
                        <View style={[styles.configContainer, {width:width}]}>                            
                            <View style={styles.titleTextColumn} >
                                <Text>Title</Text>
                                </View>
                            <View style={styles.textColumn} >
                                <Text style={styles.configData}>{user.Config.title}</Text>
                            </View>
                        </View>                        
                        <View style={[styles.configContainer, {width:width}]}>
                            <View style={styles.titleTextColumn} >
                                <Text>Title size</Text>
                                </View>
                            <View style={styles.textColumn} >
                                <Text style={styles.configData}> {user.Config.titleSize}</Text>
                            </View>
                        </View>
                            </View>    
                    {/* </React.Fragment>                            */}
                </View>   
        </>
            :
            <View  style={[{backgroundColor:'#05050310',borderRadius:10,margin:15, padding:15}]}>
            <Text >                
                No data
            </Text>
            </View>
        }
        </View>

</>
    )
};

export  const Login: React.FC<Props> = ({
name,
authuser,
dbusers,
navigation }) => 
{
    const [user, setUser] = useState<IUser>();               
    const userPhotURL = auth().currentUser?.photoURL
    const { width } = Dimensions.get('window');
    const getInitials = (name:string) =>{
       return name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
    }
    return(
    <>
        {/* <Button onPress={GetData} title="Check data"></Button> */}
         <View >{/* style={styles.textBlock}> */}
            {!auth().currentUser
            ?                    
                <View  style={[{backgroundColor:'#05050310',borderRadius:10,margin:15, padding:15}]}>
                    {/* <React.Fragment>
                        <Text  style={styles.heading} >Login</Text>
                    </React.Fragment> */}
                    <React.Fragment >                        
                        <View >

                            <View style={{marginBottom:2}}>
                                <Button
                                    //   className={"login__btn"}
                                    onPress={() => AuthAPI.SignInFunc("anonymous")}
                                    title='Login anonymously'
                                    //   <Person sx={{ m: "15px" }} /> Login anonymously{" "}
                                    />
                            </View>    
                                {/* <GoogleSigninButton
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={() =>AuthAPI.SignInFunc("google")}
                                    disabled={false}
                                    /> */}
                            <View style={{marginBottom:2}}>
                                <Button
                                //   className="login__btn login__google"
                                onPress={() => AuthAPI.SignInFunc("google")}
                                title='Login with Google'
                                //  <Google sx={{ m: "15px" }} /> Login with Google{" "}
                                />
                        </View>    
                            <View style={{marginBottom:2}}>
                                <Button
                                    //   className={"login__btn "}
                                    disabled={true}
                                    onPress={() => AuthAPI.SignInFunc("apple")}
                                    title = "Login with Apple"
                                    //   <Apple sx={{ m: "15px" }} />
                                    />
                            </View>    
                            <View style={{marginBottom:2}}>
                                <Button
                                    //   className={"login__btn "}
                                    disabled={true}
                                    onPress={() => AuthAPI.SignInFunc("facebook")}
                                    title ="Login with Facebook"
                                    //   <Facebook sx={{ m: "15px" }} />
                                    />
                            </View>    
                        </View>
                    </React.Fragment>                
                </View>
            :
                <View  style={[{backgroundColor:'#05050310',borderRadius:10,margin:15, padding:15}]}>
                       
                       <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{marginBottom:23}}>
                    <View style={[styles.containerLogin, {width:width}]}>

                       
                         {/* <Text style={styles.textBlock}>Logged in as</Text> */}
                            <View style={styles.textColumnLogin} >
                                <Text style={styles.subheading}>  {auth().currentUser.displayName ? auth().currentUser.displayName : "Anonymous" }</Text>
                            </View>
                            <View style={styles.textColumnLogin} >
                                {
                                    auth().currentUser.photoURL
                                    ? <Avatar.Image size={32} source={{uri: userPhotURL}} /> 
                                    : 
                                    auth().currentUser.displayName 
                                    ? <Avatar.Text label={getInitials(auth().currentUser.displayName)} size={32} style={{marginLeft :18}}  /> 
                                    : <Avatar.Icon icon={"account"} size={32} style={{marginLeft:18}} />  
                                }
                            </View>
                    </View>
                        </TouchableOpacity>
                    <View style={styles.button}>
                        <Button title='Logout' onPress={AuthAPI.SignOut}/>
                    </View>
                    
                </View>
        }
        </View>

    </>
    )
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
var styles = StyleSheet.create({
    image:{
        width: 360,
        height: 140,
        resizeMode:'contain'
    },
    button:{
        marginTop:12,
        // flexDirection:'column'
    },
    imagetext:{
        textAlign:'center'
    },
    textBlock:{
        marginBottom:5,
        flexDirection:'column'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom:2,
    },
    configContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom:32,
    },
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom:12,
        paddingBottom:54,
    },
    configData:{
        color:'#01010199'
    },
    textColumn:{
        flex: 0.55,
        // width: 150, //using fixed item width instead of flex: 0.5 works
        height: 47,
        // flexGrow: 1,
        // flexShrink: 0,
        padding: 7,
        marginBottom:1
        // backgroundColor: 'red'
        
    },
    profileColumn:{
        flex: 0.75,
        // width: 150, //using fixed item width instead of flex: 0.5 works
        height: 107,
        // flexGrow: 1,
        // flexShrink: 0,
        padding: 3,
        marginBottom:3
        // backgroundColor: 'red'
        
    }, userTextColumn:{
        flex: 0.30,
        // width: 150, //using fixed item width instead of flex: 0.5 works
        height: 147,
        // flexGrow: 1,
        // flexShrink: 0,
        padding: 17,
        marginBottom:12,
        
        // backgroundColor: 'red'
    },
    titleTextColumn:{
        flex: 0.30,
        // width: 150, //using fixed item width instead of flex: 0.5 works
        height: 47,
        // flexGrow: 1,
        // flexShrink: 0,
        padding: 7,
        marginBottom:1,
        
        // backgroundColor: 'red'
    },
    containerLogin: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom:46
    },

    textColumnLogin:{
        flex: 0.55,
        // width: 150, //using fixed item width instead of flex: 0.5 works
        height: 107,
        // flexGrow: 1,
        // flexShrink: 0,
        padding: 14,
        marginBottom:14,        
        // backgroundColor: 'red'
    },
     subheading:{
        fontWeight:'normal',
        fontSize:20,
        flexDirection:'column'
    },
    configheading:{
        fontWeight:'normal',
        fontSize:16,
        flexDirection:'column'
    },
    heading:{
        fontWeight:'400',
        fontSize:28,
        flexDirection:'column',
        marginBottom:4
    },
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
