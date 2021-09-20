# backend
Backend for Build week ptct-african-marketplace-5 project <br/>
Base URL = https://frozen-lowlands-84790.herokuapp.com/ <br/>

### Register Schema

(/api/auth/register) <br/>
Send a .post() to the endpoint with the following information. <br/>
Make sure you are sending data to the database as structured below:

```js
{
    "username": "testOwner",
    "password": "testPass"
}
```

### Login Schema

(/api/auth/login)<br/>
Send a .post() to the endpoint with the following information:<br/>
Make sure you are sending data to the database as structured below:

```js
{
    "username": "testOwner",
    "password": "testPass"
}
```
You will receive a token back for authentication. <br/>

### USERS

|  CRUD  | METHOD | ROUTE              | SEND TO DB                                            |
| :----: | :----: | ------------------ | ----------------------------------------------------- |
| Create |  POST  | /api/auth/login    | {username(string) , password(string)                  |
| Create |  POST  | /api/auth/register | {username(string) , password(string) } |

### Marketplace Schema

|  CRUD  | METHOD | ROUTE                       | Description                       |
| :----: | :----: | -----------------------     | --------------------------------- |
|  Read  |  GET   | /api/market/stores          | get all stores                    |
|  Read  |  GET   | /api/market/user/:username/stores  | get all selected owner stores     |
|  Read  |  GET   | /api/market/stores/:store_id       | get all offers for selected store |
|  Read  |  GET   | /api/market/products        | get all products in database      |
| Create |  POST  | /api/market/stores          | create new store                  |
| Create |  POST  | /api/market/stores/:store_id/offers| create new offer in selected store|
| Create |  POST  | /api/market/products         | create new product and/or category|
| Update |  PUT   | /api/market/stores/:store_id | edit store information           |
| Update |  PUT   | /api/market/stores/:store_id/offers/:offer_id | edit offer info |
| Delete | DELETE | /api/market/stores/:store_id | delete store by id               |
| Delete | DELETE | /api/market/stores/:store_id/offers/:offer_id | delete offer by store_id and offer_id|