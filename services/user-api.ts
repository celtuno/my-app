import { DataType, IUser } from "../types/day.type";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";

class UserAPI {
  HandleUserSnapshot = async (
    dbRef: FirebaseDatabaseTypes.Module,
    dataType: DataType,
    key: string
  ) => {
    let tmpUserArr: Array<IUser> = [];
    let returnBool = false;
    //  alert("Users")
    const queryPath: string = dataType + "/" + key;

    await dbRef
      .ref(queryPath)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          returnBool = true;
          console.log("Snapshot found, user data:");
          // console.log(snapshot.val());
          if (snapshot.hasChildren())
            console.log("Children: " + snapshot.numChildren());
          snapshot.forEach(function (childSnapshot) {
            try {
              if (!childSnapshot.exists()) return;
              const key = childSnapshot.key;
              const values = childSnapshot.val();
              const childData: IUser = {
                Id: Number.parseInt(key ?? "0"),
                Name: values.Name,
                Days: values.Days,
                LastDay: values.LastDay,
                Presets: values.Presets,
                Config: values.Config,
              };
              childData.Id = Number.parseInt(key ?? "0");
              // console.log("Handle user snapshot:");
              // console.log(childData);
              tmpUserArr.push(childData);
            } catch (e) {
              console.log(e);
              return true;
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return { returnBool, users: tmpUserArr };
  };

  SearchUserData = async (query: string, users: IUser[]) => {
    let tmpuser: IUser = {
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
    if (!users) return;

    users.forEach((user) => {
      const userNameMatch = user.Name;
      // console.log(userNameMatch);
      if (query === userNameMatch) {
        const childData: IUser = {
          Id: user.Id ?? 0,
          Name: user.Name,
          Days: user.Days,
          LastDay: user.LastDay,
          Presets: user.Presets,
          Config: user.Config,
        };

        tmpuser = childData;
        console.log(`User: ` + tmpuser);
        return true;
      }
    });
    return { tmpuser };
  };

  UpdateUserData = async (
    dbRef: FirebaseDatabaseTypes.Module,
    key: string,
    theUser: IUser | null
  ) => {
    // try {
    if (theUser === null) {
      console.log("No user data");
      return null;
    }
    const updates = {};
    const path = "/user/" + key;
    updates["/user/" + key] = theUser;
    console.log("Add result: ");
    await dbRef
      .ref(path)
      .update(theUser)
      .then((result) => {
        console.log("Updating");
      })
      .catch((e) => {
        // } catch (e) {
        console.error("Error updating user: ", e);
        return e;
      });
    // }
  };
  // UpdateUser = async (userId: number, user: IUser) => {
  //   if (userId === undefined || userId === null || userId === 0) {
  //     console.log("No id provided, creating new...");
  //     const userData = await this.HandleUserSnapshot();
  //     if (!user) return;
  //     let id = userId;
  //     if (userData.topId > id) {
  //       id = userData.topId;
  //       user.Id = userData.topId;
  //     }

  //     if (id === 0) return;
  //   }
  //   console.log("Updating user");
  //   userFirebaseService
  //     .UpdateUserItemDb(user.Id, user)
  //     .then(() => console.log("Updated user"))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
}
export default new UserAPI();
