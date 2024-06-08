import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	onSnapshot,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

// Add new user document
export const addNewUserDoc = async (uid, email) => {
	const data = {
		uid: uid,
		role: 'developer',
		settings: {},
		email: email,
		photoURL: null,
		employersList: [],
		workHistory: [],
		invoiceList: [],
	};
	try {
		console.log('creating user document...');
		await setDoc(doc(db, 'users', uid), data);
	} catch (error) {
		console.log(error);
	}
};

// Get user document from firestore
export const getUserData = async (uid) => {
	const userDocRef = doc(db, 'users', uid);
	try {
		const docSnap = await getDoc(userDocRef);
		if (docSnap.exists()) {
			return { isError: false, data: docSnap.data() };
		} else {
			return { isError: true, error: 'No user data!' };
		}
	} catch (error) {
		console.log(error);
		return { isError: true, error };
	}
};

// Add new employer to employers list
export const addEmployerToEmployersList = async (uid, employer) => {
	const userDocRef = doc(db, 'users', uid);
	try {
		await updateDoc(userDocRef, {
			employersList: arrayUnion(employer),
		});
	} catch (error) {
		console.log(error);
	}
};

// Remove employer from employers list
export const removeEmployerFromEmployersList = async (uid, employer) => {
	const userDocRef = doc(db, 'users', uid);
	try {
		await updateDoc(userDocRef, {
			employersList: arrayRemove(employer),
		});
	} catch (error) {
		console.log(error);
	}
};

// Save a new work event to workHistory
export const saveWorkEventToWorkHistory = async (uid, workEvent) => {
	console.log('Saving Work Event', workEvent);
	const userDocRef = doc(db, 'users', uid);
	try {
		await updateDoc(userDocRef, {
			workHistory: arrayUnion(workEvent),
		});
		return { isError: false };
	} catch (error) {
		console.log(error);
		return { isError: true, error };
	}
};

// Delete a work event to workHistory
export const deleteWorkEventFromWorkHistory = async (uid, workEvent) => {
	console.log('Deleting Work Event', workEvent);
	const userDocRef = doc(db, 'users', uid);
	try {
		await updateDoc(userDocRef, {
			workHistory: arrayRemove(workEvent),
		});
		return { isError: false };
	} catch (error) {
		console.log(error);
		return { isError: true, error };
	}
};
