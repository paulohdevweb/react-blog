import { useForm } from "react-hook-form";

function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Função chamada ao submeter o formulário
    function enviarFormulario(dados) {
        console.log("Formulário enviado com sucesso.");
        console.log(dados);
        alert("Formulário enviado com sucesso!");
    }

    return (
        <form
            style={{ padding: "20px" }}
            onSubmit={handleSubmit(enviarFormulario)}
        >
            {/* Nome */}
            <label htmlFor="nome">Nome</label> <br />
            <input
                type="text"
                id="nome"
                {...register("nome", {
                    required: "O nome é obrigatório.",
                    minLength: {
                        value: 3,
                        message: "O nome deve ter pelo menos 3 caracteres.",
                    },
                    maxLength: {
                        value: 35,
                        message: "O nome deve ter no máximo 35 caracteres.",
                    },
                })}
            />
            {errors.nome && (
                <p style={{ color: "red" }}>{errors.nome.message}</p>
            )}
            <br />

            {/* Email */}
            <label htmlFor="email">Email</label> <br />
            <input
                type="email"
                id="email"
                {...register("email", {
                    required: "O email é obrigatório.",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Insira um email válido.",
                    },
                })}
            />
            {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
            <br />

            {/* Mensagem */}
            <label htmlFor="mensagem">Mensagem</label> <br />
            <textarea
                id="mensagem"
                {...register("mensagem", {
                    required: "A mensagem é obrigatória.",
                    minLength: {
                        value: 10,
                        message: "A mensagem deve ter pelo menos 10 caracteres.",
                    },
                })}
            ></textarea>
            {errors.mensagem && (
                <p style={{ color: "red" }}>{errors.mensagem.message}</p>
            )}
            <br />

            <button type="submit">Enviar</button>
        </form>
    );
}

export default Form;
