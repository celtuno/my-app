// import { config } from "./config-fb_planner";
// import { initializeApp, setLogLevel } from "firebase/app";
// import {
//     Database,
//   connectDatabaseEmulator,
//   getDatabase,
//   onValue,
//   ref,
// } from "firebase/database";
// import {
//   addDoc,
//   collection,
//   getDocs,
//   getFirestore,
//   where,
//   query,
// } from "firebase/firestore";
// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInAnonymously,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// const app = () => {
//   const apiKey = process.env.REACT_APP_APIKey ?? "";
//   config.apiKey = apiKey;
//   if (process.env.NODE_ENV === 'development')
//       setLogLevel('debug')
//   const tmpApp = initializeApp(config);
//   return tmpApp;
// };
// export const auth = getAuth(app());
// export const firestore = getFirestore(app());
// export const googleProvider = new GoogleAuthProvider();
// // export const useTheOnValue = onValue;
// // export const useTheRef = ref
// let tmpDb :Database |null | undefined = null
// export const db = () => {
//     if (tmpDb === null){
//     tmpDb = getDatabase(app());
//     if (
//       location.hostname === "localhost" &&
//       process.env.NODE_ENV === "development"
//     ) {
//       // Point to the RTDB emulator running on localhost.
//       connectDatabaseEmulator(tmpDb, "127.0.0.1", 9000);
//     }
//     }
//   return tmpDb;
// };

// export const SignOut = async () => {
//   signOut(auth)
//     .then(() => {
//       console.log("Sign-out successful");
//       // Sign-out successful.
//     })
//     .catch((error) => {
//       console.log("Error signing out: " + error);
//       // An error happened.
//     });
// };

// export const SignInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(
//       collection(firestore, "users"),
//       where("uid", "==", user.uid)
//     );
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(firestore, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//     let result = -1;
//     if (user) result = 1;
//     return result;
//   } catch (err: any) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// export const SignInAnonymously = async () => {
//   signInAnonymously(auth)
//     .then(() => {
//       // Signed in..
//     })
//     .catch((error) => {
//       // const errorCode = error.code;
//       // const errorMessage = error.message;
//       console.error(error);
//       alert(error.message);
//       // ...
//     });
// };

// export default app;
