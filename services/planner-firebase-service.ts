import { useState } from "react";
import IDay, { DataType, IMyDay, IPreset } from "../types/day.type";
// import  {  getDatabase, onValue, set, update, get, push, orderByKey, orderByChild, child, DatabaseReference, remove, ref, Database, DataSnapshot } from "@react-native-firebase/database";
// import  {firebase}from "@react-native-firebase/database";
import  database, { FirebaseDatabaseTypes } from "@react-native-firebase/database";

// import React, { Suspense, useEffect, useState } from "react";

// const db = getDatabase();

// function GetDbref(dataType: DataType, childData: string |null = null) {    
//   console.log("Connecting to db...");    
//   const  databaseReference = database().ref(`/${dataType}`+ childData ?? '')
//   return databaseReference;
// }
// const dbRef = GetDbref(dataType)
class PlannerAPI {
  
  HandleDaySnapshot = (snapshot: FirebaseDatabaseTypes.DataSnapshot) =>{
    // const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>());
    let tmpDayArr : Array<IMyDay> = []
   alert("Test")
    snapshot.forEach(function (childSnapshot) {
      try{ 
      const key = childSnapshot.key;
        const values = childSnapshot.val();
        const childData: IMyDay = {
          Id: Number.parseInt(key ?? "0"),
          Name: values.Name,
          Description: values.Descritption,
          Activities: values.Activities,
        };
        childData.Id = Number.parseInt(key ?? "0");
        console.log("Handle day snapshot:")
        console.log(childData)
        tmpDayArr.push(childData)        
      }
      catch(e)
      {
        console.log(e)
        return true
      }  
      })
      // setDays(tmpUserArr)
      return tmpDayArr   
  }
HandlePresetSnapshot = (snapshot: FirebaseDatabaseTypes.DataSnapshot) =>{
    // const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>());
    let tmpPresetArr : Array<IMyDay> = []
   alert("Trest")
    snapshot.forEach(function (childSnapshot) {
      try{ 
      const key = childSnapshot.key;
        const values = childSnapshot.val();
        const childData: IMyDay = {
          Id: Number.parseInt(key ?? "0"),
          Name: values.Name,
          Description: values.Descritption,
          Activities: values.Activities,
        };
        childData.Id = Number.parseInt(key ?? "0");
        console.log("Handle preset snapshot:")
        console.log(childData)
        tmpPresetArr.push(childData)        
      }
      catch(e)
      {
        console.log(e)
        return true
      }  
      })
      // setDays(tmpUserArr)
      return tmpPresetArr   
  }
  async GetDBAllIemsSnapshot(dataType: string) {
    let snapshotData = []
    const db = database();
    db.useEmulator("127.0.0.1",9000);
    const dbRef = db.ref(`/${dataType}`);
    // let Snapshot: DataSnapshot | null | undefined;
   let returnBool = false;
    // console.log( dbRef.toJSON())
       await dbRef.once('value').then((snapshot) => {
          if (snapshot.exists()) {
            returnBool = true;
            // databaseReference = dbRef;
            console.log("Snapshot found,"+ {dataType}+" data:");
             if(snapshot.hasChildren())
            //  for (let index = 0; index < snapshot.numChildren(); index++) {
            //   const element = snapshot.val();
              console.log("Children: " + snapshot.numChildren())
            //  }
            // console.log(item.toJSON());
            snapshotData = (dataType === 'planner') 
              ? 
              this.HandleDaySnapshot(snapshot)
              : 
              this.HandlePresetSnapshot(snapshot)
          } 



             });
  return {snapshotFound:returnBool, data:snapshotData};
            // return {snapshot};
  }
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

export default new PlannerAPI();
