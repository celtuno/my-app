import React, { useState } from "react";
import { DataType, IUser } from "../types/day.type";
import PlannerHandlerAPI from "./planner-handler";
import database, {
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  GoogleSignin,
  User,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import UserApi from "./user-api";
import { Button } from "react-native";
GoogleSignin.configure({
  webClientId:
    "572370352440-in0qfi6j96ichu4ikts5esu2an0o8lgs.apps.googleusercontent.com",
});
class AuthAPI {
  tmpData: Array<IUser> = new Array<IUser>();
  topId = 0;

  HighestUserId = (data: Array<IUser>) => {
    if (data.length > 0) {
      const sortedUsers = data.sort((a, b) => (a.Id > b.Id ? -1 : 1));
      return sortedUsers[0].Id + 1;
    } else return 1;
    // console.log(`GETHIGHEST - Activity-Highest: ${topId}`)
  };

  FetchOneUser = (key: number) => {
    let user: IUser = {
      Id: 0,
      Name: "",
      Days: [],
      Presets: [],
      LastDay: null,
      Config: {
        title: "",
        titleSize: "",
        color1: "",
        color2: "",
        background: "",
        role: "",
      },
    };
    //   if (key) {
    //     database().
    //       .GetDbOne(DataType.User, key)
    //       .then((data) => {
    //         onValue(data, (snapshot) => {
    //           if (snapshot.exists()) {
    //             console.log(
    //               "UserDataManager.tsx: Snapshot found USER setting ONE:"
    //             );
    //             const childData = snapshot.val() as IUser;
    //             childData.Id = key;
    //             user = childData;
    //           }
    //         });
    //       })
    //       .then(() => {
    //         console.log("Fetched user");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    return user.Id === 0 ? null : user;
  };

  //   HandleUserSnapshot = async (dbRef: FirebaseDatabaseTypes.Module) => {
  //   }

  async SignInFunc(logintype: string) {
    switch (logintype) {
      case "google":
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
        break;
      case "apple":
        alert("Disabled");
        break;
      case "facebook":
        alert("Disabled");
        break;
      case "anonymous":
        await auth().signInAnonymously();
        break;
    }
  }
  async SignOut() {
    auth()
      .signOut()
      .then(() => {
        console.log("Sign-out successful");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("Error signing out: " + error);
        // An error happened.
      });
  }

  CheckAuth = async (user: FirebaseAuthTypes.User | null | undefined) => {
    //
    let tmpuser: IUser | null | undefined = null;
    await PlannerHandlerAPI.GetDBAllIemsSnapshot(DataType.User, "").then(
      (response) => {
        const users = response.data.users;

        if (user) {
          if (user.isAnonymous) console.log("Logged in as : anonymous");
          else {
            console.log("Logged in: " + user.displayName + " - " + user.email);
            if (user.email) {
              UserApi.SearchUserData(user.email, users).then((userData) => {
                if (!userData) return;
                if (!userData.tmpuser.Name) {
                  userData.tmpuser.Name === "";
                  console.log("Checkauth:no user found..");
                  return;
                }
                console.log(
                  "Id: " +
                    userData.tmpuser.Id +
                    " Name: " +
                    userData.tmpuser.Name
                );
                tmpuser = userData.tmpuser;
                // console.log("Config");
                // console.log(userData.tmpuser.Config);
              });
            }
            return { authUser: user, dbUser: tmpuser };
          }
        } else console.log("Not logged in: ");
      }
    );
    return { authUser: user, dbUser: tmpuser };
  };
}
export default new AuthAPI();
