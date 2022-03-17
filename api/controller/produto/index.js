const router = require("express").Router({mergeParams:true});
const Produto = require('../../model/Produto');
const produtoService = require('../../services/produto');
const SerializadorProduto = require('../../Serializador').SerializadorProduto

router.options('/', (requisicao, resposta) => {
  resposta.set('Access-Control-Allow-Methods', 'GET, POST');
  resposta.set('Access-Control-Allow-Headers', 'Content-Type');
  resposta.status(204).end();
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

router.options('/:idProduto', (requisicao, resposta) => {
  resposta.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, HEAD');
  resposta.set('Access-Control-Allow-Headers', 'Content-Type');
  resposta.status(204).end();
});


router.get('/:idProduto', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idProduto;
    const idFornecedor = requisicao.fornecedor.id;
    const produtoServiceBuscado = await produtoService.listarPor(id, idFornecedor);
    const produto = new Produto(produtoServiceBuscado);

    const serializador = new SerializadorProduto(
      resposta.getHeader('Content-Type'),
      ['id','estoque', 'fornecedor', 'criadoEm', 'atualizadoEm', 'versao']
    );

    resposta.set('ETag', produto.versao);
    const timestamp = (new Date(produto.atualizadoEm)).getTime();
    resposta.set('Last-Modified',timestamp);

    resposta.status(200).send(serializador.serializar(produto));
  } catch (erro) {
    proximo(erro);
  }
});

router.head('/:idProduto', async (requisicao, resposta, proximo) => {
  try {
    console.log("entrei aqui")
    const id = requisicao.params.idProduto;
    const idFornecedor = requisicao.fornecedor.id;
    const produtoServiceBuscado = await produtoService.listarPor(id, idFornecedor);
    const produto = new Produto(produtoServiceBuscado);

    resposta.set('ETag', produto.versao);
    const timestamp = (new Date(produto.atualizadoEm)).getTime();
    resposta.set('Last-Modified',timestamp);

    resposta.status(204).end();

  } catch (erro) {
    proximo(erro);
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

router.options('/:idProduto/diminuir-estoque', (requisicao, resposta) => {
  resposta.set('Access-Control-Allow-Methods', 'POST');
  resposta.set('Access-Control-Allow-Headers', 'Content-Type');
  resposta.status(204).end();
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

module.exports = router;