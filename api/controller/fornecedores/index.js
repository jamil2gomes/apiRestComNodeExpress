const router = require("express").Router();
const Fornecedor = require('../../model/Fornecedor');
const fornecedorService = require('../../services/fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

router.get('/', async (requisicao, resposta) => {
  const resultados = await fornecedorService.listarTodos();

  resposta.status(200)
  const serializador = new SerializadorFornecedor(
    resposta.getHeader('Content-Type')
  )
  resposta.send(
    serializador.serializar(resultados)
  )
})

router.get('/:id', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.id;
    const fornecedorBuscado = await fornecedorService.listarPor(id);
    const fornecedor = new Fornecedor(fornecedorBuscado);
    resposta.status(200);
    const serializador = new SerializadorFornecedor(
      resposta.getHeader('Content-Type'),
      ['email', 'criadoEm', 'atualizadoEm', 'versao']
    )
    resposta.send(
      serializador.serializar(fornecedor)
    )
  } catch (erro) {
    proximo(erro);
  }
})

router.post('/', async (requisicao, resposta, proximo) => {
  try {
    const dadosRecebidos = requisicao.body;
    const fornecedor = new Fornecedor(dadosRecebidos);

    await fornecedorService.criar(fornecedor);

    resposta.status(201);
    const serializador = new SerializadorFornecedor(
      resposta.getHeader('Content-Type')
    )
    resposta.send(
      serializador.serializar(fornecedor)
    )
  } catch (erro) {
    proximo(erro);
  }
})

router.put('/:id', async (requisicao, resposta, proximo) => {
  try {
      const id = requisicao.params.id;
      const dadosRecebidos = requisicao.body;
      
      const dados = Object.assign({}, dadosRecebidos, { id: id });

      const fornecedor = new Fornecedor(dados);
      await fornecedorService.atualizar(fornecedor);
      resposta.status(204).end();

    } catch (erro) {
        proximo(erro);
    }
})


router.delete('/:id', async (requisicao, resposta) => {
  try {
      const id = requisicao.params.id;
      await fornecedorService.listarPor(id);
     
      await fornecedorService.remover(id);

      resposta.status(204).end();
    
    } catch (erro) {
        proximo(erro);
    }
  })


module.exports = router;