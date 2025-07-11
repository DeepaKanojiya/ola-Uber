# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. This endpoint accepts user details, validates them, hashes the password, creates a new user, and returns an authentication token along with the user data.

## Request Body

The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "<string, min 3 chars>",
    "lastname": "<string, min 3 chars>"
  },
  "email": "<string, valid email>",
  "password": "<string, min 6 chars>"
}
```

### Example

```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

- **201 Created**
  - User registered successfully.
  - Response body:
    ```
    {
      "token": "<jwt_token>",
      "user": { ...userObject }
    }
    ```

- **400 Bad Request**
  - Validation failed. Returns an array of error messages.
  - Response body:
    ```
    {
      "errors": [
        { "msg": "Error message", ... }
      ]
    }
    ```

## Notes
- All fields are required.
- The email must be unique and valid.
- The password is stored securely (hashed).
- On success, a JWT token is returned for authentication.

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user with email and password. If the credentials are valid, returns a JWT token and user data.

## Request Body

The request body must be a JSON object with the following structure:

```
{
  "email": "<string, valid email>",
  "password": "<string, min 6 chars>"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

- **200 OK**
  - Login successful.
  - Response body:
    ```
    {
      "token": "<jwt_token>",
      "user": { ...userObject }
    }
    ```

- **400 Bad Request**
  - Validation failed. Returns an array of error messages.
  - Response body:
    ```
    {
      "errors": [
        { "msg": "Error message", ... }
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid credentials.
  - Response body:
    ```
    {
      "error": "Invalid email or password"
    }
    ```

## Notes
- Both fields are required.
- The email must be valid and registered.
- On success, a JWT token is returned for authentication.