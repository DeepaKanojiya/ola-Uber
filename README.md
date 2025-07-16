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

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Returns the profile information of the authenticated user. Requires a valid JWT token in the `Authorization` header.

## Request Headers

- `Authorization: Bearer <jwt_token>`

## Responses

- **200 OK**
  - Returns the user's profile data.
  - Response body:
    ```
    {
      "user": { ...userObject }
    }
    ```

- **401 Unauthorized**
  - Missing or invalid token.
  - Response body:
    ```
    {
      "error": "Unauthorized"
    }
    ```

## Notes
- This endpoint is protected and requires authentication.

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user. Requires a valid JWT token in the `Authorization` header. Typically, this will invalidate the user's session on the server (if implemented).

## Request Headers

- `Authorization: Bearer <jwt_token>`

## Responses

- **200 OK**
  - Logout successful.
  - Response body:
    ```
    {
      "message": "Logout successful"
    }
    ```

- **401 Unauthorized**
  - Missing or invalid token.
  - Response body:
    ```
    {
      "error": "Unauthorized"
    }
    ```

## Notes
- This endpoint is protected and requires authentication.

---

# Captain API Endpoints Documentation

## 1. Register Captain

### Endpoint
`POST /captain/register`

### Request Body
```jsonc
{
  "fullname": {
    "firstname": "Jane", // string, required, min 3 chars
    "lastname": "Smith"  // string, required, min 3 chars
  },
  "email": "jane.smith@example.com", // string, required, valid email, unique
  "password": "securepass",           // string, required, min 6 chars
  "vehicle": {
    "color": "Red",                  // string, required, min 3 chars
    "plate": "XYZ1234",              // string, required, min 3 chars
    "capacity": 4,                    // number, required, min 1
    "vehicleType": "car"             // string, required, one of: 'car', 'motorcycle', 'auto'
  }
}
```

### Success Response
- **Status:** 201 Created
```jsonc
{
  "token": "<jwt_token>", // JWT token for authentication
  "captain": {
    // Captain object with all details except password
  }
}
```

### Error Responses
- **Status:** 400 Bad Request (Validation or duplicate email)
```jsonc
{
  "errors": [
    { "msg": "Error message", ... }
  ]
}
```
- **Status:** 400 Bad Request (Captain already exists)
```jsonc
{
  "message": "Captain already exist"
}
```

## 2. Login Captain

### Endpoint
`POST /captain/login`

### Request Body
```jsonc
{
  "email": "jane.smith@example.com", // string, required, valid email
  "password": "securepass"           // string, required, min 6 chars
}
```

### Success Response
- **Status:** 200 OK
```jsonc
{
  "token": "<jwt_token>", // JWT token for authentication
  "captain": {
    // Captain object with all details except password
  }
}
```

### Error Responses
- **Status:** 400 Bad Request (Validation)
```jsonc
{
  "errors": [
    { "msg": "Error message", ... }
  ]
}
```
- **Status:** 401 Unauthorized (Invalid credentials)
```jsonc
{
  "message": "Invalid email or password"
}
```

## 3. Get Captain Profile

### Endpoint
`GET /captain/profile`

### Headers
- `Authorization: Bearer <jwt_token>` // required

### Success Response
- **Status:** 200 OK
```jsonc
{
  "captain": {
    // Captain object for the authenticated user
  }
}
```

### Error Response
- **Status:** 401 Unauthorized
```jsonc
{
  "error": "Unauthorized"
}
```

## 4. Logout Captain

### Endpoint
`GET /captain/logout`

### Headers
- `Authorization: Bearer <jwt_token>` // required

### Success Response
- **Status:** 200 OK
```jsonc
{
  "message": "Logged out successfully"
}
```

### Error Response
- **Status:** 401 Unauthorized
```jsonc
{
  "message": "Unauthorized"
}
```