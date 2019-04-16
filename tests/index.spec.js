'use strict'
/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import Sicredi from '../src/index'

describe('Sicredi Library', () => {
  it('should create on instace of Sicredi', () => {
    const sicredi = new Sicredi({
      agency: '1234',
      station: '10'
    })
    expect(sicredi).to.be.an.instanceof(Sicredi)
  })

  it('should receive apiURL as on option', () => {
    const sicredi = new Sicredi({
      apiURL: 'foo'
    })
    expect(sicredi.apiURL).to.be.equal('foo')
  })

  it('should return apiURL equal `bar`', () => {
    const sicredi = new Sicredi({
      apiURL: 'bar'
    })
    expect(sicredi.apiURL).to.be.equal('bar')
  })

  it('should use the default apiURL if not provider', () => {
    const sicredi = new Sicredi({})
    expect(sicredi.apiURL).to.be.equal(
      'https://cobrancaonline.sicredi.com.br/sicredi-cobranca-ws-ecomm-api/ecomm/v1/boleto'
    )
  })

  it('should receive token as on option', () => {
    const sicredi = new Sicredi({
      token: 'bar'
    })
    expect(sicredi.token).to.be.equal('bar')
  })

  it('should receive agency as on option', () => {
    const sicredi = new Sicredi({
      agency: '1234'
    })
    expect(sicredi.agency).to.be.equal('1234')
  })

  it('should receive agency as on option', () => {
    const sicredi = new Sicredi({
      station: '99'
    })
    expect(sicredi.station).to.be.equal('99')
  })

  it('should receive agency as on option', () => {
    const sicredi = new Sicredi({
      assignor: '12345'
    })
    expect(sicredi.assignor).to.be.equal('12345')
  })

  it('should have request method', () => {
    const sicredi = new Sicredi({})
    expect(sicredi.request).to.exist
    expect(sicredi.request).to.be.a('function')
  })
})
