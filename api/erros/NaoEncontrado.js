class NaoEncontrado extends Error {
  constructor (tabela) {
      super(`${tabela} não foi encontrado!`)
      this.name = 'NaoEncontrado'
      this.idErro = 0
  }
}

module.exports = NaoEncontrado