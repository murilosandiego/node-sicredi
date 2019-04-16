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

describe('auth method', () => {
  let sicredi

  beforeEach(() => {
    sicredi = new Sicredi({
      token: 'foo',
      agency: '1234',
      station: '99'
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should have auth method', () => {
    expect(sicredi.auth).to.exist
    expect(sicredi.auth).to.be.a('function')
  })

  context('with erros', () => {
    it('should return 404 with token registed', async () => {
      nock(
        'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
      )
        .post('/autenticacao')
        .replyWithFile(
          404,
          path.join(__dirname, '/fixtures/auth-with-token-registered.json')
        )

      return expect(sicredi.auth('keyMaster')).to.eventually.deep.equal({
        codigo: '0004',
        mensagem: 'Existe um Token de Transação válido cadastrado!',
        parametro: ''
      })
    })
    it('should return erro with invalid token', async () => {
      nock(
        'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
      )
        .post('/autenticacao')
        .replyWithFile(
          400,
          path.join(__dirname, '/fixtures/auth-with-invalid-token.json')
        )

      return expect(sicredi.auth('keyMaster')).to.eventually.deep.equal({
        codigo: 'E0011',
        mensagem: 'Tamanho de campo invalido.',
        parametro: 'token'
      })
    })
  })

  context('with success', () => {
    it('should return token with success', () => {
      nock(
        'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
      )
        .post('/autenticacao')
        .replyWithFile(
          200,
          path.join(__dirname, '/fixtures/auth-with-success.json')
        )

      return expect(sicredi.auth('keyMaster')).to.eventually.deep.equal({
        chaveTransacao: '99999999999999999999999999999999999999999',
        dataExpiracao: '2019-04-13T18:08:46.471-03:00'
      })
    })
  })
})
