const Sicredi = require('../lib/index').default

const sicredi = new Sicredi({
  token: '12341234123412341234',
  agency: 1234,
  assignor: 12345,
  station: 99
})

sicredi
  .find({
    dataInicio: '10/10/2018',
    dataFim: '31/12/2018',
    tipoData: 'DATA_EMISSAO'
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => console.log(err))
