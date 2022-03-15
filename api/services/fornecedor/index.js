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

module.exports = {
  criar,
  listarTodos,
  listarPor
}