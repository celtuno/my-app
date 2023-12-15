import React, { useState } from "react";
import { Dimensions, Text, View, Button, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../styles/classStyles";
import { IUser } from "../../types/day.type";
import AuthAPI from "../../services/auth-api";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User } from "@react-native-google-signin/google-signin";

type Props = {
  name: string;
  authuser?: User | null | undefined;
  dbusers?: Array<IUser> | null | undefined;
  navigation;
};

export const Login: React.FC<Props> = ({
  name,
  authuser,
  dbusers,
  navigation,
}) => {
  const [user, setUser] = useState<IUser>();
  const userPhotURL = auth().currentUser?.photoURL;
  const { width } = Dimensions.get("window");

  const getInitials = (name: string) => {
    return name
      .match(/(\b\S)?/g)
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("")
      .toUpperCase();
  };
  return (
    <>
      {/* <Button onPress={GetData} title="Check data"></Button> */}
      <View>
        {/* style={styles.textBlock}> */}
        {!auth().currentUser ? (
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
            {/* <React.Fragment>
                        <Text  style={styles.heading} >Login</Text>
                    </React.Fragment> */}
            <React.Fragment>
              <View>
                <View style={{ marginBottom: 2 }}>
                  <Button
                    //   className={"login__btn"}
                    onPress={() => {
                      AuthAPI.SignInFunc("anonymous").finally(() => {
                        if (auth().currentUser) navigation.navigate("Home");
                      });
                    }}
                    title="Login anonymously"
                    //   <Person sx={{ m: "15px" }} /> Login anonymously{" "}
                  />
                </View>
                {/* <GoogleSigninButton
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={() =>AuthAPI.SignInFunc("google")}
                                    disabled={false}
                                    /> */}
                <View style={{ marginBottom: 2 }}>
                  <Button
                    //   className="login__btn login__google"
                    onPress={async () =>
                      await AuthAPI.SignInFunc("google").finally(() => {
                        if (auth().currentUser) {
                          navigation.navigate("Home");
                          console.log("User: true");
                        } else console.log("User: false");
                      })
                    }
                    title="Login with Google"
                    //  <Google sx={{ m: "15px" }} /> Login with Google{" "}
                  />
                </View>
                <View style={{ marginBottom: 2 }}>
                  <Button
                    //   className={"login__btn "}
                    disabled={true}
                    onPress={() => AuthAPI.SignInFunc("apple")}
                    title="Login with Apple"
                    //   <Apple sx={{ m: "15px" }} />
                  />
                </View>
                <View style={{ marginBottom: 2 }}>
                  <Button
                    //   className={"login__btn "}
                    disabled={true}
                    onPress={() => AuthAPI.SignInFunc("facebook")}
                    title="Login with Facebook"
                    //   <Facebook sx={{ m: "15px" }} />
                  />
                </View>
              </View>
            </React.Fragment>
          </View>
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
            <Pressable
              onPress={() => navigation.navigate("Settings")}
              style={{ marginBottom: 23 }}
            >
              <View style={[styles.containerLogin, { width: width }]}>
                {/* <Text style={styles.textBlock}>Logged in as</Text> */}
                <View
                  style={[
                    styles.textColumnLogin,
                    { marginBottom: 14, flexGrow: 3 },
                  ]}
                >
                  <Text>Logged in as:</Text>
                  <Text style={styles.subheading}>
                    {" "}
                    {auth().currentUser.displayName
                      ? auth().currentUser.displayName
                      : "Anonymous"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.textColumnLogin,
                    { marginLeft: 13, flexGrow: 1 },
                  ]}
                >
                  {auth().currentUser.photoURL ? (
                    <Avatar.Image size={32} source={{ uri: userPhotURL }} />
                  ) : auth().currentUser.displayName ? (
                    <Avatar.Text
                      label={getInitials(auth().currentUser.displayName)}
                      size={32}
                      style={{ marginLeft: 18 }}
                    />
                  ) : (
                    <Avatar.Icon
                      icon={"account"}
                      size={32}
                      style={{ marginLeft: 18 }}
                    />
                  )}
                </View>
              </View>
            </Pressable>
            <View style={[styles.button, { marginTop: 23 }]}>
              <Button title="Logout" onPress={AuthAPI.SignOut} />
            </View>
          </View>
        )}
      </View>
    </>
  );
};
