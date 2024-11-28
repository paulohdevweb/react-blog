import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "./firebase.config";

const auth = getAuth(app);

async function login(email, senha) {
  const credencial = await signInWithEmailAndPassword(auth, email, senha);
  return credencial.user;
}

async function loginGoogle() {
  const provedor = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provedor);
  return credential.user;
}

async function cadastrar(email, senha) {
  const credential = await createUserWithEmailAndPassword(auth, email, senha);
  return credential.user;
}
export { login, loginGoogle, cadastrar };
