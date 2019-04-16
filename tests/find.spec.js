'use strict'
/* eslint-disable no-unused-expressions */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiSubset from 'chai-subset'
import nock from 'nock'
import path from 'path'
import Sicredi from '../src/index'

chai.use(chaiAsPromised)
chai.use(chaiSubset)

describe('find method', () => {
  let sicredi

  beforeEach(() => {
    sicredi = new Sicredi({
      token: 'foo',
      agency: 1234,
      station: 99,
      assignor: 12345
    })
  })

  it('should have find method', () => {
    expect(sicredi.find).to.be.exist
    expect(sicredi.find).to.be.a('function')
  })

  it('should return array of billet with success', () => {
    const query = {
      nossoNumero: 99999999
    }
    nock(
      'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
    )
      .get('/consulta')
      .query({
        ...query,
        agencia: sicredi.agency,
        posto: sicredi.station,
        cedente: sicredi.assignor
      })
      .replyWithFile(
        200,
        path.join(__dirname, '/fixtures/find-with-success.json')
      )

    return expect(sicredi.find(query)).to.eventually.deep.equal([
      {
        seuNumero: '9999999999',
        nossoNumero: '99999999',
        nomePagador: 'CLIENTE TESTE',
        valor: '500',
        valorLiquidado: '500',
        dataEmissao: '2018-12-13',
        dataVencimento: '2018-12-16',
        dataLiquidacao: '2018-12-13',
        situacao: 'LIQUIDADO'
      }
    ])
  })
})
