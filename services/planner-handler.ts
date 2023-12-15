import { DataType, IMyDay, IPreset, IUser } from "../types/day.type";
import database, {
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";
import DayAPI from "./day-api";
import PresetAPI from "./preset-api";
import UserAPI from "./user-api";
class PlannerHandlerAPI {
  async GetDBAllIemsSnapshot(dataType: DataType, key: string) {
    let days: IMyDay[];
    let presets: IPreset[];
    let users: IUser[];

    // database().useEmulator("127.0.0.1", 9000);
    // database().setLoggingEnabled(true);
    let returnBool = false;

    if (dataType === DataType.Planner) {
      const daydata = await DayAPI.HandleDaySnapshot(database(), dataType, key);
      if (daydata.returnBool) {
        days = daydata.tmpDayArr;
        returnBool = daydata.returnBool;
      }
    }
    if (dataType === DataType.Presets) {
      const presetdata = await PresetAPI.HandlePresetSnapshot(
        database(),
        dataType,
        key
      );
      if (presetdata.returnBool) {
        presets = presetdata.tmpPresetArr;
        returnBool = presetdata.returnBool;
      }
    }
    if (dataType === DataType.User) {
      const userdata = await UserAPI.HandleUserSnapshot(
        database(),
        dataType,
        key
      );
      if (userdata.returnBool) {
        users = userdata.users;
        returnBool = userdata.returnBool;
      }
    }
    return { snapshotFound: returnBool, data: { days, presets, users } };
  }

  async UpdateUserData(key: string, userData: IUser) {
    const userdata = await UserAPI.UpdateUserData(database(), key, userData);
    console.log("Updated user???");
  }

  async GetDBSnapshotCount(dataType: DataType) {
    let activityCount = 0;
    let presetCount = 0;
    let userCount = 0;
    // let databaseReference: DatabaseReference | null = null
    // let dbActivitySnapshot: DataSnapshot | null | undefined;
    // let dbPresetSnapshot: DataSnapshot | null | undefined;

    // db.useEmulator("127.0.0.1", 9000);
    // const dataTypeArr = [DataType.Planner, DataType.Presets, DataType.User];
    // await dataTypeArr.forEach(async (dataType) => {
    console.log(`${dataType}`);
    switch (dataType) {
      case DataType.Planner:
        if (true) {
          const db = database();
          await db
            .ref(`${dataType}`)
            .once("value")
            .then((snapshot) => {
              if (snapshot.exists() && snapshot.hasChildren) {
                console.log(
                  "Snapshot found," +
                    dataType +
                    " data: " +
                    snapshot.numChildren()
                );
                activityCount = snapshot.numChildren();
              }
            })
            .catch((e) => {
              console.log(e);
            })
            .finally(() => {});
        }
        break;
      case DataType.Presets:
        if (true) {
          const db = database();
          await db
            .ref(`${dataType}`)
            .once("value")
            .then((snapshot) => {
              if (snapshot.exists() && snapshot.hasChildren) {
                console.log(
                  "Snapshot found," +
                    { dataType } +
                    " data:  " +
                    snapshot.numChildren()
                );
                presetCount = snapshot.numChildren();
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
        break;
      case DataType.User:
        if (true) {
          const db = database();
          await db
            .ref(`${dataType}`)
            .once("value")
            .then((snapshot) => {
              if (snapshot.exists() && snapshot.hasChildren) {
                console.log(
                  "Snapshot found," +
                    { dataType } +
                    " data:  " +
                    snapshot.numChildren()
                );
                userCount = snapshot.numChildren();
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
        break;
      default:
        break;
    }
    // } catch (error) {
    //   console.log(error);
    // }
    // });
    console.log(activityCount);

    // });

    return { activityCount, presetCount, userCount };
  }
  // async GetDbOne(dataType: DataType, key: number) {
  //   const databaseReference = await GetDbref(dataType, `/${key}/`);
  //   // orderByChild('name'));

  //   return databaseReference;
  // }

  // InsertDay(day: IMyDay) {
  //   // const db = getDatabase();
  //   set(GetDbref(DataType.Planner, `${day.Id}`), day).catch((e) => {
  //     console.error("Error inserting activity: ", e);
  //     return e;
  //   });
  // }

  // async UpdateMyDayItemDb(key: number, theActivity: IMyDay | null) {
  //   try {

  //     if (theActivity === null) {
  //       console.log("No activity data");
  //       return null
  //     }
  //     const updates = {};
  //     updates['/planner/' + key] = theActivity
  //     console.log("Add result: ")
  //     return update(GetDbref(DataType.Planner), updates)
  //   }
  //   catch (e) {
  //     console.error("Error updating activity: ", e);
  //     return e
  //   }
  // }
  // RemoveDayItemDb(key: number) {
  //   return remove(GetDbref(DataType.Planner,`${key}`)).then(() =>
  //     console.log("Removed activity")
  //   ).catch((e) =>
  //     console.log(e)
  //   )
  // }
  // RemoveDayActivityItemDb(dayKey: number, activityKey: number) {
  //   // const itemref = `/planner/${dayKey}/Activities/${activityKey}`
  //   const updates = {};
  //   updates[`/planner/${dayKey}/Activities/${activityKey}`] = null
  //   console.log("Cleared activity: " + activityKey)
  //   update(GetDbref(DataType.Planner), updates).then(() =>
  //     console.log("Done removing activity?")
  //   ).catch((e) =>
  //     console.log(e)
  //   )
  // }

  // InsertPreset(preset: IPreset) {
  //   if (preset) {

  //     const db = getDatabase();
  //     set(GetDbref(DataType.Presets,`${preset.Id}`), preset)
  //     .catch((e) => {
  //       console.error("Error inserting preset: ", e);
  //       return e
  //     });
  //   }
  // }

  // async UpdatePresetItemDb(key: number, alteredPreset: IPreset | null) {
  //   try {

  //     if (alteredPreset === null) {
  //       console.log("No preset data");
  //       return null
  //     }
  //     const updates = {};
  //     updates['/presets/' + key] = alteredPreset
  //     console.log("Updating preset...")
  //     return update(GetDbref(DataType.Presets), updates)
  //   }
  //   catch (error) {
  //     console.error("Error updating preset: ", error);
  //   }
  // }

  // RemovePresetItemDb(key: number) {
  //   return remove(GetDbref(DataType.Presets,`${key}`)).then(() =>
  //     console.log("Removed preset")
  //   ).catch((e) =>
  //     console.log(e)
  //   )
  // }

  // RemovePresetActivityItemDb(dayKey: number, activityKey: number) {
  //   const updates = {};
  //   updates[`/presets/${dayKey}/Activities/${activityKey}`] = null
  //   console.log("Cleared activity: " + activityKey)
  //   update(GetDbref(DataType.Presets), updates).then(() =>
  //     console.log("Done removing preset activity?")
  //   ).catch((e) =>
  //     console.log(e)
  //   )
  // }

  // inintDb() {
  //   const db = getDatabase();
  //   return db.app.name;
  // }

  // async createdb(day: IDay) {
  //   try {
  //     const db = getDatabase();
  //     console.log("Create pre preset: ");
  //     console.log(day)
  //     if (day === null)
  //       return null
  //     // day =
  //     // {
  //     //   name: "dbName",
  //     //   formiddag: "dbform",
  //     //   ettermiddag: "dbetterm",
  //     //   natt: "dbnatt",
  //     //   submitted: false
  //     // } as IDay;
  //     const result = push(useTheRef(db, '/'), day)
  //       .then(() => {
  //         console.log("Item added success");
  //       }).catch((e) => {
  //         console.log("Error")
  //         console.log(e);
  //       });

  //     console.log("Add-set result: ")
  //     console.log(result);
  //     return result

  //   } catch (e) {
  //     console.error("Error adding : ", e);
  //     return e
  //   }
  // }
}

export default new PlannerHandlerAPI();
