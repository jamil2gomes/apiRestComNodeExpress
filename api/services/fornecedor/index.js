const repository = require('../../repository/fornecedor')


async function listarTodos(){
  const resposta = await repository.listarTodos();
  return resposta;
}

async function listarPor(id){
  const resposta = await repository.listarPor(id);
  return resposta;
}

async function criar(fornecedor){
  const resultado = await repository.inserir({
    empresa:fornecedor.empresa,
    email: fornecedor.email,
    categoria: fornecedor.categoria,

  });

  fornecedor.id = resultado.id;
  fornecedor.criadoEm = resultado.criadoEm;
  fornecedor.atualizadoEm = resultado.atualizadoEm;
  fornecedor.versao = resultado.versao;

  return fornecedor;

}

async function atualizar(fornecedor){
  //verifico se existe o fornecedor pra ser atualizado
  const existeFornecedor = await repository.listarPor(fornecedor.id);

  const campos = ["empresa", "email", "categoria"];

  const dadosParaAtualizar = {};

  campos.forEach(campo => {
    const valor = fornecedor[campo];

    if(typeof valor === 'string' && valor.length > 0){
      dadosParaAtualizar[campo] = valor;
    }
  })

  if(Object.keys(dadosParaAtualizar).length === 0)
    throw new Error("Não foram fornecidos dados para atualizar");

  await repository.atualizar(fornecedor.id, dadosParaAtualizar);
}

module.exports = {
  criar,
  listarTodos,
  listarPor,
  atualizar
}