class Produto{

  constructor({id, titulo, preco, estoque, fornecedor, 
    criadoEm, atualizadoEm, versao}){
      this.id = id;
      this.titulo = titulo;
      this.preco = preco;
      this.estoque = estoque;
      this.fornecedor = fornecedor;
      this.criadoEm = criadoEm;
      this.atualizadoEm = atualizadoEm;
      this.versao = versao;
    }
}

module.exports = Produto;