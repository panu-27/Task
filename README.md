

The gateway acts as a **single entry point**, handles **JWT authentication**, and **dynamically registers routes** from downstream services.


## Services Overview

### 1 Access Control Service (Gateway)

* Runs on **port 3000**
* Single entry point for all client requests
* Dynamically registers routes from other services
* Validates JWT tokens
* Blocks unregistered routes with `404`
* Proxies valid requests to downstream services

### 2 Business Logic Service

* Runs on **port 3001**
* Contains core business logic
* Exposes:

  * `POST /login`
  * CRUD APIs for users
* Registers its routes with the gateway on startup

---

##  Authentication Flow

1. Client sends credentials to `POST /login` via gateway
2. Business service validates credentials
3. JWT token is generated and returned
4. Client uses JWT for all protected routes
5. Gateway validates JWT before proxying requests



## Environment Setup

### Gateway Service

Create `.env` in `gateway-service/`:

```env
PORT=3000
JWT_SECRET=supersecretkey
```

### Business Service

Create `.env` in `bussiness-service/`:

```env
PORT = 3001
JWT_SECRET = supersecretkey
GATEWAY_URL = http://localhost:3000
BASE_URL=http://localhost:3001
```


---

##  Running the Application 

### 1️ Start Gateway Service

```bash
cd gateway-service
npm install
npm run dev
```

### 2 Start Business Service

```bash
cd bussiness-service
npm install
npm run dev
```

On startup, the business service will automatically register its routes with the gateway.

---

## API Testing 

### Login (Public)

```
POST http://localhost:3000/login
```

```json
{
  "username": "admin",
  "password": "admin"
}
```

Response:

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### Create User (JWT Required)

```
POST http://localhost:3000/users
Authorization: Bearer <JWT_TOKEN>
```

```json
{
  "name": "Pranav",
  "role": "Developer"
}
```

---

### Get Users

```
GET http://localhost:3000/users
Authorization: Bearer <JWT_TOKEN>
```

---

### Update User

```
PUT http://localhost:3000/users/1
Authorization: Bearer <JWT_TOKEN>
```

```json
{
  "role": "Senior Developer"
}
```

---

### Delete User

```
DELETE http://localhost:3000/users/1
Authorization: Bearer <JWT_TOKEN>
```


### Missing JWT

```json
{
  "message": "Authorization header missing"
}
```

### Invalid or Unregistered Route

```json
{
  "message": "Route not registered in gateway"
}
```


