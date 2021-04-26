# E-commerce CMS Server

This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

Tech Stack used to build this app :

- Node JS
- Express JS framework
- PostgreSQL

&nbsp;

## Global Responses

> These responses are applied globally on all endpoints

_Response (400 - Bad Request)_

```json
{
  "message": "<Validation error message>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "<Unauthorize message>"
}
```

_Response (404 - Data not found)_

```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal server error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## RESTful endpoints

### POST /login

> Login user

_Request Header_

```json
not needed
```

_Request Body_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200)_

```json
{
  "id": "integer",
  "first_name": "string",
  "role": "string",
  "access_token": "string"
}
```

### POST /register

> Register user

_Request Header_

```json
not needed
```

_Request Body_

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201)_

```json
{
  "id": "integer",
  "email": "string",
  "first_name": "string"
}
```

### POST /products

> Create product

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
{
  "title": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer",
  "CategoryId": "integer"
}
```

_Response (201)_

```json
{
  "id": "integer",
  "title": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer",
  "CategoryId": "integer"
}
```

### GET /products

> Get all product

_Request Header_

```json
not needed
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "CategoryId": "integer",
    "Category": {
      "title": "string"
    },
    "UserProducts": [
      {
        "id": "integer",
        "type": "string"
      },
      {
        "id": "integer",
        "type": "string"
      }
    ]
  },
  {
    "id": "integer",
    "title": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "CategoryId": "integer",
    "Category": {
      "title": "string"
    },
    "UserProducts": [
      {
        "id": "integer",
        "type": "string"
      },
      {
        "id": "integer",
        "type": "string"
      }
    ]
  }
]
```

### PUT /products/:id

> Update all product's attribute

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
{
  "id": "integer",
  "title": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer",
  "CategoryId": "integer"
}
```

_Response (200)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "CategoryId": "integer"
  }
]
```

### PATCH /products/:id/stock

> Update stock product

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
{
  "stock": "integer"
}
```

_Response (200)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "CategoryId": "integer"
  }
]
```

### DELETE /products/:id

> Delete product

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
{
  "message": "Product deleted succesfully"
}
```

### GET /categories

> Get all product

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
[
  {
    "id": "integer",
    "title": "string"
  },
  {
    "id": "integer",
    "title": "string"
  }
]
```

### POST /whislists/:productId

> Create whislist

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
{
  "UserId": "integer",
  "ProductId": "integer",
  "type": "string"
}
```

### DELETE /whislists/:id

> Delete whislist

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
{
  "message": "string"
}
```

### GET /whislists

> Get all whislist

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "ProductId": "integer",
    "Product": {
      "id": "integer",
      "title": "string",
      "image_url": "string",
      "price": "double",
      "stock": "integer"
    }
  },
  {
    "id": "integer",
    "UserId": "integer",
    "ProductId": "integer",
    "Product": {
      "id": "integer",
      "title": "string",
      "image_url": "string",
      "price": "double",
      "stock": "integer"
    }
  }
]
```

### POST /carts/:productId

> Create carts

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
{
  "UserId": "integer",
  "ProductId": "integer",
  "type": "string",
  "quantity": "integer"
}
```

### DELETE /carts/:id

> Delete carts

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
{
  "message": "string"
}
```

### GET /carts

> Get all carts

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
not needed
```

_Response (200)_

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "ProductId": "integer",
    "quantity": "integer",
    "Product": {
      "id": "integer",
      "title": "string",
      "image_url": "string",
      "price": "double",
      "stock": "integer"
    }
  },
  {
    "id": "integer",
    "UserId": "integer",
    "ProductId": "integer",
    "quantity": "integer",
    "Product": {
      "id": "integer",
      "title": "string",
      "image_url": "string",
      "price": "double",
      "stock": "integer"
    }
  }
]
```

### PATCH /carts/:id/quantity

> Delete carts

_Request Header_

```json
{
  "access_token": "string"
}
```

_Request Body_

```json
{
  "quantity": "integer"
}
```

_Response (200)_

```json
{
  "UserId": "integer",
  "ProductId": "integer",
  "quantity": "integer"
}
```

_Response (400)_

```json
{
  "message": "Stock is limited",
  "quantity": "integer <remain stock>"
}
```
