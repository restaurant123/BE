# Restaurant Passport v1.0.0

Api for Restaurant Passport. A web application for finding the best places to eat near you.

- [Users](#users) - [Get a user with the id.](#get-a-user-with-the-id.) - [Get all active restaurants for a user.](#get-all-post-for-a-user.) - [Log a user in.](#log-a-user-in.) - [Register a new user.](#register-a-new-user.) - [Update user info.](#update-user-info.)

- [Restaurants](#restaurants) - [Get a restaurant by id.](#get-a-restaurant-by-id.) - [Get all restaurants.](#get-all-restaurants.) - [Delete restaurant.](#delete-restaurant.)

# Users

## Get a user with the id.

    GET /users/:id

### Headers

| Name          | Type   | Description             |
| ------------- | ------ | ----------------------- |
| authorization | String | <p>User auth token.</p> |

### Parameters

| Name | Type   | Description     |
| ---- | ------ | --------------- |
| id   | Number | <p>User id.</p> |

### Examples

Request example:

```
const request = axios.create({
    baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.get('/users/1');
```

### Success Response

User Data

```

{
  "id": 1,
  "created_at": "2019-05-20T04:20:43.000Z",
  "updated_at": "2019-05-21T02:35:03.374Z",
  "name": "Fancy Schaden",
  "email": "Ashtyn7@yahoo.com",
  "address": "99550 Marquardt Hill",
  "city": "Manhattan",
  "state": "New York",
  "zipCode": 14025

}
```

### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```

## Get all active restaurants for a user.

    GET /users/:id

### Headers

| Name          | Type   | Description             |
| ------------- | ------ | ----------------------- |
| authorization | String | <p>User auth token.</p> |

### Parameters

| Name | Type   | Description     |
| ---- | ------ | --------------- |
| id   | Number | <p>User id.</p> |

### Examples

Request example:

```
const request = axios.create({
    baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.get('/users/1');
```

### Success Response

Get Success

```
 {
  "id": 1,
  "created_at": "2019-05-20T04:20:43.000Z",
  "updated_at": "2019-05-21T02:35:03.374Z",
  "name": "Fancy Schaden",
  "email": "Ashtyn7@yahoo.com",
  "address": "99550 Marquardt Hill",
  "city": "Manhattan",
  "state": "New York",
  "zipCode": 14025,
  "restaurants": [
    {
      "restaurant_id": 1,
      "name": "Bartoletti and Sons",
      "address": "106 Jean Unions",
      "city": "Manhattan",
      "state": "New York",
      "zipCode": 14025,
      "visited": 0
    },
```

### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```

## Log a user in.

    POST /users/login

### Parameters

| Name     | Type   | Description                |
| -------- | ------ | -------------------------- |
| email    | String | <p>Users email address</p> |
| password | String | <p>Users password</p>      |

### Examples

Login example:

```
axios.post('/users/login', {
    email:"Ashtyn7@yahoo.com",
    password: "password"
});
```

### Success Response

Login Success

```

 {
  "message": "Welcome Ray Doe!",
  "email": "ray_doe@gmail.com",
  "name": "Ray Doe",
  "id": 14,
  "status": 200,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImNyZWF0ZWRfYXQiOiIyMDE5LTA1LTIxVDAyOjU5OjAwLjY2NFoiLCJ1cGRh"
}
```

### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```

## Register a new user.

    POST /users/register

### Parameters

| Name       | Type   | Description                                              |
| ---------- | ------ | -------------------------------------------------------- |
| email      | String | <p>Users email</p>                                       |
| password   | String | <p>Users password</p>                                    |
| address    | String | <p>Users address </p>                                    |
| city       | String | <p>Users city </p>                                       |
| state      | String | <p>Users state </p>                                      |
| zipCode    | Number | <p>Users zip code </p>                                   |
| created_at | String | **optional** <p>Timestamp the user was created</p>       |
| updated_at | String | **optional** <p>Timestamp the user was last updated.</p> |

### Examples

Register example:

```
axios.post('/users/register', {
    name: "George Doe",
    email: "george_doe@gmail.com",
    password: "password",
    address: "1234 Street",
    city: "Manhattan",
    state: "New York",
    zipCode: 123490
});
```

### Success Response

Register Success

```

 {
  "user": {
    "id": 15,
    "created_at": "2019-05-21T13:03:23.757Z",
    "updated_at": "2019-05-21T13:03:23.757Z",
    "name": "George Doe",
    "email": "george_doe@gmail.com",
    "password": "$2b$10$f3s72tsaTIkhbVh2IleeyOWCGRRlQVWWGaVfAAZQhur2lNCjx0fZG",
    "address": "1234 Street",
    "city": "Manhattan",
    "state": "New York",
    "zipCode": 14025
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImNyZWF0ZWRfYXQiOiIyMDE5LTA1LTIxVDEzOjAzOjIzLjc1N1oiLCJ1cGRhdGVkX2F0Ijoi"
}
```

### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```

## Update user info.

    PUT /users/:id

### Headers

| Name          | Type   | Description             |
| ------------- | ------ | ----------------------- |
| authorization | String | <p>User auth token.</p> |

### Parameters

| Name     | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| id       | Number | <p>User id.</p>                    |
| email    | String | **optional** <p>Users email</p>    |
| password | String | **optional** <p>Users password</p> |
| name     | String | **optional** <p>Users name</p>     |
| address  | String | **optional** <p>Users address </p> |
| city     | String | **optional** <p>Users city </p>    |
| state    | String | **optional** <p>Users state</p>    |
| zipCode  | Number | **optional** <p>Users zip code</p> |

### Examples

Request example:

```
const request = axios.create({
    baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.put('/users/11');
```

### Success Response

Update Success

```

 {
    "id": 11
}
```

### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```

# Restaurants

## Get a restaurant by id.

    Get /restaurants/:id

### Parameters

| Name | Type   | Description              |
| ---- | ------ | ------------------------ |
| id   | Number | <p>Restaurants email</p> |

### Examples

Register example:

```
axios.create({
    baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.get('/restaurants/1');
```

### Success Response

Get by ID Success

```
 {
    "id": 1,
    "name": "Schmidt, Kirlin and Ledner",
    "address": "315 Keeling Brooks",
    "image_url": "http://lorempixel.com/640/480/food",
    "description": "Pariatur sunt voluptatem. Et architecto eos. Qui nulla perspiciatis dignissimos incidunt.",
    "city": "Manhattan",
    "state": "New York",
    "zipCode": 14025,
    "visited": 0
  }
```

### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```

## Get all restaurants.

    Get /restaurants

### Examples

Register example:

```
axios.create({
    baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.get('/restaurants');
```

### Success Response

Get Success

```
 {
    "id": 1,
    "name": "Schmidt, Kirlin and Ledner",
    "address": "315 Keeling Brooks",
    "image_url": "http://lorempixel.com/640/480/food",
    "description": "Pariatur sunt voluptatem. Et architecto eos. Qui nulla perspiciatis dignissimos incidunt.",
    "city": "Manhattan",
    "state": "New York",
    "zipCode": 14025,
    "visited": 0
  },
  {
    "id": 2,
    "name": "Hilpert, Rolfson and Klein",
    "address": "671 Labadie Radial",
    "image_url": "http://lorempixel.com/640/480/food",
    "description": "Est modi rerum. Ea eum vel. Maxime velit est iure autem enim est veritatis dolor.",
    "city": "Manhattan",
    "state": "New York",
    "zipCode": 14025,
    "visited": 0
  },
```

### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```

## Delete restaurant

    Delete /restaurants/:id

### Examples

Register example:

```
axios.create({
    baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.delete('/restaurants/11');
```

### Success Response

Get Success

```
 {
    "status": 204
  }
```

### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
