const Modelo = require("../../banco/Tabelas/TabelaFornecedor");
const NaoEncontrado = require("../../erros/NaoEncontrado")
module.exports = {

  listarTodos() {
    return Modelo.findAll({ raw: true });
  },

  inserir(fornecedor){
    return Modelo.create(fornecedor);
  },

  atualizar (id, dadosParaAtualizar) {
    return Modelo.update(
        dadosParaAtualizar,
        {
            where: { id: id }
        }
    )
},

remover (id) {
  return Modelo.destroy({
        where: { id: id }
      });
},

  async listarPor(id){
    const encontrado =  await Modelo.findOne({
      where:{
        id
      }
    });
    
    if(!encontrado)
      throw new NaoEncontrado();

      return encontrado;
  }

}