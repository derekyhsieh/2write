import React, { Dispatch, SetStateAction } from "react";
import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { auth } from "../services/firebase"
import { User as FirebaseUser } from "firebase/auth"
import useCheckUser from "../hooks/useCheckUser";



interface AuthContextInterface {
    googleSignIn: () => void,
    logOut: () => void,
    user: FirebaseUser | null,
}

const AuthContext = createContext<AuthContextInterface>(null!)

type AuthProps = {
    children: React.ReactNode;
}

export const AuthContextProvider = ({children}: AuthProps) => {

    const [user, setUser] = useState<FirebaseUser | null>(null)



    const googleSignIn = () => {

        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {


        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

               
                setUser(currentUser)

        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}