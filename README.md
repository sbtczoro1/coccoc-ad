# Coccoc AD: Login screen build with Express and ReactJS

- [Key Features](#key-features)
- [Technologies used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Configuration and Setup](#configuration-and-setup)
- [Author](#author)

## Key Features

- Validate data on API
- Using JWT to authenticate users
- Passwords are encrypted using the Bcrypt algorithm
- Integrate the APIs into the client-side code

## Technologies used

This project was created using the following technologies.

#### Frontend

- React JS

#### Backend

- Express
- JWT (For authentication)
- Bcryptjs (For encryption)

## Configuration and Setup

To run this project locally, simply clone the repository or download project as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal

- cd client and create a .env file in the root of your client directory.
- Supply the following credentials

```
REACT_APP_API_ENDPOINT=http://localhost:1911
```

In development, that is going to be `http://localhost:8080`

```
$ cd frontend
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```

In the second terminal

- cd server and create a .env file in the root of your server directory.
- Supply the following credentials

```
PORT=1911
SECRET_TOKEN=coccocad@secret!token
```

Start your server

```
$ cd backend
$ npm install (to install server-side dependencies)
& npm start (to start the server)
```

## Author

- Email: [@chienvu1911](mailto:chienvu1911@gmail.com)
