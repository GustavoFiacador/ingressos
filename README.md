# Microserviço de ingressos

Microserviço de ingressos para a unidade curricular da USJT de sistemas distribuidos.

## API Reference

#### Cadastro e retorno do cliente cadastrado

```http:5000
  POST /clientes/{id}/ingressos
```

| Parameter   | Type     | Description                                             |
| :---------- | :------- | :------------------------------------------------------ |
| `id`        | `int`    | **Required**. Id do cliente a ser associado ao ingresso |
| `descricao` | `string` | **Required**. Descrição do ingresso                     |

#### Lista todos os ingressos por cliente

```http
  GET /clientes/{id}/ingressos
```

| Parameter | Type  | Description                                    |
| :-------- | :---- | :--------------------------------------------- |
| `id`      | `int` | **Required**. Id do cliente dono dos ingressos |

#### Lista todos os ingressos

```http
  GET /ingressos
```

#### Deleta o ultimo ingresso cadastrado para o cliente

```http
  DELETE /clientes/{id}/ingressos
```

| Parameter | Type  | Description                                                 |
| :-------- | :---- | :---------------------------------------------------------- |
| `id`      | `int` | **Required**. Id do cliente que vai ter o ingresso deletado |
