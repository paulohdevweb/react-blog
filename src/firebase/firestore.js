import app from "./firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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

// Função para criar uma nova postagem
async function salvarPost(dados) {
  const posts = collection(db, "posts");
  await addDoc(posts, dados);
  console.log("Postagem criada.");
}

// Função para buscar todas as postagens
async function buscarPosts() {
  const posts = collection(db, "posts");
  const resultados = await getDocs(posts);
  const objetos = [];
  resultados.forEach((doc) => {
    const post = doc.data();
    post.id = doc.id; // Adiciona o ID do documento
    objetos.push(post);
  });
  console.log(objetos);
  return objetos;
}

// Função para atualizar uma postagem
async function editarPost(id, dados) {
  const posts = collection(db, "posts");
  const documento = doc(posts, id);
  await updateDoc(documento, dados);
}

// Função para remover uma postagem
async function removerPost(id) {
  const posts = collection(db, "posts");
  const documento = doc(posts, id);
  await deleteDoc(documento);
}

export { salvarUs, buscarUs, removerUs, editarUs };
