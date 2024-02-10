/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
  verifyPasswordResetCode,
  confirmPasswordReset,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  applyActionCode,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  QueryConstraint,
  deleteDoc,
  onSnapshot,
  writeBatch,
  WriteBatch,
  FirestoreError,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import {
  getDatabase,
  ref as dbRef,
  query as dbQuery,
  QueryConstraint as DBQueryConstraint,
  child,
  get,
} from "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  HttpsCallableResult,
  getFunctions,
  httpsCallable,
} from "firebase/functions";

const app = !getApps().length
  ? initializeApp({
      apiKey: "AIzaSyBvVElN86GiVvNcGUTUMmpe9_9fzoxvoqg",
      authDomain: "ecomspy-blk.firebaseapp.com",
      databaseURL: "https://ecomspy-blk-default-rtdb.firebaseio.com",
      projectId: "ecomspy-blk",
      storageBucket: "ecomspy-blk.appspot.com",
      messagingSenderId: "583935764907",
      appId: "1:583935764907:web:d6d5362a9cd69e296fcaee",
      measurementId: "G-H8S273NMMR",
    })
  : getApp();

class FirebaseService {
  //private app: FirebaseApp = !getApps().length
  //  ? initializeApp({
  //      apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  //      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  //      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  //      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  //      messagingSenderId:
  //        import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  //      appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
  //      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "",
  //    })
  //  : getApp();
  public static instance?: FirebaseService;

  private constructor() {}

  public static getInstance = () => {
    if (this.instance) return this.instance;
    else {
      this.instance = new FirebaseService();
      return this.instance;
    }
  };

  // firebase services _____________________________

  //public get firestore() {
  //  return getFirestore(app);
  //}

  //public get auth() {
  //  return getAuth(app);
  //}

  //public get database() {
  //  return getDatabase(app);
  //}

  //public get functions() {
  //  return getFunctions(app);
  //}

  //public get storage() {
  //  return getStorage(app);
  //}

  //public get writeBatch() {
  //  return writeBatch(getFirestore(app));
  //}

  // firebase cloud methods _____________________________

  public callFunction<T, R>(
    name: string,
    data: T
  ): Promise<HttpsCallableResult<R>> {
    const callable = httpsCallable<T, R>(getFunctions(app), name);
    return callable(data);
  }

  // user management methods _____________________________

  user() {
    return getAuth(app).currentUser;
  }

