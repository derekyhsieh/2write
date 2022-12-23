import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { convertEditorJSONToPlainText } from "../utils/ExtractEditorJSON";

// saving user essay document in firestore
// documentation says tiptap sanitizes html to only allow tags so we should be ok with saving html output converted to string directly

const saveEssay = async (docContent: string, userID: string, essayID: string) => {
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

const loadEssay = async (userID: string, essayID: string) => {

    const essayRef = doc(db, "users", userID, "essays", essayID)

    const essaySnap = await getDoc(essayRef)


    if(essaySnap.exists()) {
        return essaySnap.data()
    } else {
        // no essay 
        console.log("Essay does not exist")
    }


}


const createEssay = async (userID: string, essayID: string, essayPrompt?: string) => {
    // generate essay ID with "crypto.randomUUID()" outside of this function
    
    const essayRef = doc(db, "users", userID, "essays", essayID);

    try {
        await setDoc(essayRef, {
            timestamp: serverTimestamp(),
            lastEdit: serverTimestamp(),
            content: "",
            essayPrompt: essayPrompt,
        })
    } catch(error) {
        console.log(error);
    }
    

}





export {saveEssay, createEssay, loadEssay}
