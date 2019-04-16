'use strict'

import rp from 'request-promise-native'
import {
  API_URL,
  AUTH_PATH,
  CREATE_PATH,
  FIND_PATH,
  PRINT_PATH,
  CHANGE_PATH,
  HEALTH_PATH
} from './config'

class Sicredi {
  constructor (options) {
    this.apiURL = options.apiURL || API_URL
    this.token = options.token
    this.agency = options.agency
    this.assignor = options.assignor
    this.station = options.station
    this.strictSSL = options.strictSSL || false
  }

  request (path, headers, options) {
    let optionsRequest = {
      strictSSL: this.strictSSL,
      uri: `${this.apiURL}/${path}`,
      headers,
      ...options,
      json: true
    }

    return rp(optionsRequest)
      .then(response => response)
      .catch(error => error.error)
  }

  auth (keyMaster) {
    const headers = {
      token: keyMaster,
      'Content-Type': 'application/json'
    }

    const options = {
      method: 'POST'
    }

    return this.request(AUTH_PATH, headers, options)
  }

  create (body) {
    const headers = {
      token: this.token,
      'Content-Type': 'application/json'
    }

    const options = {
      method: 'POST',
      body: {
        ...body,
        agencia: this.agency,
        cedente: this.assignor,
        posto: this.station
      }
    }

    return this.request(CREATE_PATH, headers, options)
  }

  find (qs) {
    const headers = {
      token: this.token
    }

    const options = {
      method: 'GET',
      qs: {
        ...qs,
        agencia: this.agency,
        cedente: this.assignor,
        posto: this.station
      }
    }

    return this.request(FIND_PATH, headers, options)
  }

  print (qs) {
    const headers = {
      token: this.token
    }

    const options = {
      method: 'GET',
      qs: {
        ...qs,
        agencia: this.agency,
        cedente: this.assignor,
        posto: this.station
      }
    }

    return this.request(PRINT_PATH, headers, options)
  }

  change (body) {
    const headers = {
      token: this.token,
      'Content-Type': 'application/json'
    }

    const options = {
      method: 'POST',
      body: {
        ...body,
        agencia: this.agency,
        cedente: this.assignor,
        posto: this.station
      }
    }

    return this.request(CHANGE_PATH, headers, options)
  }

  health (qs) {
    const headers = {
      token: this.token
    }

    const options = {
      method: 'GET'
    }

    return this.request(HEALTH_PATH, headers, options)
  }
}
export default Sicredi