  public async loginWithEmail(
    email: string,
    password: string
  ): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(getAuth(app), email, password);
    } catch (error: any) {
      console.log(error.code);
      const friendlyErrorMessage =
        this.handleFirebaseError(error.code) || error.message;
      // You can then either throw this new error message, or resolve it
      throw new Error(friendlyErrorMessage);
    }
  }

  public loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuth(app), provider);
  }

  public loginWithFacebook(): Promise<UserCredential> {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(getAuth(app), provider);
  }

  public logout() {
    signOut(getAuth(app));
  }

  // firestore methods _____________________________

  public setDocument<T extends WithFieldValue<DocumentData>>(
    path: string,
    data: T
  ): Promise<void> {
    return setDoc(doc(getFirestore(app), path), data);
  }

  public mergeDocument(path: string, data: any): Promise<void> {
    return setDoc(doc(getFirestore(app), path), data, { merge: true });
  }

  public addDocument<T extends WithFieldValue<DocumentData>>(
    path: string,
    data: T
  ): Promise<DocumentReference<any>> {
    return addDoc(collection(getFirestore(app), path), data);
  }

  public async getDocument(path: string): Promise<DocumentSnapshot> {
    return getDoc(doc(getFirestore(app), path));
  }
  public async getDocuments(
    path: string,
    queries: Array<QueryConstraint>
  ): Promise<QuerySnapshot> {
    try {
      const ref = collection(getFirestore(app), path);
      const q = query(ref, ...queries);

      const res = await getDocs(q);

      return res;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  public streamDocument(
    path: string,
    callback: (doc: DocumentSnapshot) => void
  ) {
    return onSnapshot(doc(getFirestore(app), path), callback);
  }

  public async streamDocuments(
    path: string,
    queries: Array<QueryConstraint>,
    callback: (docs: QuerySnapshot) => void,
    onError?: (error: FirestoreError) => void
  ) {
    const ref = collection(getFirestore(app), path);
    const q = query(ref, ...queries);

    return onSnapshot(q, callback, onError);
  }

  public deleteDocument(path: string): Promise<void> {
    return deleteDoc(doc(getFirestore(app), path));
  }

  // databse methods _____________________________

  public async getData(path: string) {
    return get(child(dbRef(getDatabase()), path));
  }

  public async getListData(path: string, queries: DBQueryConstraint[]) {
    return get(dbQuery(dbRef(getDatabase(), path), ...queries));
  }

  public async initializeMessaging() {
    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey:
        "BPeXREwNKoWcsfpfqwtEgyMyvHa-xYs_ZUN1iYFvy-zXWqWRd1cRRweLIFyz5QjUTtFSTWEoxOdl2Ojv_TCcXUg",
    });
    if (token && this.user) {
      this.setDocument(`messagingTokens/${this.user()?.uid}`, { token });
    } else {
      console.log("invalid FCM token");
    }
  }

  public subscribeToTokenChange(callback: (user: User | null) => void) {
    getAuth(app).onIdTokenChanged(callback);
  }

  public resetPassword(email: string = "") {
    const user = this.user;
    return sendPasswordResetEmail(getAuth(app), user()?.email || email);
  }

  // send email verification link
  public sendEmailVerification() {
    const user = getAuth(app).currentUser;
    if (!user) {
      return;
    }
    return sendEmailVerification(user, {
      // get base url from nextjs
      url: `${import.meta.env.VITE_BASE_URL}/verify-email`,
      handleCodeInApp: true,
    });
  }

  // verify email verification link
  public verifyEmailVerification(code: string) {
    return applyActionCode(getAuth(app), code);
  }

  public verifyPasswordResetCode(code: string) {
    verifyPasswordResetCode(getAuth(app), code);
  }

  public confirmPasswordReset(code: string, newPassword: string) {
    confirmPasswordReset(getAuth(app), code, newPassword);
  }

  public async uploadFile(path: string, file: File): Promise<string> {
    const storage = getStorage(app);
    const storageRef = ref(storage, path);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    const url = getDownloadURL(uploadTask.ref);
    return url;
  }

  public setDataInBatch(path: string, data: any, batch?: WriteBatch) {
    if (!batch) {
      return writeBatch(getFirestore(app));
    }
    batch.set(doc(getFirestore(app), path), data);
    return batch;
  }

  public updateDataInBatch(path: string, data: any, batch?: WriteBatch) {
    if (!batch) {
      return writeBatch(getFirestore(app));
    }
    batch.update(doc(getFirestore(app), path), data);
    return batch;
  }

  public deleteDataInBatch(path: string, batch?: WriteBatch) {
    if (!batch) {
      return writeBatch(getFirestore(app));
    }
    batch.delete(doc(getFirestore(app), path));
    return batch;
  }

  public async commitBatch(batch: WriteBatch) {
    return batch.commit();
  }

  public onAuthChanged(callback: (user: User | null) => void) {
    return getAuth(app).onAuthStateChanged(callback);
  }

  handleFirebaseError(code: string): string {
    if (firebaseErrorMap[code]) {
      return firebaseErrorMap[code];
    }
    // Default error message
    return "An unknown error occurred";
  }
}

const firebaseErrorMap: Record<string, string> = {
  // Firebase Authentication errors
  "auth/wrong-password": "Invalid email/password",
  "auth/user-not-found": "No account found with this email",
  "auth/user-disabled": "This account has been disabled",
  "auth/email-already-in-use":
    "The email address is already in use by another account",
  "auth/invalid-email": "The email address is not valid",
  "auth/operation-not-allowed": "Operation not allowed",
  "auth/weak-password": "The password is too weak",
  "auth/invalid-login-credentials": "Invalid login credentials",

  // Firebase Firestore errors
  "firestore/permission-denied":
    "You don't have permission to perform this operation",
  "firestore/unavailable":
    "The service is currently unavailable, please try again later",
  "firestore/cancelled": "The operation was cancelled",
  "firestore/unknown": "An unknown error occurred",

  // Firebase Cloud Functions errors
  "functions/unknown": "An unknown error occurred",
  "functions/cancelled": "The operation was cancelled",
  "functions/invalid-argument":
    "The function was called with invalid arguments",
  "functions/deadline-exceeded":
    "The function execution time exceeded the deadline",
  "functions/resource-exhausted":
    "The function ran out of resources during execution",
  "functions/not-found": "The function does not exist",
  "functions/already-exists": "The function already exists",
  "functions/permission-denied":
    "You do not have permission to execute this function",
  "functions/unauthenticated": "The function requires authentication",
  "functions/unavailable": "The function is currently unavailable",
  "functions/internal": "An internal error occurred in the function",

  // Firebase Storage errors
  "storage/canceled": "The operation was cancelled",
  "storage/unknown": "An unknown error occurred",
  "storage/invalid-argument": "The function was called with invalid arguments",
  "storage/quota-exceeded":
    "Quota on your Firebase Storage bucket has been exceeded",
  "storage/permission-denied": "You do not have permission to access this file",
  "storage/unauthorized": "You do not have permission to access this file",
};

export default FirebaseService.getInstance();
