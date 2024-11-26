import app from "./firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(app);

// addDoc
// updateDoc
// deleteDoc
// getDoc

async function salvarUs(dados) {
  const usuarios = collection(db, "usuarios");
  await addDoc(usuarios, dados);

  console.log("usuario criado.");
}

async function buscarUs() {
  const usuarios = collection(db, "usuarios");
  const resultados = await getDocs(usuarios);
  const objetos = [];
  resultados.forEach((doc) => {
    const usuarios = doc.data();
    usuarios.id = doc.id;
    objetos.push(usuarios);
  });

  console.log(objetos);

  return objetos;
}

async function removerUs(id) {
  const usuarios = collection(db, "usuarios");
  const documento = doc(usuarios, id);
  await deleteDoc(documento);
}

async function editarUs(id, dados) {
  const usuarios = collection(db, "usuarios");
  const documento = doc(usuarios, id);
  await updateDoc(documento, dados);
}

export { salvarUs, buscarUs, removerUs, editarUs };
