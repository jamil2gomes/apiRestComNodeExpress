const router = require("express").Router({mergeParams:true});
const Produto = require('../../model/Produto');
const produtoService = require('../../services/produto');
const SerializadorProduto = require('../../Serializador').SerializadorProduto


router.get('/', async (requisicao, resposta) => {
  const idFornecedor = requisicao.fornecedor.id;
  const produtos = await produtoService.listarTodos(idFornecedor)

  const serializador = new SerializadorProduto(
    resposta.getHeader('Content-Type')
  )
  resposta.status(200).send(
    serializador.serializar(produtos)
  )
});

router.get('/:idProduto', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idProduto;
    const idFornecedor = requisicao.fornecedor.id;
    const produtoServiceBuscado = await produtoService.listarPor(id, idFornecedor);
    const produto = new Produto(produtoServiceBuscado);
    resposta.status(200);
    const serializador = new SerializadorProduto(
      resposta.getHeader('Content-Type'),
      ['id','estoque', 'fornecedor', 'criadoEm', 'atualizadoEm', 'versao']
    )
    resposta.send(
      serializador.serializar(produto)
    )
  } catch (erro) {
    proximo(erro);
  }
});

router.post('/', async (requisicao, resposta, proximo) => {
  try {
  const idFornecedor = requisicao.fornecedor.id;
  const dadosRecebidos = requisicao.body;

  const dados = Object.assign(
    {},
    dadosRecebidos,
    {fornecedor:idFornecedor}
  );

  const produto = new Produto(dados);

  await produtoService.criar(produto);
  resposta.status(201).send(produto);
  } catch (error) {
    proximo(error);
  }
});

router.put('/:idProduto', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idProduto;
    const idFornecedor = requisicao.fornecedor.id;
    const dadosRecebidos = requisicao.body;
    
    const dados = Object.assign({}, dadosRecebidos, { id: id, fornecedor:idFornecedor });
    const produto = new Produto(dados);
    await produtoService.atualizar(produto);
    resposta.status(204).end();

  } catch (erro) {
      proximo(erro);
  }
});

router.post('/:idProduto/diminuir-estoque', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idProduto;
    const idFornecedor = requisicao.fornecedor.id;

    const produtoEncontrado = await produtoService.listarPor(id, idFornecedor);

    const produto = new Produto(produtoEncontrado);
    produto.estoque -=  requisicao.body.quantidade;

    await produtoService.diminuirEstoque(produto);
    resposta.status(204).end();

  } catch (erro) {
      proximo(erro);
  }
});


router.delete('/:idProduto', async (requisicao, resposta) => {
  try {
    const idProduto = requisicao.params.idProduto;
    const idFornecedor = requisicao.fornecedor.id;
    await produtoService.listarPor(idProduto);
   
    await produtoService.remover(idProduto, idFornecedor);

    resposta.status(204).end();
  
  } catch (erro) {
      proximo(erro);
  }
});


module.exports = router;