import React, { Dispatch, SetStateAction } from "react";
import { useContext, createContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { User as FirebaseUser } from "firebase/auth";
import useCheckUser from "../hooks/useCheckUser";

interface AuthContextInterface {
	googleSignIn: () => void;
    twitterSignIn: () => void;
    githubSignIn: () => void;
	logOut: () => void;
	user: FirebaseUser | null;
}

const AuthContext = createContext<AuthContextInterface>(null!);

type AuthProps = {
	children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProps) => {
	const [user, setUser] = useState<FirebaseUser | null>(null);

	const googleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		if (!result.user) {
			throw new Error("No user found");
		}
	};

    const twitterSignIn = async () => {
		const provider = new TwitterAuthProvider();
		const result = await signInWithPopup(auth, provider);
		if (!result.user) {
			throw new Error("No user found");
		}
	};

    const githubSignIn = async () => {
		const provider = new GithubAuthProvider();
		const result = await signInWithPopup(auth, provider);
		if (!result.user) {
			throw new Error("No user found");
		}
	};

	const logOut = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ googleSignIn, twitterSignIn, githubSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
