import { signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";


export const RegisterApi=(email,password)=>{
    try {
        let response=createUserWithEmailAndPassword(auth, email, password);
        return response;
    } catch (error) {
        return error;
    }
}

export const LoginApi=(email, password)=>{
    try {
        let response=signInWithEmailAndPassword(auth,email,password);
        return response;
    } catch (error) {
        return error;
    }
}

export const getUser=()=>{
      return auth.currentUser;
}

export const getLoggedOut=()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signout successfully");
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
}