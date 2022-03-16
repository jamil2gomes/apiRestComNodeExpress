const CampoInvalido = require("../../erros/CampoInvalido");

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


    validar(){
      const campos = ['empresa', 'email', 'categoria'];

      campos.forEach((campo) => {
        const valor = this[campo]
    
        if (typeof valor !== 'string' || valor.length === 0) {
          throw new CampoInvalido(campo);
        }
      })
    }
}

module.exports = Fornecedor;