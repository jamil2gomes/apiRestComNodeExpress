const Modelo = require("../../banco/Tabelas/TabelaFornecedor");

module.exports = {

  listarTodos() {
    return Modelo.findAll();
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

  async listarPor(id){
    const encontrado =  await Modelo.findOne({
      where:{
        id
      }
    });
    
    if(!encontrado)
      throw new Error("Não foi encontrado");

      return encontrado;
  }

}