import {
	collection,
	addDoc,
	updateDoc,
	serverTimestamp,
	doc,
	setDoc,
	getDoc,
	getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { convertEditorJSONToPlainText } from "../utils/ExtractEditorJSON";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

// export const getLandingPageVideo = () => {
// 	storage.ref('image.jpg').getDownloadURL()
// 	.then((url) => {
// 	  // Do something with the URL ...
// 	})
// }

// saving user essay document in firestore
// documentation says tiptap sanitizes html to only allow tags so we should be ok with saving html output converted to string directly

const saveEssay = async (
	docContent: string,
	userID: string,
	essayID: string,
) => {
	// creating document ref

	const essayRef = doc(db, "users", userID, "essays", essayID);
	try {
		await updateDoc(essayRef, {
			lastEdit: serverTimestamp(),
			content: docContent,
		});
	} catch (error) {
		console.log(error);
	}
};

const saveTitle = async (userID: string, essayID: string, title: string) => {
	const essayRef = doc(db, "users", userID, "essays", essayID);

	try {
		await updateDoc(essayRef, {
			title: title,
		});
	} catch (error) {
		console.log(error);
	}
}

const saveEssayPrompt = async (userID: string, essayID: string, essayPrompt: string) => {
	const essayRef = doc(db, "users", userID, "essays", essayID)

	try {
		await updateDoc(essayRef, {
			essayPrompt: essayPrompt
		});
	} catch (error) {
		console.log(error)
	}
}

const loadEssay = async (userID: string, essayID: string) => {
	const essayRef = doc(db, "users", userID, "essays", essayID);

	const essaySnap = await getDoc(essayRef);

	if (essaySnap.exists()) {
		return essaySnap.data();
	} else {
		// no essay
		console.log("Essay does not exist");
	}
};



const loadEssayList = async (userID: string) => {
	const essayListRef = collection(db, "users", userID, "essays");

	const essayListSnap = await getDocs(essayListRef);
	// Get list of document IDs in the essay collection
	const essayIds = essayListSnap.docs.map((doc) => doc.id);
	const essayList = essayListSnap.docs.map((doc) => doc.data());

	// loop to iterate through essayList and add essayID to each object
	essayList.forEach((essay, index) => {
		essay["essayId"] = essayIds[index];
	});

	return essayList;
};

const createEssay = async (
	userID: string,
	essayID: string,
	essayPrompt?: string
) => {
	// generate essay ID with "uuidv4()" outside of this function

	const essayRef = doc(db, "users", userID, "essays", essayID);

	try {
		await setDoc(essayRef, {
			timestamp: serverTimestamp(),
			lastEdit: serverTimestamp(),
			content: "",
			essayPrompt: essayPrompt,
		});
	} catch (error) {
		console.log(error);
	}
};


const saveNotepad = async (userID: string, essayID: string, notepadContent: string) => {

	const essayRef = doc(db, "users", userID, "essays", essayID);

	try {
		await updateDoc(essayRef, {
			notepad: notepadContent
		})
	} catch (error) {
		console.log(error)
	}

}

export { saveEssay, createEssay, loadEssay, loadEssayList, saveNotepad, saveTitle, saveEssayPrompt};
