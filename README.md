# Node Sicredi

[![Build Status](https://travis-ci.org/murilosandiego/node-sicredi.svg?branch=master)](https://travis-ci.org/murilosandiego/node-sicredi)
[![Coverage Status](https://coveralls.io/repos/github/murilosandiego/node-sicredi/badge.svg?branch=master)](https://coveralls.io/github/murilosandiego/node-sicredi?branch=master)
[![npm version](https://badge.fury.io/js/node-sicredi.svg)](https://badge.fury.io/js/node-sicredi)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Uma biblioteca em Node.js para interagir com o WebService, EcommResource, do Banco Sicredi, para gerenciamento de boletos.
Esta tem como objetivo facilitar a criação, consulta, impressão etc de boletos utilizando Promise.

### Instalação

```
$ npm install node-sicredi --save
```

## Como utilizar

### ES6

```js
import Sicredi from 'node-sicredi';

const sicredi = new Sicredi({
  token: 'SEU_TOKEN',
  agency: 'AGENCIA',
  assignor: 'CEDENTE',
  station: 'POSTO'
})

// Utilizando um método
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

```

### CommonJS

```js
const Sicredi = require('node-sicredi').default;

const sicredi = new Sicredi({
  token: 'SEU_TOKEN',
  agency: 'AGENCIA',
  assignor: 'CEDENTE',
  station: 'POSTO'
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
```

## Métodos

### sicredi.auth('keyMaster')

> O método “auth” é responsável por criar uma chave criptografada, denominada chaveTransacao (chamamos de token), baseada na chave master.

**Argumento**

| Argument | Type
|----------|---------
|`keyMaster`|*string*


**Exemplo**

```js
import Sicredi from 'node-sicredi';

sicredi = new Sicredi({})
sicredi.auth('keyMaster')
  .then(data => {
    //Chave de transação. Obs: Aqui chamamos de token
  })
```

### sicredi.create(body)

> O método “create” é responsável pela geração do boleto de Cobrança.

**Argumento**

| Argument | Type
|----------|---------
|`body`    |*objeto*


**Exemplo**

```js
import Sicredi from 'node-sicredi';

const sicredi = new Sicredi({
  token: 'SEU_TOKEN',
  agency: 'AGENCIA',
  assignor: 'CEDENTE',
  station: 'POSTO'
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

sicredi.create(body)
  .then(data => {
    // Boleto
  })
```

### sicredi.find(query)

> O método “find” é responsável pela consulta da situação de boletos.

**Argumento**

| Argument | Type
|----------|---------
|`query`   |*objeto*


**Exemplo**

```js
import Sicredi from 'node-sicredi';

const sicredi = new Sicredi({
  token: 'SEU_TOKEN',
  agency: 'AGENCIA',
  assignor: 'CEDENTE',
  station: 'POSTO'
})

const query = {
  nossoNumero: 99999999
}

sicredi.find(query)
  .then(data => {
    // Array Boleto(s)
  })
```

### sicredi.print(query)

> O método “print” é responsável pela impressão e reimpressão dos boletos de Cobrança.

**Argumento**

| Argument | Type
|----------|---------
|`query`   |*objeto*


**Exemplo**

```js
import Sicredi from 'node-sicredi';

const sicredi = new Sicredi({
  token: 'SEU_TOKEN',
  agency: 'AGENCIA',
  assignor: 'CEDENTE',
  station: 'POSTO'
})

const query = {
  nossoNumero: 99999999
}

sicredi.find(query)
  .then(data => {
    // Boleto
  })
```

### sicredi.change(body)

> O método “change” é responsável por alterar dados dos títulos via serviço.

**Arguments**

| Argument | Type
|----------|---------
|`body`   |*objeto*


**Exemplo**

```js
import Sicredi from 'node-sicredi';

const sicredi = new Sicredi({
  token: 'SEU_TOKEN',
  agency: 'AGENCIA',
  assignor: 'CEDENTE',
  station: 'POSTO'
})

const body = {
      agencia: '1234',
      posto: '99',
      cedente: '12345',
      nossoNumero: '999999999',
      seuNumero: '9999999999',
      instrucaoComando: 'ALTERACAO_SEU_NUMERO',
      tipoVencimento: 'VISTA'
    }

sicredi.change(body)
  .then(data => {
    //Resposta
  })
```

### sicredi.health()

> O método “health” é responsável pela verificação da disponibilidade do sistema de Cobrança.


**Exemplo**

```js
import Sicredi from 'node-sicredi';

const sicredi = new Sicredi({})
sicredi.health()
  .then(data => {
    //Resposta
  })

```

## Contribuíndo

Por favor, leia [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre o processo para enviar pull  request.

## Autor

| ![Murilo Sandiego](https://avatars3.githubusercontent.com/u/11686438?s=150&v=4)|
|:---------------------:|
|  [Murilo Sandiego](https://github.com/murilosandiego/)   |

Olhe também a lista de [contribuidores](https://github.com/murilosandiego/node-sicredi/contributors).

## License

Este projeto está licencidado sobre a licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para mais detalhes
