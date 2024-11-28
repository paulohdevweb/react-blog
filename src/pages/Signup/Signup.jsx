import { useForm } from "react-hook-form";
import {
  buscarUs,
  editarUs,
  removerUs,
  salvarUs,
} from "../../firebase/firestore";
import React, { useState, useEffect } from "react";
import { cadastrar } from "../../firebase/authentication";

function Signup() {
  const [usuarios, setUsuarios] = useState([]); //lista de usuarios

  const { handleSubmit, register, reset } = useForm();
  const navigate = userNavigate();

  async function salvarUsuario(email, senha, nome) {
    try {
      const usuario = await cadastrar(email, senha);
      await salvarUs({
        email,
        senha,
        nome,
        authId: usuario.uid,
      });
      reset();
      buscarUsuarios();
      window.alert("Usuario Cadastrado.");
      navigate("/login");
    } catch (erro) {
      window.alert("Algo deu Errado.");
      console.error(erro);
    }
  }

  async function buscarUsuarios() {
    const usuarios = await buscarUs();
    setUsuarios(usuarios);
  }

  async function removerUsuario(id) {
    await removerUs(id);
    buscarUsuarios();
  }

  async function editarUsuario(id) {
    // Solicitar o nome ao usuário
    const nome = window.prompt("Digite o nome:");

    // Solicitar o e-mail ao usuário
    const email = window.prompt("Digite o e-mail:");

    // Garantir que pelo menos um dos campos seja preenchido
    if (nome && email) {
      const dados = {};

      if (nome) {
        dados.nome = nome;
      }

      if (email) {
        dados.email = email;
      }

      // Atualizar o documento no Firestore
      await editarUs(id, dados);

      // Atualizar a interface ou realizar outra ação
      buscarUsuarios();
    } else {
      console.log("Nenhum dado foi atualizado.");
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <form onSubmit={handleSubmit(salvarUsuario)}>
      <h1>Cadastre-se</h1>

      <table border="2">
        <tbody>
          {usuarios.map((us) => (
            <tr key={us.id}>
              <td>{us.id}</td>
              <td>{us.nome}</td>
              <td>{us?.email}</td>
              <td>
                <button type="button" onClick={() => removerUsuario(us.id)}>
                  Excluir
                </button>
              </td>
              <td>
                <button type="button" onClick={() => editarUsuario(us.id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" {...register("nome")} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register("email")} />
      </div>
      <div>
        <label htmlFor="senha">Senha</label>
        <input type="password" id="senha" {...register("senha")} />
      </div>
      <button>Criar</button>
    </form>
  );
}

export default Signup;
