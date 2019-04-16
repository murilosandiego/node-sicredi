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

describe('print method', () => {
  let sicredi

  beforeEach(() => {
    sicredi = new Sicredi({
      token: 'foo',
      agency: 1234,
      station: 99,
      assignor: 12345
    })
  })

  it('should have print method', () => {
    expect(sicredi.print).to.be.exist
    expect(sicredi.print).to.be.a('function')
  })

  it('should return array of billet for print with success', () => {
    const query = {
      nossoNumero: 99999999
    }

    nock(
      'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
    )
      .get('/impressao')
      .query({
        ...query,
        agencia: sicredi.agency,
        posto: sicredi.station,
        cedente: sicredi.assignor
      })
      .replyWithFile(
        200,
        path.join(__dirname, '/fixtures/print-with-success.json')
      )

    return expect(sicredi.print(query)).to.eventually.deep.equal({
      menssagem: 'Processado com sucesso.',
      arquivo:
        'JVBERi0xLjQKJeLjz9MKMSAwIG9iaiA8PC9UeXBlL1hPYmplY3QvUmVzb3VyY2VzPDwvUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0vRm9udDw8L0FyaWFsLUJvbGRNVCAyIDAgUj4+Pj4vU3VidHlwZS9Gb3JtL0JCb3hbMCAwIDM0OC41IDI2LjldL01hdHJpeCBbMSAwIDAgMSAwIDBdL0xlbmd0aCAxMzMvRm9ybVR5cGUgMS9GaWx0ZXIvRmxhdGVEZWNvZGU+PnN0cmVhbQp4nC2OvQrCQBCEX2VKLdzsXu63NJIyReDAWlCDEpWk8vEdgjPdzLfLLBjR1C+64YQFSrc+S4CLUrDecMabeVdhW2koEgOyqEN9oTmuj8t86D7zdSDC7L5hinXCLvlcTMyyMaFaST6oBYIum7DU6PkyJa9/RdV9ffJ+Ql85bUTPYT8QLCRTCmVuZHN0cmVhbQplbmRvYmoKMyAwIG9iaiA8PC9UeXBlL1hPYmplY3QvUmVzb3VyY2VzPDwvUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0vRm9udDw8L0FyaWFsLUJvbGRNVCAyIDAgUj4+Pj4vU3VidHlwZS9Gb3JtL0JCb3hbMCAwIDUyLjcgMjYuOF0vTWF0cml4IFsxIDAgMCAxIDAgMF0vTGVuZ3RoIDEwNy9Gb3JtVHlwZSAxL0ZpbHRlci9GbGF0ZURlY29kZT4+c3RyZWFtCnicHY2xCoNAFAR/ZUpTeJ6nF6/NiaWF8MA6EJU'
    })
  })
})
