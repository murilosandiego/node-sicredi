'use strict'
/* eslint-disable no-unused-expressions */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiSubset from 'chai-subset'
import nock from 'nock'
import Sicredi from '../src/index'

chai.use(chaiAsPromised)
chai.use(chaiSubset)

describe('health method', () => {
  let sicredi

  beforeEach(() => {
    sicredi = new Sicredi({
      token: 'foo',
      agency: '1234',
      station: '12',
      assignor: 12345
    })
  })

  it('should have health method', () => {
    expect(sicredi.health).to.be.exist
    expect(sicredi.health).to.be.a('function')
  })

  it('should health billet with success', () => {
    nock(
      'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
    )
      .get('/health')
      .reply(200, {})

    return expect(sicredi.health()).to.eventually.deep.equal({})
  })
})
