const router = require("express").Router();
const Fornecedor = require('../../model/Fornecedor');
const fornecedorService = require('../../services/fornecedor');


router.get('/', async (requisicao, resposta)=>{
  const result = await fornecedorService.listarTodos();
  resposta.send(JSON.stringify(result));
})

router.get('/:id', async (requisicao, resposta)=>{
  try {
    const id = requisicao.params.id;
    const fornecedorBuscado = await fornecedorService.listarPor(id);
    const fornecedor = new Fornecedor(fornecedorBuscado);
    resposta.send(JSON.stringify(fornecedor));
  } catch (error) {
     resposta.send(JSON.stringify({mensagem:error.message}))
  }
})

router.post('/', async (requisicao, resposta)=>{
  const dadosRecebidos = requisicao.body;
  const fornecedor = new Fornecedor(dadosRecebidos);

  const fornecedorSalvo = await fornecedorService.criar(fornecedor);

  resposta.send(
    JSON.stringify(fornecedorSalvo)
  );
})


module.exports = router;