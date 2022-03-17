const repository = require('../../repository/produto')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

async function listarTodos(idFornecedor) {
  const resposta = await repository.listarTodos(idFornecedor);
  return resposta;
}

async function listarPor(id, idFornecedor) {
  const resposta = await repository.listarPor(id, idFornecedor);
  return resposta;
}


async function criar(produto) {
  validar(produto);
  const resultado = await repository.inserir({
    titulo: produto.titulo,
    preco: produto.preco,
    estoque: produto.estoque,
    fornecedor:produto.fornecedor

  });

  produto.id = resultado.id;
  produto.criadoEm = resultado.criadoEm;
  produto.atualizadoEm = resultado.atualizadoEm;
  produto.versao = resultado.versao;

  return produto;

}

async function atualizar(produto) {
  await repository.listarPor(produto.id, produto.fornecedor);
  const campos = ['titulo', 'preco', 'estoque'];
  const dadosParaAtualizar = {};

  campos.forEach((campo) => {
    const valor = produto[campo]

    if (campo === 'titulo' && typeof valor === 'string' && valor.length > 0) {
      dadosParaAtualizar[campo] = valor;
    }
    if (campo === 'preco' && typeof valor === 'number' && valor > 0) {
      dadosParaAtualizar[campo] = valor;
    }
    if (campo === 'estoque' && typeof valor === 'number' && valor >= 0) {
      dadosParaAtualizar[campo] = valor;
    }
  })

  if (Object.keys(dadosParaAtualizar).length === 0) {
    throw new DadosNaoFornecidos();
  }

 
  await repository.atualizar(produto.id, produto.fornecedor, dadosParaAtualizar);
}


async function diminuirEstoque(produto) {

  return await repository.diminuirEstoque(produto);
}


function validar (produto) {
  const campos = ['titulo', 'preco',];

  campos.forEach(campo => {
      const valor = produto[campo];

      if ((campo === 'titulo' && typeof valor !== 'string') || valor.length === 0) {
          throw new CampoInvalido(campo);
      }

      if ((campo === 'preco' && typeof valor !== 'number') || valor === 0) {
        throw new CampoInvalido(campo);
    }
  })
}



async function remover(idProduto, idFornecedor) {
  return await repository.remover(idProduto, idFornecedor);
}



module.exports = {
  listarTodos,
  listarPor,
  criar,
  remover,
  atualizar,
  diminuirEstoque
}
