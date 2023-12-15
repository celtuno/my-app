import { Avatar, Divider } from "react-native-paper";
import { IUser } from "../../types/day.type";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Pressable,
  Button,
} from "react-native";
import { Colourpicker } from "../Common/ColorPicker";
import { User } from "@react-native-google-signin/google-signin";
import AuthAPI from "../../services/auth-api";
import { styles } from "../../styles/classStyles";
import plannerHandler from "../../services/planner-handler";

type Props = {
  name: string;
  authuser?: User | null | undefined;
  dbusers?: Array<IUser> | null | undefined;
  navigation;
};
export const UserComponent: React.FC<Props> = ({ name, authuser }) => {
  const [user, setUser] = useState<IUser>();
  const [dbUserId, setdbUserId] = useState<number>(0);
  const [snapshotFound, setSnapshotFound] = React.useState<boolean>(false);
  const [showColorPicker, setShowcolorPicker] = React.useState<boolean>(false);
  const authuser2: FirebaseAuthTypes.User = auth().currentUser;
  const userPhotURL = authuser2 ? authuser2.photoURL ?? "" : "";
  const { width } = Dimensions.get("window");

  //   const toggleDialog = () => {
  //     setShowcolorPicker(!showColorPicker);
  //     console.log(`Parent toggle ${showColorPicker}`);
  //   };

  const getInitials = (name: string) => {
    return name
      .match(/(\b\S)?/g)
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("")
      .toUpperCase();
  };
  const GetUserData = async () => {
    setUser(null);
    if (authuser2) {
      await AuthAPI.CheckAuth(authuser2).then((data) => {
        console.log("Check auth");
        console.log(data.dbUser);
        if (data.dbUser && data.dbUser.Id > 0) {
          setdbUserId(data.dbUser.Id);
          setUser(data.dbUser);
        }
      });
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
    } else console.log("Not logged in");
  };
  useEffect(() => {
    if (!user || !auth().currentUser) GetUserData();
  });

  let setColor = "NA";
  function handleColorCallback(color) {
    let tmpUser: IUser = {
      Id: user.Id,
      Name: user.Name,
      Days: user.Days,
      Presets: user.Presets,
      LastDay: user.LastDay,
      Config: {
        title: user.Config.title,
        titleSize: user.Config.titleSize,
        color1: color,
        color2: user.Config.color2,
        background: user.Config.background,
        role: user.Config.role,
      },
    };
    setColor = color;
    console.log(`Parent ${setColor}`);
    tmpUser.Config.color1 = color;
    setUser(tmpUser);
  }

  return (
    <>
      {/* <Button onPress={ async () => await GetUserData()} title="Fetch users"></Button> */}
      <View>
        {/* // style={styles.textBlock}> */}
        {user && auth().currentUser ? (
          <>
            <View
              style={[
                {
                  backgroundColor: "#05050310",
                  borderRadius: 4,
                  margin: 15,
                  padding: 15,
                },
              ]}
            >
              <React.Fragment>
                <View style={[styles.userContainer, { width: width }]}>
                  <View style={styles.profileColumn}>
                    <Text style={styles.heading}>Profile</Text>
                    <Text style={styles.subheading}>{user.Name}</Text>
                  </View>
                  <View style={styles.titleTextColumn}>
                    {auth().currentUser && auth().currentUser.photoURL ? (
                      <Avatar.Image size={60} source={{ uri: userPhotURL }} />
                    ) : auth().currentUser.displayName ? (
                      <Avatar.Text
                        label={getInitials(auth().currentUser.displayName)}
                        size={60}
                        style={{ marginLeft: 18 }}
                      />
                    ) : (
                      <Avatar.Icon
                        icon={"account"}
                        size={60}
                        style={{ marginLeft: 18 }}
                      />
                    )}
                  </View>
                </View>
              </React.Fragment>
            </View>
            <Divider />
            <View
              style={[
                {
                  backgroundColor: "#05050310",
                  borderRadius: 4,
                  margin: 15,
                  padding: 15,
                },
              ]}
            >
              {/* <React.Fragment> */}

              {/* <Text style={styles.textBlock}>Logged in as</Text> */}

              <Text style={styles.configheading}>Config</Text>
              <View>
                <View style={[styles.configContainer, { width: width }]}>
                  <View style={styles.titleTextColumn}>
                    <Text>Background</Text>
                  </View>
                  <View style={styles.textColumn}>
                    <Text style={styles.configData}>
                      {user.Config.background}
                    </Text>
                  </View>
                </View>
                <View style={[styles.configContainer, { width: width }]}>
                  <View style={styles.titleTextColumn}>
                    <Text>Color1</Text>
                  </View>
                  <View style={styles.textColumn}>
                    {/* <Pressable onPress={toggleDialog}> */}
                    <Colourpicker
                      colorType={Object.keys(user.Config)[1].toString()}
                      colorCallback={handleColorCallback}
                      currentColor={user.Config.color1}
                      showdialog={false}
                    />
                    {/* <Text style={styles.configData}>{user.Config.color1}</Text> */}
                    {/* </Pressable> */}
                  </View>
                </View>
                <View style={[styles.configContainer, { width: width }]}>
                  <View style={styles.titleTextColumn}>
                    <Text>Color2 </Text>
                  </View>
                  <View style={styles.textColumn}>
                    <Text style={styles.configData}> {user.Config.color2}</Text>
                  </View>
                </View>
                <View style={[styles.configContainer, { width: width }]}>
                  <View style={styles.titleTextColumn}>
                    <Text>Title</Text>
                  </View>
                  <View style={styles.textColumn}>
                    <Text style={styles.configData}>{user.Config.title}</Text>
                  </View>
                </View>
                <View style={[styles.configContainer, { width: width }]}>
                  <View style={styles.titleTextColumn}>
                    <Text>Title size</Text>
                  </View>
                  <View style={styles.textColumn}>
                    <Text style={styles.configData}>
                      {" "}
                      {user.Config.titleSize}
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                title="Save"
                onPress={() => {
                  plannerHandler.UpdateUserData(user.Id.toString(), user);
                }}
              />
            </View>
            {/* {!showColorPicker && ( */}

            {/* )} */}

            {/* </React.Fragment>                            */}
          </>
        ) : (
          <View
            style={[
              {
                backgroundColor: "#05050310",
                borderRadius: 4,
                margin: 15,
                padding: 15,
              },
            ]}
          >
            <Text>No data</Text>
          </View>
        )}
      </View>
    </>
  );
};
