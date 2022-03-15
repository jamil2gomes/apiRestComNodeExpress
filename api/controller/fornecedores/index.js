const router = require("express").Router();
const Fornecedor = require('../../model/Fornecedor');
const fornecedorService = require('../../services/fornecedor');


router.get('/', async (requisicao, resposta)=>{
  const result = await fornecedorService.listarTodos();

  if(result.length === 0)
    resposta.status(204).send(JSON.stringify(result));
  else
    resposta.status(202).send(JSON.stringify(result));
})

router.get('/:id', async (requisicao, resposta)=>{
  try {
    const id = requisicao.params.id;
    const fornecedorBuscado = await fornecedorService.listarPor(id);
    const fornecedor = new Fornecedor(fornecedorBuscado);
    resposta.status(202).send(JSON.stringify(fornecedor));
  } catch (error) {
    resposta
    .status(404)
    .send(JSON.stringify({mensagem:error.message}));
  }
})

router.post('/', async (requisicao, resposta)=>{
 try {
  const dadosRecebidos = requisicao.body;
  const fornecedor = new Fornecedor(dadosRecebidos);

  fornecedor.validar();

  const fornecedorSalvo = await fornecedorService.criar(fornecedor);

  resposta.status(201).send(
    JSON.stringify(fornecedorSalvo)
  );
 } catch (error) {
  resposta.status(400).send(
    JSON.stringify({
        mensagem: error.message
    })
)
 }
})

router.put('/:id', async (requisicao, resposta) => {
  try {
      const id = requisicao.params.id;
      const dadosRecebidos = requisicao.body;
      
      const dados = Object.assign({}, dadosRecebidos, { id: id });

      const fornecedor = new Fornecedor(dados);
      await fornecedorService.atualizar(fornecedor);
      resposta.status(204).end();

  } catch (erro) {
    resposta.status(400).send(
          JSON.stringify({
              mensagem: erro.message,
              "status":erro.status
          })
      )
  }
})


router.delete('/:id', async (requisicao, resposta) => {
  try {
      const id = requisicao.params.id;
      await fornecedorService.listarPor(id);
     
      await fornecedorService.remover(id);

      resposta.status(204).end();
    } catch (erro) {
      resposta.status(400).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
  })


module.exports = router;