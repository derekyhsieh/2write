import React, {Dispatch, SetStateAction} from "react";
import { useContext, createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged} from "firebase/auth"
import {auth} from "../services/firebase"
import {User as FirebaseUser} from "firebase/auth"
import useCheckUser from "../hooks/useCheckUser";



interface AuthContextInterface {
    googleSignIn: () => void,
    logOut: () => void,
    user: FirebaseUser | null,
    loggedInUser: string | React.Dispatch<React.SetStateAction<string | null>> | null,
    isLoading: boolean
}

const AuthContext = createContext<AuthContextInterface | null>(null)

export const AuthContextProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<FirebaseUser | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser, checkUserState] = useCheckUser();



    const googleSignIn = () => {
   
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
    }

    const logOut = () => {
        setUser(null)
        setLoggedInUser(null)
        localStorage.clear();
        signOut(auth)
    }

    useEffect(() => {
        console.log(loggedInUser)

        if(loggedInUser == null) {
            // setIsLoading(true)
        }

            setUser(JSON.parse(loggedInUser))

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // setUser(currentUser)
            checkUserState()
        
            if(user == null) {
                setUser(currentUser)

                localStorage.setItem('user', JSON.stringify(currentUser))
                setIsLoading(false)
            }

            
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user, loggedInUser, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}