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
| Update |  PUT   | /api/market/stores/:store_id/offers/:offer_id | edit offer info using store_id and offer_id |
| Delete | DELETE | /api/market/stores/:store_id | delete store by id               |
| Delete | DELETE | /api/market/stores/:store_id/offers/:offer_id | delete offer by store_id and offer_id|

### POST and PUT Data formats

All of the following can only be done by business owner accounts. 
The token you recieve will have the information needed to determine if the logged in User is a business owner or not. <br/>

When you send a Post request to /api/market/stores or you send a Put request to /api/market/stores/:store_id format as follows:

```js
{
    "store_name": "Local Marketplace",
    "token": token //this is the token you receive from the login
}
```

When you send a Post request to /api/market/stores/:store_id/offers or you send a Put request to /api/market/stores/:store_id/offers/:offer_id format as follows:

```js
{
    "product_name": "Milk",
    "price": 3.99, //You can also enter the price as a string as long as it is still numbers
    "token": token //this is the token you receive from the login
}
```

When you send a post request to /api/market/products format as follows:

```js
{
    "product_name": "Pear",
    "cat_name": "Fruit",
    "token": token //this is the token you receive from the login

    //If the category name already exists in the data base, the product will be assigned that categories cat_id
    //If the category does not yet exist in the database, a new category will be created and the product will be assigned the resulting cat_id
}
```

