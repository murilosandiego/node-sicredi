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

describe('change method', () => {
  let sicredi

  beforeEach(() => {
    sicredi = new Sicredi({
      token: 'foo',
      agency: '1234',
      station: '12',
      assignor: 12345
    })
  })

  it('should have change method', () => {
    expect(sicredi.change).to.be.exist
    expect(sicredi.change).to.be.a('function')
  })

  it('should change billet with success', () => {
    const body = {
      agencia: '1234',
      posto: '99',
      cedente: '12345',
      nossoNumero: '999999999',
      seuNumero: '9999999999',
      instrucaoComando: 'ALTERACAO_SEU_NUMERO',
      tipoVencimento: 'VISTA'
    }

    nock(
      'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
    )
      .post('/comandoInstrucao', {
        ...body,
        agencia: sicredi.agency,
        posto: sicredi.station,
        cedente: sicredi.assignor
      })
      .replyWithFile(
        200,
        path.join(__dirname, '/fixtures/change-with-success.json')
      )

    return expect(sicredi.change(body)).to.eventually.deep.equal({
      codigo: 'E0029',
      mensagem: 'Comando de Instrução realizado com sucesso!',
      parametro: null
    })
  })
})
