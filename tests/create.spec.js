'use strict'
/* eslint-disable no-unused-expressions */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiSubset from 'chai-subset'
import nock from 'nock'
import path from 'path'
import Sicredi from '../src/index'
import SicrediError from '../src/erros/sicredi'

chai.use(chaiAsPromised)
chai.use(chaiSubset)

describe('create method', () => {
  let sicredi

  beforeEach(() => {
    sicredi = new Sicredi({
      token: 'foo',
      agency: '1234',
      station: '12',
      assignor: 12345
    })
  })

  it('should have create method', () => {
    expect(sicredi.create).to.be.exist
    expect(sicredi.create).to.be.a('function')
  })

  context('with erros', () => {
    it('should return erro if required params not insert', () => {
      sicredi = new Sicredi({
        token: 'foo',
        agency: 1234,
        assignor: 12345,
        station: 12
      })

      const body = {
        nossoNumero: '',
        codigoPagador: '',
        tipoPessoa: '1',
        nome: 'Cliente Teste',
        endereco: 'Rua 1',
        cidade: 'Rio de Janeiro',
        uf: 'RJ',
        cep: '99999999',
        telefone: '9999999999',
        email: 'cliente@email.com',
        especieDocumento: 'B',
        codigoSacadorAvalista: '000',
        seuNumero: '0000000002',
        dataVencimento: '16/05/2019',
        valor: 6,
        tipoDesconto: 'A',
        valorDesconto1: null,
        dataDesconto1: null,
        valorDesconto2: null,
        dataDesconto2: null,
        valorDesconto3: null,
        dataDesconto3: null,
        tipoJuros: 'A',
        juros: null,
        multas: null,
        descontoAntecipado: null,
        informativo: 'teste1',
        mensagem: 'teste',
        codigoMensagem: ''
      }

      nock(
        'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
      )
        .post('/emissao', {
          ...body,
          agencia: sicredi.agency,
          posto: sicredi.station,
          cedente: sicredi.assignor
        })
        .replyWithFile(
          400,
          path.join(__dirname, '/fixtures/create-with-erro.json')
        )

      return sicredi.create(body).catch(error => {
        return expect(error)
          .to.be.an.instanceOf(SicrediError)
          .and.containSubset({
            error: {
              codigo: 'E0010',
              mensagem: 'Campo obrigatorio em branco.',
              parametro: 'cpfCnpj'
            }
          })
      })
    })
  })

  context('with success', () => {
    const body = {
      nossoNumero: '',
      codigoPagador: '',
      tipoPessoa: '1',
      cpfCnpj: '99999999999',
      nome: 'Cliente Teste',
      endereco: 'Rua 1',
      cidade: 'Rio de Janeiro',
      uf: 'RJ',
      cep: '99999999',
      telefone: '9999999999',
      email: 'cliente@email.com',
      especieDocumento: 'B',
      codigoSacadorAvalista: '000',
      seuNumero: '0000000002',
      dataVencimento: '16/05/2019',
      valor: 6,
      tipoDesconto: 'A',
      valorDesconto1: null,
      dataDesconto1: null,
      valorDesconto2: null,
      dataDesconto2: null,
      valorDesconto3: null,
      dataDesconto3: null,
      tipoJuros: 'A',
      juros: null,
      multas: null,
      descontoAntecipado: null,
      informativo: 'teste1',
      mensagem: 'teste',
      codigoMensagem: ''
    }
    it('should return billet with success', () => {
      nock(
        'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
      )
        .post('/emissao', {
          ...body,
          agencia: sicredi.agency,
          posto: sicredi.station,
          cedente: sicredi.assignor
        })
        .replyWithFile(
          201,
          path.join(__dirname, '/fixtures/create-with-success.json')
        )

      return expect(sicredi.create(body)).to.eventually.deep.equal({
        linhaDigitavel: '74899999999999',
        codigoBanco: '748',
        nomeBeneficiario: 'EMPRESA',
        enderecoBeneficiario: 'R. 1, 708',
        cpfCnpjBeneficiario: '9999999999999',
        cooperativaBeneficiario: '9999',
        postoBeneficiario: '99',
        codigoBeneficiario: '99999',
        dataDocumento: '2019-04-13',
        seuNumero: '0000000002',
        especieDocumento: 'B',
        aceite: 'N',
        dataProcessamento: '2019-04-13',
        nossoNumero: 999999999,
        especie: 'REAL',
        valorDocumento: 6,
        dataVencimento: '2019-05-16',
        nomePagador: 'CLIENTE TESTE',
        cpfCnpjPagador: '99999999999',
        enderecoPagador: 'R 1',
        dataLimiteDesconto: null,
        valorDesconto: 0,
        jurosMulta: 0,
        instrucao: 'teste\r',
        informativo: 'teste1\r',
        codigoBarra: '748999999999999999999'
      })
    })
  })
})
