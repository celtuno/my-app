import { DataType, IMyDay, IPreset } from "../types/day.type";
import database, {
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";

class PresetAPI {
  HandlePresetSnapshot = async (
    dbRef: FirebaseDatabaseTypes.Module,
    dataType: DataType,
    key: string
  ) => {
    let tmpPresetArr: Array<IPreset> = [];
    let returnBool = false;
    //  alert("Presets")
    const queryPath: string = dataType + "/" + key;

    await dbRef
      .ref(queryPath)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          returnBool = true;
          console.log("Snapshot found, preset data:");
          // console.log(snapshot.val());
          if (snapshot.hasChildren())
            console.log("Children: " + snapshot.numChildren());
          snapshot.forEach(function (childSnapshot) {
            try {
              if (!childSnapshot.exists()) return;
              const key = childSnapshot.key;
              const values = childSnapshot.val();
              const childData: IPreset = {
                Id: Number.parseInt(key ?? "0"),
                Name: values.Name,
                Description: values.Descritption,
                Activities: values.Activities,
              };
              childData.Id = Number.parseInt(key ?? "0");
              // console.log("Handle preset snapshot:");
              // console.log(childData);
              tmpPresetArr.push(childData);
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
    return { returnBool, tmpPresetArr };
  };

  UpdatePreset = async (
    dbRef: FirebaseDatabaseTypes.Module,
    key: string,
    thePresets: IPreset | null
  ) => {
    if (thePresets === null) {
      console.log("No user data");
      return null;
    }
    const updates = {};
    const path = "/presets/" + key;
    updates["/presets/" + key] = thePresets;
    console.log("Add result: ");
    await dbRef
      .ref(path)
      .update(thePresets)
      .then((result) => {
        console.log("Updating preset");
      })
      .catch((e) => {
        console.error("Error updating preset: ", e);
        return e;
      });
  };
  // async GetDBSnapshotCount(dataType: DataType) {
  //   let activityCount = 0;
  //   let presetCount = 0;
  //   // let databaseReference: DatabaseReference | null = null
  //   // let dbActivitySnapshot: DataSnapshot | null | undefined;
  //   // let dbPresetSnapshot: DataSnapshot | null | undefined;

  //   const db =database();
  //   db.useEmulator("127.0.0.1",9000);
  //   const dbRef = db.ref(`/${dataType}`);
  //     dbRef.on('value', snapshot => {
  //        console.log('User data: ', snapshot.val());
  //      });
  //       //  await onValue(dbRef, (snapshot) => {
  //       //   if (snapshot.exists()) {
  //       //     // databaseReference = dbRef;
  //       //     // console.log("Snapshot found,"+ {dataType}+" data:");
  //       //     switch (dataType) {
  //       //       case DataType.Planner:
  //       //         // dbActivitySnapshot = snapshot;
  //       //         activityCount = snapshot.size;
  //       //         break;
  //       //       case DataType.Presets:
  //       //         // dbPresetSnapshot = snapshot;
  //       //         presetCount = snapshot.size;
  //       //         break;
  //       //       // case DataType.Planner:
  //       //       //   break;
  //       //       default:
  //       //         break;
  //       //     }
  //       //   }
  //       // });

  //     const returnData = dataType === DataType.Planner ?  activityCount : presetCount;
  //   return returnData;
  // }
  // async GetDbOne(dataType: DataType, key: number) {

  //     const databaseReference = await  GetDbref(dataType,`/${key}/`)
  //     // orderByChild('name'));

  //   return databaseReference;
  // }

  // InsertDay(day: IMyDay) {
  //   // const db = getDatabase();
  //   set(GetDbref(DataType.Planner,`${day.Id}`), day)
  //   .catch((e) => {
  //     console.error("Error inserting activity: ", e);
  //     return e
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

export default new PresetAPI();
