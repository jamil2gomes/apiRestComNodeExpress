class Fornecedor{

  constructor({id, empresa, email, categoria, 
    criadoEm, atualizadoEm, versao}){
      this.id = id;
      this.empresa = empresa;
      this.email = email;
      this.categoria = categoria;
      this.criadoEm = criadoEm;
      this.atualizadoEm = atualizadoEm;
      this.versao = versao;
    }
}

module.exports = Fornecedor;