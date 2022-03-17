const Modelo = require("../../banco/Tabelas/TabelaProduto");
const intancia = require('../../banco');
const NaoEncontrado = require("../../erros/NaoEncontrado");
const instancia = require("../../banco");
module.exports = {

  listarTodos(idFornecedor) {
    return Modelo.findAll({ 
      where:{
        fornecedor: idFornecedor
    },
    raw: true 
  });
  },

  inserir(produto){
    return Modelo.create(produto);
  },

  atualizar (id, idFornecedor, dadosParaAtualizar) {
    return Modelo.update(
        dadosParaAtualizar,
        {
            where: { 
              id: id,
              fornecedor: idFornecedor
             }
        }
    )
},

remover (idProduto, idFornecedor) {
  return Modelo.destroy({
        where: { 
          id: idProduto, 
          fornecedor: idFornecedor
        }
  });
},

  async listarPor(idProduto, idFornecedor){
    const encontrado =  await Modelo.findOne({
      where:{
        id:idProduto,
        fornecedor: idFornecedor
      }
    });
    
    if(!encontrado)
      throw new NaoEncontrado('Produto');

      return encontrado;
  },

  diminuirEstoque(produto){
    return instancia.transaction(async transaction => {
      const prod = await Modelo.findOne({
        where:{
          id:produto.id,
          fornecedor: produto.fornecedor
        }
      });

      prod.estoque = produto.estoque;

      await prod.save();

      return produto;
    })
  }

}